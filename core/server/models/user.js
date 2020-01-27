const _ = require('lodash'),
    Promise = require('bluebird'),
    validator = require('validator'),
    ObjectId = require('bson-objectid'),
    ghostBookshelf = require('./base'),
    baseUtils = require('./base/utils'),
    common = require('../lib/common'),
    security = require('../lib/security'),
    imageLib = require('../lib/image'),
    pipeline = require('../lib/promise/pipeline'),
    validation = require('../data/validation'),
    permissions = require('../services/permissions'),
    activeStates = ['active', 'warn-1', 'warn-2', 'warn-3', 'warn-4'],
    /**
     * inactive: owner user before blog setup, suspended users
     * locked user: imported users, they get a random password
     */
    inactiveStates = ['inactive', 'locked'],
    allStates = activeStates.concat(inactiveStates);

let User, Users;

User = ghostBookshelf.Model.extend({

    tableName: 'users',

    defaults: function defaults() {
        return {
            password: security.identifier.uid(50),
            visibility: 'public',
            status: 'active'
        };
    },

    emitChange: function emitChange(event, options) {
        const eventToTrigger = 'user' + '.' + event;
        ghostBookshelf.Model.prototype.emitChange.bind(this)(this, eventToTrigger, options);
    },

    /**
     * @TODO:
     *
     * The user model does not use bookshelf-relations yet.
     * Therefor we have to remove the relations manually.
     */
    onDestroying(model, options) {
        ghostBookshelf.Model.prototype.onDestroying.apply(this, arguments);

        return (options.transacting || ghostBookshelf.knex)('roles_users')
            .where('user_id', model.id)
            .del();
    },

    onDestroyed: function onDestroyed(model, options) {
        ghostBookshelf.Model.prototype.onDestroyed.apply(this, arguments);

        if (_.includes(activeStates, model.previous('status'))) {
            model.emitChange('deactivated', options);
        }

        model.emitChange('deleted', options);
    },

    onCreated: function onCreated(model, attrs, options) {
        ghostBookshelf.Model.prototype.onCreated.apply(this, arguments);

        model.emitChange('added', options);

        // active is the default state, so if status isn't provided, this will be an active user
        if (!model.get('status') || _.includes(activeStates, model.get('status'))) {
            model.emitChange('activated', options);
        }
    },

    onUpdated: function onUpdated(model, response, options) {
        ghostBookshelf.Model.prototype.onUpdated.apply(this, arguments);

        model.statusChanging = model.get('status') !== model.previous('status');
        model.isActive = _.includes(activeStates, model.get('status'));

        if (model.statusChanging) {
            model.emitChange(model.isActive ? 'activated' : 'deactivated', options);
        } else {
            if (model.isActive) {
                model.emitChange('activated.edited', options);
            }
        }

        model.emitChange('edited', options);
    },

    isActive: function isActive() {
        return activeStates.indexOf(this.get('status')) !== -1;
    },

    isLocked: function isLocked() {
        return this.get('status') === 'locked';
    },

    isInactive: function isInactive() {
        return this.get('status') === 'inactive';
    },

    /**
     * Lookup Gravatar if email changes to update image url
     * Generating a slug requires a db call to look for conflicting slugs
     */
    onSaving: function onSaving(newPage, attr, options) {
        var self = this,
            tasks = [],
            passwordValidation = {};

        ghostBookshelf.Model.prototype.onSaving.apply(this, arguments);

        /**
         * Bookshelf call order:
         *   - onSaving
         *   - onValidate (validates the model against the schema)
         *
         * Before we can generate a slug, we have to ensure that the name is not blank.
         */
        if (!this.get('name')) {
            throw new common.errors.ValidationError({
                message: common.i18n.t('notices.data.validation.index.valueCannotBeBlank', {
                    tableName: this.tableName,
                    columnKey: 'name'
                })
            });
        }

        // If the user's email is set & has changed & we are not importing
        if (self.hasChanged('email') && self.get('email') && !options.importing) {
            tasks.gravatar = (function lookUpGravatar() {
                return imageLib.gravatar.lookup({
                    email: self.get('email')
                }).then(function (response) {
                    if (response && response.image) {
                        self.set('profile_image', response.image);
                    }
                });
            })();
        }

        if (this.hasChanged('slug') || !this.get('slug')) {
            tasks.slug = (function generateSlug() {
                return ghostBookshelf.Model.generateSlug(
                    User,
                    self.get('slug') || self.get('name'),
                    {
                        status: 'all',
                        transacting: options.transacting,
                        shortSlug: !self.get('slug')
                    })
                    .then(function then(slug) {
                        self.set({slug: slug});
                    });
            })();
        }

        /**
         * CASE: add model, hash password
         * CASE: update model, hash password
         *
         * Important:
         *   - Password hashing happens when we import a database
         *   - we do some pre-validation checks, because onValidate is called AFTER onSaving
         *   - when importing, we set the password to a random uid and don't validate, just hash it and lock the user
         *   - when importing with `importPersistUser` we check if the password is a bcrypt hash already and fall back to
         *     normal behaviour if not (set random password, lock user, and hash password)
         *   - no validations should run, when importing
         */
        if (self.hasChanged('password')) {
            this.set('password', String(this.get('password')));

            // CASE: import with `importPersistUser` should always be an bcrypt password already,
            // and won't re-hash or overwrite it.
            // In case the password is not bcrypt hashed we fall back to the standard behaviour.
            if (options.importPersistUser && this.get('password').match(/^\$2[ayb]\$.{56}$/i)) {
                return;
            }

            if (options.importing) {
                // always set password to a random uid when importing
                this.set('password', security.identifier.uid(50));

                // lock users so they have to follow the password reset flow
                if (this.get('status') !== 'inactive') {
                    this.set('status', 'locked');
                }
            } else {
                // CASE: we're not importing data, run the validations
                passwordValidation = validation.validatePassword(this.get('password'), this.get('email'));

                if (!passwordValidation.isValid) {
                    return Promise.reject(new common.errors.ValidationError({
                        message: passwordValidation.message
                    }));
                }
            }

            tasks.hashPassword = (function hashPassword() {
                return security.password.hash(self.get('password'))
                    .then(function (hash) {
                        self.set('password', hash);
                    });
            })();
        }

        return Promise.props(tasks);
    },

    toJSON: function toJSON(unfilteredOptions) {
        var options = User.filterOptions(unfilteredOptions, 'toJSON'),
            attrs = ghostBookshelf.Model.prototype.toJSON.call(this, options);

        // remove password hash for security reasons
        delete attrs.password;

        return attrs;
    },

    format: function format(options) {
        if (!_.isEmpty(options.website) &&
            !validator.isURL(options.website, {
                require_protocol: true,
                protocols: ['http', 'https']
            })) {
            options.website = 'http://' + options.website;
        }
        return ghostBookshelf.Model.prototype.format.call(this, options);
    },

    posts: function posts() {
        return this.hasMany('Posts', 'created_by');
    },

    sessions: function sessions() {
        return this.hasMany('Sessions');
    },

    roles: function roles() {
        return this.belongsToMany('Role');
    },

    permissions: function permissions() {
        return this.belongsToMany('Permission');
    },

    hasRole: function hasRole(roleName) {
        var roles = this.related('roles');

        return roles.some(function getRole(role) {
            return role.get('name') === roleName;
        });
    },

    updateLastSeen: function updateLastSeen() {
        this.set({last_seen: new Date()});
        return this.save();
    },

    enforcedFilters: function enforcedFilters(options) {
        if (options.context && options.context.internal) {
            return null;
        }

        return options.context && options.context.public ? 'status:[' + allStates.join(',') + ']' : null;
    },

    defaultFilters: function defaultFilters(options) {
        if (options.context && options.context.internal) {
            return null;
        }

        return options.context && options.context.public ? null : 'status:[' + allStates.join(',') + ']';
    },

    /**
     * You can pass an extra `status=VALUES` field.
     * Long-Term: We should deprecate these short cuts and force users to use the filter param.
     */
    extraFilters: function extraFilters(options) {
        if (!options.status) {
            return null;
        }

        let filter = null;

        // CASE: Check if the incoming status value is valid, otherwise fallback to "active"
        if (options.status !== 'all') {
            options.status = allStates.indexOf(options.status) > -1 ? options.status : 'active';
        }

        if (options.status === 'active') {
            filter = `status:[${activeStates}]`;
        } else if (options.status === 'all') {
            filter = `status:[${allStates}]`;
        } else {
            filter = `status:${options.status}`;
        }

        delete options.status;

        return filter;
    },

    getAction(event, options) {
        const actor = this.getActor(options);

        // @NOTE: we ignore internal updates (`options.context.internal`) for now
        if (!actor) {
            return;
        }

        // @TODO: implement context
        return {
            event: event,
            resource_id: this.id || this.previous('id'),
            resource_type: 'user',
            actor_id: actor.id,
            actor_type: actor.type
        };
    }
}, {
    orderDefaultOptions: function orderDefaultOptions() {
        return {
            last_seen: 'DESC',
            name: 'ASC',
            created_at: 'DESC'
        };
    },

    /**
     * Returns an array of keys permitted in a method's `options` hash, depending on the current method.
     * @param {String} methodName The name of the method to check valid options for.
     * @return {Array} Keys allowed in the `options` hash of the model's method.
     */
    permittedOptions: function permittedOptions(methodName, options) {
        var permittedOptionsToReturn = ghostBookshelf.Model.permittedOptions.call(this, methodName),

            // whitelists for the `options` hash argument on methods, by method name.
            // these are the only options that can be passed to Bookshelf / Knex.
            validOptions = {
                findOne: ['withRelated', 'status'],
                setup: ['id'],
                edit: ['withRelated', 'importPersistUser'],
                add: ['importPersistUser'],
                findPage: ['status'],
                findAll: ['filter']
            };

        if (validOptions[methodName]) {
            permittedOptionsToReturn = permittedOptionsToReturn.concat(validOptions[methodName]);
        }

        // CASE: The `withRelated` parameter is allowed when using the public API, but not the `roles` value.
        // Otherwise we expose too much information.
        // @TODO: the target controller should define the allowed includes, but not the model layer O_O (https://github.com/TryGhost/Ghost/issues/10106)
        if (options && options.context && options.context.public) {
            if (options.withRelated && options.withRelated.indexOf('roles') !== -1) {
                options.withRelated.splice(options.withRelated.indexOf('roles'), 1);
            }
        }

        return permittedOptionsToReturn;
    },

    /**
     * ### Find One
     *
     * We have to clone the data, because we remove values from this object.
     * This is not expected from outside!
     *
     * @TODO: use base class
     *
     * @extends ghostBookshelf.Model.findOne to include roles
     * **See:** [ghostBookshelf.Model.findOne](base.js.html#Find%20One)
     */
    findOne: function findOne(dataToClone, unfilteredOptions) {
        var options = this.filterOptions(unfilteredOptions, 'findOne'),
            query,
            status,
            data = _.cloneDeep(dataToClone),
            lookupRole = data.role;

        // Ensure only valid fields/columns are added to query
        if (options.columns) {
            options.columns = _.intersection(options.columns, this.prototype.permittedAttributes());
        }

        delete data.role;
        data = _.defaults(data || {}, {
            status: 'all'
        });

        status = data.status;
        delete data.status;

        data = this.filterData(data);

        // Support finding by role
        if (lookupRole) {
            options.withRelated = _.union(options.withRelated, ['roles']);
            query = this.forge(data);

            query.query('join', 'roles_users', 'users.id', '=', 'roles_users.user_id');
            query.query('join', 'roles', 'roles_users.role_id', '=', 'roles.id');
            query.query('where', 'roles.name', '=', lookupRole);
        } else {
            query = this.forge(data);
        }

        if (status === 'active') {
            query.query('whereIn', 'status', activeStates);
        } else if (status !== 'all') {
            query.query('where', {status: status});
        }

        return query.fetch(options);
    },

    /**
     * ### Edit
     *
     * Note: In case of login the last_seen attribute gets updated.
     *
     * @extends ghostBookshelf.Model.edit to handle returning the full object
     * **See:** [ghostBookshelf.Model.edit](base.js.html#edit)
     */
    edit: function edit(data, unfilteredOptions) {
        var options = this.filterOptions(unfilteredOptions, 'edit'),
            self = this,
            ops = [];

        if (data.roles && data.roles.length > 1) {
            return Promise.reject(
                new common.errors.ValidationError({
                    message: common.i18n.t('errors.models.user.onlyOneRolePerUserSupported')
                })
            );
        }

        if (data.email) {
            ops.push(function checkForDuplicateEmail() {
                return self.getByEmail(data.email, options).then(function then(user) {
                    if (user && user.id !== options.id) {
                        return Promise.reject(new common.errors.ValidationError({
                            message: common.i18n.t('errors.models.user.userUpdateError.emailIsAlreadyInUse')
                        }));
                    }
                });
            });
        }

        ops.push(function update() {
            return ghostBookshelf.Model.edit.call(self, data, options).then((user) => {
                var roleId;

                if (!data.roles) {
                    return user;
                }

                roleId = data.roles[0].id || data.roles[0];

                return user.roles().fetch().then((roles) => {
                    // return if the role is already assigned
                    if (roles.models[0].id === roleId) {
                        return;
                    }
                    return ghostBookshelf.model('Role').findOne({id: roleId});
                }).then((roleToAssign) => {
                    if (roleToAssign && roleToAssign.get('name') === 'Owner') {
                        return Promise.reject(
                            new common.errors.ValidationError({
                                message: common.i18n.t('errors.models.user.methodDoesNotSupportOwnerRole')
                            })
                        );
                    } else {
                        // assign all other roles
                        return user.roles().updatePivot({role_id: roleId});
                    }
                }).then(() => {
                    options.status = 'all';
                    return self.findOne({id: user.id}, options);
                }).then((model) => {
                    model._changed = user._changed;
                    return model;
                });
            });
        });

        return pipeline(ops);
    },

    /**
     * ## Add
     * Naive user add
     * Hashes the password provided before saving to the database.
     *
     * We have to clone the data, because we remove values from this object.
     * This is not expected from outside!
     *
     * @param {object} dataToClone
     * @param {object} unfilteredOptions
     * @extends ghostBookshelf.Model.add to manage all aspects of user signup
     * **See:** [ghostBookshelf.Model.add](base.js.html#Add)
     */
    add: function add(dataToClone, unfilteredOptions) {
        var options = this.filterOptions(unfilteredOptions, 'add'),
            self = this,
            data = _.cloneDeep(dataToClone),
            userData = this.filterData(data),
            roles;

        // check for too many roles
        if (data.roles && data.roles.length > 1) {
            return Promise.reject(new common.errors.ValidationError({
                message: common.i18n.t('errors.models.user.onlyOneRolePerUserSupported')
            }));
        }

        function getAuthorRole() {
            return ghostBookshelf.model('Role').findOne({name: 'Author'}, _.pick(options, 'transacting'))
                .then(function then(authorRole) {
                    return [authorRole.get('id')];
                });
        }

        /**
         * We need this default author role because of the following Ghost feature:
         * You setup your blog and you can invite people instantly, but without choosing a role.
         * roles: [] -> no default role (used for owner creation, see fixtures.json)
         * roles: undefined -> default role
         */
        roles = data.roles;
        delete data.roles;

        return ghostBookshelf.Model.add.call(self, userData, options)
            .then(function then(addedUser) {
                // Assign the userData to our created user so we can pass it back
                userData = addedUser;
            })
            .then(function () {
                if (!roles) {
                    return getAuthorRole();
                }

                return Promise.resolve(roles);
            })
            .then(function (_roles) {
                roles = _roles;

                // CASE: it is possible to add roles by name, by id or by object
                if (_.isString(roles[0]) && !ObjectId.isValid(roles[0])) {
                    return Promise.map(roles, function (roleName) {
                        return ghostBookshelf.model('Role').findOne({
                            name: roleName
                        }, options);
                    }).then(function (roleModels) {
                        roles = [];

                        _.each(roleModels, function (roleModel) {
                            roles.push(roleModel.id);
                        });
                    });
                }

                return Promise.resolve();
            })
            .then(function () {
                return baseUtils.attach(User, userData.id, 'roles', roles, options);
            })
            .then(function then() {
                // find and return the added user
                return self.findOne({id: userData.id, status: 'all'}, options);
            });
    },

    destroy: function destroy(unfilteredOptions) {
        const options = this.filterOptions(unfilteredOptions, 'destroy', {extraAllowedProperties: ['id']});

        const destroyUser = () => {
            return ghostBookshelf.Model.destroy.call(this, options);
        };

        if (!options.transacting) {
            return ghostBookshelf.transaction((transacting) => {
                options.transacting = transacting;
                return destroyUser();
            });
        }

        return destroyUser();
    },

    /**
     * We override the owner!
     * Owner already has a slug -> force setting a new one by setting slug to null
     * @TODO: kill setup function?
     */
    setup: function setup(data, unfilteredOptions) {
        var options = this.filterOptions(unfilteredOptions, 'setup'),
            self = this,
            userData = this.filterData(data),
            passwordValidation = {};

        passwordValidation = validation.validatePassword(userData.password, userData.email, data.blogTitle);

        if (!passwordValidation.isValid) {
            return Promise.reject(new common.errors.ValidationError({
                message: passwordValidation.message
            }));
        }

        userData.slug = null;
        return self.edit(userData, options);
    },

    /**
     * Right now the setup of the blog depends on the user status.
     * Only if the owner user is `inactive`, then the blog is not setup.
     * e.g. if you transfer ownership to a locked user, you blog is still setup.
     *
     * @TODO: Rename `inactive` status to something else, it's confusing. e.g. requires-setup
     * @TODO: Depending on the user status results in https://github.com/TryGhost/Ghost/issues/8003
     */
    isSetup: function isSetup(options) {
        return this.getOwnerUser(options)
            .then(function (owner) {
                return owner.get('status') !== 'inactive';
            });
    },

    getOwnerUser: function getOwnerUser(options) {
        options = options || {};

        return this.findOne({
            role: 'Owner',
            status: 'all'
        }, options).then(function (owner) {
            if (!owner) {
                return Promise.reject(new common.errors.NotFoundError({
                    message: common.i18n.t('errors.models.user.ownerNotFound')
                }));
            }

            return owner;
        });
    },

    permissible: function permissible(userModelOrId, action, context, unsafeAttrs, loadedPermissions, hasUserPermission, hasAppPermission, hasApiKeyPermission) {
        var self = this,
            userModel = userModelOrId,
            origArgs;

        // If we passed in a model without its related roles, we need to fetch it again
        if (_.isObject(userModelOrId) && !_.isObject(userModelOrId.related('roles'))) {
            userModelOrId = userModelOrId.id;
        }
        // If we passed in an id instead of a model get the model first
        if (_.isNumber(userModelOrId) || _.isString(userModelOrId)) {
            // Grab the original args without the first one
            origArgs = _.toArray(arguments).slice(1);

            // Get the actual user model
            return this.findOne({
                id: userModelOrId,
                status: 'all'
            }, {withRelated: ['roles']}).then(function then(foundUserModel) {
                if (!foundUserModel) {
                    throw new common.errors.NotFoundError({
                        message: common.i18n.t('errors.models.user.userNotFound')
                    });
                }

                // Build up the original args but substitute with actual model
                var newArgs = [foundUserModel].concat(origArgs);

                return self.permissible.apply(self, newArgs);
            });
        }

        if (action === 'edit') {
            // Users with the role 'Editor', 'Author', and 'Contributor' have complex permissions when the action === 'edit'
            // We now have all the info we need to construct the permissions

            if (context.user === userModel.get('id')) {
                // If this is the same user that requests the operation allow it.
                hasUserPermission = true;
            } else if (loadedPermissions.user && userModel.hasRole('Owner')) {
                // Owner can only be edited by owner
                hasUserPermission = loadedPermissions.user && _.some(loadedPermissions.user.roles, {name: 'Owner'});
            } else if (loadedPermissions.user && _.some(loadedPermissions.user.roles, {name: 'Editor'})) {
                // If the user we are trying to edit is an Author or Contributor, allow it
                hasUserPermission = userModel.hasRole('Author') || userModel.hasRole('Contributor');
            }
        }

        if (action === 'destroy') {
            // Owner cannot be deleted EVER
            if (userModel.hasRole('Owner')) {
                return Promise.reject(new common.errors.NoPermissionError({
                    message: common.i18n.t('errors.models.user.notEnoughPermission')
                }));
            }

            // Users with the role 'Editor' have complex permissions when the action === 'destroy'
            if (loadedPermissions.user && _.some(loadedPermissions.user.roles, {name: 'Editor'})) {
                // Alternatively, if the user we are trying to edit is an Author, allow it
                hasUserPermission = context.user === userModel.get('id') || userModel.hasRole('Author') || userModel.hasRole('Contributor');
            }
        }

        // CASE: can't edit my own status to inactive or locked
        if (action === 'edit' && userModel.id === context.user) {
            if (User.inactiveStates.indexOf(unsafeAttrs.status) !== -1) {
                return Promise.reject(new common.errors.NoPermissionError({
                    message: common.i18n.t('errors.api.users.cannotChangeStatus')
                }));
            }
        }

        // CASE: i want to edit roles
        if (action === 'edit' && unsafeAttrs.roles && unsafeAttrs.roles[0]) {
            let role = unsafeAttrs.roles[0];
            let roleId = role.id || role;
            let editedUserId = userModel.id;
            // @NOTE: role id of logged in user
            let contextRoleId = loadedPermissions.user.roles[0].id;

            if (roleId !== contextRoleId && editedUserId === context.user) {
                return Promise.reject(new common.errors.NoPermissionError({
                    message: common.i18n.t('errors.api.users.cannotChangeOwnRole')
                }));
            }

            return User.getOwnerUser()
                .then((owner) => {
                    // CASE: owner can assign role to any user
                    if (context.user === owner.id) {
                        if (hasUserPermission && hasApiKeyPermission && hasAppPermission) {
                            return Promise.resolve();
                        }

                        return Promise.reject(new common.errors.NoPermissionError({
                            message: common.i18n.t('errors.models.user.notEnoughPermission')
                        }));
                    }

                    // CASE: You try to change the role of the owner user
                    if (editedUserId === owner.id) {
                        if (owner.related('roles').at(0).id !== roleId) {
                            return Promise.reject(new common.errors.NoPermissionError({
                                message: common.i18n.t('errors.api.users.cannotChangeOwnersRole')
                            }));
                        }
                    } else if (roleId !== contextRoleId) {
                        // CASE: you are trying to change a role, but you are not owner
                        // @NOTE: your role is not the same than the role you try to change (!)
                        // e.g. admin can assign admin role to a user, but not owner
                        return permissions.canThis(context).assign.role(role)
                            .then(() => {
                                if (hasUserPermission && hasApiKeyPermission && hasAppPermission) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new common.errors.NoPermissionError({
                                    message: common.i18n.t('errors.models.user.notEnoughPermission')
                                }));
                            });
                    }

                    if (hasUserPermission && hasApiKeyPermission && hasAppPermission) {
                        return Promise.resolve();
                    }

                    return Promise.reject(new common.errors.NoPermissionError({
                        message: common.i18n.t('errors.models.user.notEnoughPermission')
                    }));
                });
        }

        if (hasUserPermission && hasApiKeyPermission && hasAppPermission) {
            return Promise.resolve();
        }

        return Promise.reject(new common.errors.NoPermissionError({
            message: common.i18n.t('errors.models.user.notEnoughPermission')
        }));
    },

    // Finds the user by email, and checks the password
    // @TODO: shorten this function and rename...
    check: function check(object) {
        var self = this;

        return this.getByEmail(object.email)
            .then((user) => {
                if (!user) {
                    throw new common.errors.NotFoundError({
                        message: common.i18n.t('errors.models.user.noUserWithEnteredEmailAddr')
                    });
                }

                if (user.isLocked()) {
                    throw new common.errors.NoPermissionError({
                        message: common.i18n.t('errors.models.user.accountLocked')
                    });
                }

                if (user.isInactive()) {
                    throw new common.errors.NoPermissionError({
                        message: common.i18n.t('errors.models.user.accountSuspended')
                    });
                }

                return self.isPasswordCorrect({plainPassword: object.password, hashedPassword: user.get('password')})
                    .then(() => {
                        return user.updateLastSeen();
                    })
                    .then(() => {
                        user.set({status: 'active'});
                        return user.save();
                    });
            })
            .catch((err) => {
                if (err.message === 'NotFound' || err.message === 'EmptyResponse') {
                    throw new common.errors.NotFoundError({
                        message: common.i18n.t('errors.models.user.noUserWithEnteredEmailAddr')
                    });
                }

                throw err;
            });
    },

    isPasswordCorrect: function isPasswordCorrect(object) {
        var plainPassword = object.plainPassword,
            hashedPassword = object.hashedPassword;

        if (!plainPassword || !hashedPassword) {
            return Promise.reject(new common.errors.ValidationError({
                message: common.i18n.t('errors.models.user.passwordRequiredForOperation')
            }));
        }

        return security.password.compare(plainPassword, hashedPassword)
            .then(function (matched) {
                if (matched) {
                    return;
                }

                return Promise.reject(new common.errors.ValidationError({
                    context: common.i18n.t('errors.models.user.incorrectPassword'),
                    message: common.i18n.t('errors.models.user.incorrectPassword'),
                    help: common.i18n.t('errors.models.user.userUpdateError.help'),
                    code: 'PASSWORD_INCORRECT'
                }));
            });
    },

    /**
     * Naive change password method
     * @param {Object} object
     * @param {Object} unfilteredOptions
     */
    changePassword: function changePassword(object, unfilteredOptions) {
        var options = this.filterOptions(unfilteredOptions, 'changePassword'),
            self = this,
            newPassword = object.newPassword,
            userId = object.user_id,
            oldPassword = object.oldPassword,
            isLoggedInUser = userId === options.context.user,
            user;

        options.require = true;

        return self.forge({id: userId}).fetch(options)
            .then(function then(_user) {
                user = _user;

                if (isLoggedInUser) {
                    return self.isPasswordCorrect({
                        plainPassword: oldPassword,
                        hashedPassword: user.get('password')
                    });
                }
            })
            .then(function then() {
                return user.save({password: newPassword});
            });
    },

    transferOwnership: function transferOwnership(object, unfilteredOptions) {
        const options = ghostBookshelf.Model.filterOptions(unfilteredOptions, 'transferOwnership');
        let ownerRole;
        let contextUser;

        return Promise.join(
            ghostBookshelf.model('Role').findOne({name: 'Owner'}),
            User.findOne({id: options.context.user}, {withRelated: ['roles']})
        )
            .then((results) => {
                ownerRole = results[0];
                contextUser = results[1];

                // check if user has the owner role
                const currentRoles = contextUser.toJSON(options).roles;
                if (!_.some(currentRoles, {id: ownerRole.id})) {
                    return Promise.reject(new common.errors.NoPermissionError({
                        message: common.i18n.t('errors.models.user.onlyOwnerCanTransferOwnerRole')
                    }));
                }

                return Promise.join(ghostBookshelf.model('Role').findOne({name: 'Administrator'}),
                    User.findOne({id: object.id}, {withRelated: ['roles']}));
            })
            .then((results) => {
                const adminRole = results[0];
                const user = results[1];

                if (!user) {
                    return Promise.reject(new common.errors.NotFoundError({
                        message: common.i18n.t('errors.models.user.userNotFound')
                    }));
                }

                const {roles: currentRoles, status} = user.toJSON(options);

                if (!_.some(currentRoles, {id: adminRole.id})) {
                    return Promise.reject(new common.errors.ValidationError({
                        message: common.i18n.t('errors.models.user.onlyAdmCanBeAssignedOwnerRole')
                    }));
                }

                if (status !== 'active') {
                    return Promise.reject(new common.errors.ValidationError({
                        message: common.i18n.t('errors.models.user.onlyActiveAdmCanBeAssignedOwnerRole')
                    }));
                }

                // convert owner to admin
                return Promise.join(contextUser.roles().updatePivot({role_id: adminRole.id}),
                    user.roles().updatePivot({role_id: ownerRole.id}),
                    user.id);
            })
            .then((results) => {
                return Users.forge()
                    .query('whereIn', 'id', [contextUser.id, results[2]])
                    .fetch({withRelated: ['roles']});
            });
    },

    // Get the user by email address, enforces case insensitivity rejects if the user is not found
    // When multi-user support is added, email addresses must be deduplicated with case insensitivity, so that
    // joe@bloggs.com and JOE@BLOGGS.COM cannot be created as two separate users.
    getByEmail: function getByEmail(email, unfilteredOptions) {
        var options = ghostBookshelf.Model.filterOptions(unfilteredOptions, 'getByEmail');

        // We fetch all users and process them in JS as there is no easy way to make this query across all DBs
        // Although they all support `lower()`, sqlite can't case transform unicode characters
        // This is somewhat mute, as validator.isEmail() also doesn't support unicode, but this is much easier / more
        // likely to be fixed in the near future.
        options.require = true;

        return Users.forge().fetch(options).then(function then(users) {
            var userWithEmail = users.find(function findUser(user) {
                return user.get('email').toLowerCase() === email.toLowerCase();
            });

            if (userWithEmail) {
                return userWithEmail;
            }
        });
    },
    inactiveStates: inactiveStates
});

Users = ghostBookshelf.Collection.extend({
    model: User
});

module.exports = {
    User: ghostBookshelf.model('User', User),
    Users: ghostBookshelf.collection('Users', Users)
};
