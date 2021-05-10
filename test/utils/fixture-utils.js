// Utility Packages
const Promise = require('bluebird');
const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const uuid = require('uuid');
const ObjectId = require('bson-objectid');
const KnexMigrator = require('knex-migrator');
const knexMigrator = new KnexMigrator();

// Ghost Internals
const models = require('../../core/server/models');
const fixtureUtils = require('../../core/server/data/schema/fixtures/utils');
const emailAnalyticsService = require('../../core/server/services/email-analytics');
const permissions = require('../../core/server/services/permissions');
const settingsService = require('../../core/server/services/settings');
const settingsCache = require('../../core/server/services/settings/cache');

// Other Test Utilities
const context = require('./fixtures/context');
const DataGenerator = require('./fixtures/data-generator');
const filterData = require('./fixtures/filter-param');

let postsInserted = 0;

/** TEST FIXTURES **/
const fixtures = {
    insertPosts: function insertPosts(posts) {
        return Promise.map(posts, function (post) {
            return models.Post.add(post, context.internal);
        });
    },

    insertPostsAndTags: function insertPostsAndTags() {
        return Promise.map(DataGenerator.forKnex.tags, function (tag) {
            return models.Tag.add(tag, context.internal);
        })
            .then(function () {
                return Promise.each(_.cloneDeep(DataGenerator.forKnex.posts), function (post) {
                    let postTagRelations = _.filter(DataGenerator.forKnex.posts_tags, {post_id: post.id});
                    let postAuthorsRelations = _.filter(DataGenerator.forKnex.posts_authors, {post_id: post.id});

                    postTagRelations = _.map(postTagRelations, function (postTagRelation) {
                        return _.find(DataGenerator.forKnex.tags, {id: postTagRelation.tag_id});
                    });

                    postAuthorsRelations = _.map(postAuthorsRelations, function (postAuthorsRelation) {
                        return _.find(DataGenerator.forKnex.users, {id: postAuthorsRelation.author_id});
                    });

                    post.tags = postTagRelations;
                    post.authors = postAuthorsRelations;

                    return models.Post.add(post, context.internal);
                });
            })
            .then(function () {
                return Promise.map(DataGenerator.forKnex.posts_meta, function (postMeta) {
                    return models.PostsMeta.add(postMeta, context.internal);
                });
            });
    },

    insertMultiAuthorPosts: function insertMultiAuthorPosts() {
        let i;
        let j;
        let k = 0;
        let posts = [];

        // NOTE: this variable should become a parameter as test logic depends on it
        const count = 10;

        // insert users of different roles
        return Promise.resolve(fixtures.createUsersWithRoles()).then(function () {
            return Promise.map(DataGenerator.forKnex.tags, function (tag) {
                return models.Tag.add(tag, context.internal);
            });
        }).then(function () {
            return Promise.all([
                models.User.fetchAll(_.merge({columns: ['id']}, context.internal)),
                models.Tag.fetchAll(_.merge({columns: ['id']}, context.internal))
            ]);
        }).then(function (results) {
            let users = results[0];
            let tags = results[1];

            tags = tags.toJSON();

            users = users.toJSON();
            users = _.map(users, 'id');

            // Let's insert posts with random authors
            for (i = 0; i < count; i += 1) {
                const author = users[i % users.length];
                posts.push(DataGenerator.forKnex.createGenericPost(k, null, null, author));
                k = k + 1;
            }

            return Promise.map(posts, function (post, index) {
                posts[index].authors = [{id: posts[index].author_id}];
                posts[index].tags = [tags[Math.floor(Math.random() * (tags.length - 1))]];
                return models.Post.add(posts[index], context.internal);
            });
        });
    },

    insertEmailedPosts: function insertEmailedPosts({postCount = 2} = {}) {
        const posts = [];

        for (let i = 0; i < postCount; i++) {
            posts.push(DataGenerator.forKnex.createGenericPost);
        }
    },

    insertExtraPosts: function insertExtraPosts(max) {
        let lang;
        let status;
        const posts = [];
        let i;
        let j;
        let k = postsInserted;

        max = max || 50;

        for (i = 0; i < 2; i += 1) {
            lang = i % 2 ? 'en' : 'fr';
            posts.push(DataGenerator.forKnex.createGenericPost(k, null, lang));
            k = k + 1;

            for (j = 0; j < max; j += 1) {
                status = j % 2 ? 'draft' : 'published';
                posts.push(DataGenerator.forKnex.createGenericPost(k, status, lang));
                k = k + 1;
            }
        }

        // Keep track so we can run this function again safely
        postsInserted = k;

        return models.User.getOwnerUser(context.internal)
            .then(function (ownerUser) {
                return Promise.map(posts, function (post, index) {
                    posts[index].authors = [ownerUser.toJSON()];
                    return models.Post.add(posts[index], context.internal);
                });
            });
    },

    insertTags: function insertTags() {
        return Promise.map(DataGenerator.forKnex.tags, function (tag) {
            return models.Tag.add(tag, context.internal);
        });
    },

    insertExtraTags: function insertExtraTags(max) {
        max = max || 50;
        const tags = [];
        let tagName;
        let i;

        for (i = 0; i < max; i += 1) {
            tagName = uuid.v4().split('-')[0];
            tags.push(DataGenerator.forKnex.createBasic({name: tagName, slug: tagName}));
        }

        return Promise.map(tags, function (tag, index) {
            return models.Tag.add(tags[index], context.internal);
        });
    },

    insertExtraPostsTags: function insertExtraPostsTags(max) {
        max = max || 50;

        return Promise.all([
            models.Post.fetchAll(_.merge({columns: ['id'], withRelated: 'tags'}, context.internal)),
            models.Tag.fetchAll(_.merge({columns: ['id', 'name']}, context.internal))
        ]).then(function (results) {
            let posts = results[0].toJSON();
            let tags = results[1].toJSON();

            const injectionTagId = _.chain(tags)
                .filter({name: 'injection'})
                .map('id')
                .value()[0];

            if (max > posts.length) {
                throw new Error('Trying to add more posts_tags than the number of posts.');
            }

            return Promise.map(posts.slice(0, max), function (post) {
                post.tags = post.tags ? post.tags : [];

                return models.Post.edit({
                    tags: post.tags.concat([_.find(DataGenerator.Content.tags, {id: injectionTagId})])
                }, _.merge({id: post.id}, context.internal));
            });
        });
    },

    insertRoles: function insertRoles() {
        return Promise.map(DataGenerator.forKnex.roles, function (role) {
            return models.Role.add(role, context.internal);
        });
    },

    initOwnerUser: function initOwnerUser() {
        let user = DataGenerator.Content.users[0];

        user = DataGenerator.forKnex.createBasic(user);
        user = _.extend({}, user, {status: 'inactive'});

        return Promise.map(DataGenerator.forKnex.roles, function (role) {
            return models.Role.add(role, context.internal);
        }).then(function () {
            const userRolesRelation = _.cloneDeep(DataGenerator.forKnex.roles_users[0]);
            user.roles = _.filter(DataGenerator.forKnex.roles, {id: userRolesRelation.role_id});
            return models.User.add(user, context.internal);
        });
    },

    insertOwnerUser: function insertOwnerUser() {
        const user = _.cloneDeep(DataGenerator.forKnex.users[0]);
        user.roles = [DataGenerator.forKnex.roles[3]];
        return models.User.add(user, context.internal);
    },

    overrideOwnerUser: function overrideOwnerUser(slug) {
        return models.User.getOwnerUser(context.internal)
            .then(function (ownerUser) {
                const user = DataGenerator.forKnex.createUser(DataGenerator.Content.users[0]);

                if (slug) {
                    user.slug = slug;
                }

                return models.User.edit(user, _.merge({id: ownerUser.id}, context.internal));
            });
    },

    changeOwnerUserStatus: function changeOwnerUserStatus(options) {
        return models.User.getOwnerUser(context.internal)
            .then(function (user) {
                return models.User.edit({status: options.status}, _.merge({id: user.id}, context.internal));
            });
    },

    createUsersWithRoles: function createUsersWithRoles() {
        return Promise.map(DataGenerator.forKnex.roles, function (role) {
            return models.Role.add(role, context.internal);
        }).then(function () {
            return Promise.map(_.cloneDeep(DataGenerator.forKnex.users), function (user) {
                let userRolesRelations = _.filter(DataGenerator.forKnex.roles_users, {user_id: user.id});

                userRolesRelations = _.map(userRolesRelations, function (userRolesRelation) {
                    return _.find(DataGenerator.forKnex.roles, {id: userRolesRelation.role_id});
                });

                user.roles = userRolesRelations;
                return models.User.add(user, context.internal);
            });
        });
    },

    resetRoles: function resetRoles() {
        return Promise.map(_.cloneDeep(DataGenerator.forKnex.users), function (user) {
            let userRolesRelations = _.filter(DataGenerator.forKnex.roles_users, {user_id: user.id});

            userRolesRelations = _.map(userRolesRelations, function (userRolesRelation) {
                return _.find(DataGenerator.forKnex.roles, {id: userRolesRelation.role_id});
            });

            user.roles = userRolesRelations;
            return models.User.edit(user, _.merge({id: user.id}, context.internal));
        });
    },

    createUsersWithoutOwner: function createUsersWithoutOwner() {
        const usersWithoutOwner = _.cloneDeep(DataGenerator.forKnex.users.slice(1));

        return Promise.map(usersWithoutOwner, function (user) {
            let userRolesRelations = _.filter(DataGenerator.forKnex.roles_users, {user_id: user.id});

            userRolesRelations = _.map(userRolesRelations, function (userRolesRelation) {
                return _.find(DataGenerator.forKnex.roles, {id: userRolesRelation.role_id});
            });

            user.roles = userRolesRelations;
            return models.User.add(user, context.internal);
        });
    },

    createInactiveUser() {
        const user = DataGenerator.forKnex.createUser({
            email: 'inactive@test.org',
            slug: 'inactive',
            status: 'inactive'
        });

        return models.User.add(user, context.internal);
    },

    createExtraUsers: function createExtraUsers() {
        // grab 3 more users
        let extraUsers = _.cloneDeep(DataGenerator.Content.users.slice(2, 6));
        extraUsers = _.map(extraUsers, function (user) {
            return DataGenerator.forKnex.createUser(_.extend({}, user, {
                id: ObjectId().toHexString(),
                email: 'a' + user.email,
                slug: 'a' + user.slug
            }));
        });

        const roles = {};
        roles[extraUsers[0].id] = DataGenerator.Content.roles[0];
        roles[extraUsers[1].id] = DataGenerator.Content.roles[1];
        roles[extraUsers[2].id] = DataGenerator.Content.roles[2];
        roles[extraUsers[3].id] = DataGenerator.Content.roles[4];

        // @TODO: remove when overhauling test env
        // tests need access to the extra created users (especially to the created id)
        // replacement for admin2, editor2 etc
        DataGenerator.Content.extraUsers = extraUsers;

        return Promise.map(extraUsers, function (user) {
            user.roles = roles[user.id];
            return models.User.add(user, context.internal);
        });
    },

    insertOneUser: function insertOneUser(options) {
        options = options || {};

        return models.User.add({
            name: options.name,
            email: options.email,
            slug: options.slug,
            status: options.status
        }, context.internal);
    },

    insertOne: function insertOne(modelName, tableName, fn, index) {
        const obj = DataGenerator.forKnex[fn](DataGenerator.Content[tableName][index || 0]);
        return models[modelName].add(obj, context.internal);
    },

    getImportFixturePath: function (filename) {
        return path.resolve(__dirname + '/fixtures/import/' + filename);
    },

    getExportFixturePath: function (filename) {
        const relativePath = '/fixtures/export/';
        return path.resolve(__dirname + relativePath + filename + '.json');
    },

    loadExportFixture: function loadExportFixture(filename) {
        const filePath = this.getExportFixturePath(filename);

        return fs.readFile(filePath).then(function (fileContents) {
            let data;

            // Parse the json data
            try {
                data = JSON.parse(fileContents);
            } catch (e) {
                return new Error('Failed to parse the file');
            }

            return data;
        });
    },

    permissionsFor: function permissionsFor(obj) {
        let permsToInsert = _.cloneDeep(fixtureUtils.findModelFixtures('Permission', {object_type: obj}).entries);
        const permsRolesToInsert = fixtureUtils.findPermissionRelationsForObject(obj).entries;
        const actions = [];
        const permissionsRoles = {};

        const roles = {
            Administrator: DataGenerator.Content.roles[0].id,
            Editor: DataGenerator.Content.roles[1].id,
            Author: DataGenerator.Content.roles[2].id,
            Owner: DataGenerator.Content.roles[3].id,
            Contributor: DataGenerator.Content.roles[4].id,
            'Admin Integration': DataGenerator.Content.roles[5].id
        };

        // CASE: if empty db will throw SQLITE_MISUSE, hard to debug
        if (_.isEmpty(permsToInsert)) {
            return Promise.reject(new Error('no permission found:' + obj));
        }

        permsToInsert = _.map(permsToInsert, function (perms) {
            perms.id = ObjectId().toHexString();

            actions.push({type: perms.action_type, permissionId: perms.id});
            return DataGenerator.forKnex.createBasic(perms);
        });

        _.each(permsRolesToInsert, function (perms, role) {
            if (perms[obj]) {
                if (perms[obj] === 'all') {
                    _.each(actions, function (action) {
                        if (!permissionsRoles[action.permissionId]) {
                            permissionsRoles[action.permissionId] = [];
                        }

                        permissionsRoles[action.permissionId].push(_.find(DataGenerator.Content.roles, {id: roles[role]}));
                    });
                } else {
                    _.each(perms[obj], function (action) {
                        if (!permissionsRoles[_.find(actions, {type: action}).permissionId]) {
                            permissionsRoles[_.find(actions, {type: action}).permissionId] = [];
                        }

                        permissionsRoles[_.find(actions, {type: action}).permissionId].push(_.find(DataGenerator.Content.roles, {id: roles[role]}));
                    });
                }
            }
        });

        return Promise.map(permsToInsert, function (perm) {
            if (!_.isEmpty(permissionsRoles)) {
                perm.roles = permissionsRoles[perm.id];
            }

            return models.Permission.add(perm, context.internal);
        });
    },

    insertInvites: function insertInvites() {
        return Promise.map(DataGenerator.forKnex.invites, function (invite) {
            return models.Invite.add(invite, context.internal);
        });
    },

    insertWebhooks: function insertWebhooks() {
        return Promise.map(DataGenerator.forKnex.webhooks, function (webhook) {
            return models.Webhook.add(webhook, context.internal);
        });
    },

    insertIntegrations: function insertIntegrations() {
        return Promise.map(DataGenerator.forKnex.integrations, function (integration) {
            return models.Integration.add(integration, context.internal);
        });
    },

    insertApiKeys: function insertApiKeys() {
        return Promise.map(DataGenerator.forKnex.api_keys, function (api_key) {
            return models.ApiKey.add(api_key, context.internal);
        });
    },

    insertEmails: function insertEmails() {
        return Promise.map(DataGenerator.forKnex.emails, function (email) {
            return models.Email.add(email, context.internal);
        });
    },

    insertMembersAndLabels: function insertMembersAndLabels() {
        return Promise.map(DataGenerator.forKnex.labels, function (label) {
            return models.Label.add(label, context.internal);
        }).then(function () {
            return Promise.each(_.cloneDeep(DataGenerator.forKnex.members), function (member) {
                let memberLabelRelations = _.filter(DataGenerator.forKnex.members_labels, {member_id: member.id});

                memberLabelRelations = _.map(memberLabelRelations, function (memberLabelRelation) {
                    return _.find(DataGenerator.forKnex.labels, {id: memberLabelRelation.label_id});
                });

                member.labels = memberLabelRelations;

                return models.Member.add(member, context.internal);
            });
        }).then(function () {
            return Promise.each(_.cloneDeep(DataGenerator.forKnex.members_stripe_customers), function (customer) {
                return models.MemberStripeCustomer.add(customer, context.internal);
            });
        }).then(function () {
            let productsToInsert = fixtureUtils.findModelFixtures('Product').entries;
            return Promise.map(productsToInsert, product => models.Product.add(product, context.internal));
        }).then(function () {
            return models.Product.findOne({}, context.internal);
        }).then(function (product) {
            return Promise.each(_.cloneDeep(DataGenerator.forKnex.stripe_products), function (stripeProduct) {
                stripeProduct.product_id = product.id;
                return models.StripeProduct.add(stripeProduct, context.internal);
            });
        }).then(function () {
            return Promise.each(_.cloneDeep(DataGenerator.forKnex.stripe_prices), function (stripePrice) {
                return models.StripePrice.add(stripePrice, context.internal);
            });
        }).then(function () {
            return Promise.each(_.cloneDeep(DataGenerator.forKnex.stripe_customer_subscriptions), function (subscription) {
                return models.StripeCustomerSubscription.add(subscription, context.internal);
            });
        });
    },

    insertEmailsAndRecipients: function insertEmailsAndRecipients() {
        return Promise.each(_.cloneDeep(DataGenerator.forKnex.emails), function (email) {
            return models.Email.add(email, context.internal);
        }).then(function () {
            return Promise.each(_.cloneDeep(DataGenerator.forKnex.email_batches), function (emailBatch) {
                return models.EmailBatch.add(emailBatch, context.internal);
            });
        }).then(function () {
            return Promise.each(_.cloneDeep(DataGenerator.forKnex.email_recipients), (emailRecipient) => {
                return models.EmailRecipient.add(emailRecipient, context.internal);
            });
        }).then(function () {
            const toAggregate = {
                emailIds: DataGenerator.forKnex.emails.map(email => email.id),
                memberIds: DataGenerator.forKnex.members.map(member => member.id)
            };

            return emailAnalyticsService.aggregateStats(toAggregate);
        });
    },

    insertSnippets: function insertSnippets() {
        return Promise.map(DataGenerator.forKnex.snippets, function (snippet) {
            return models.Snippet.add(snippet, context.internal);
        });
    }
};

const toDoList = {
    permission: function insertPermission() {
        return fixtures.insertOne('Permission', 'permissions', 'createPermission');
    },
    role: function insertRole() {
        return fixtures.insertOne('Role', 'roles', 'createRole');
    },
    roles: function insertRoles() {
        return fixtures.insertRoles();
    },
    tag: function insertTag() {
        return fixtures.insertOne('Tag', 'tags', 'createTag');
    },
    member: function insertMember() {
        return fixtures.insertOne('Member', 'members', 'createMember');
    },
    members: function insertMembersAndLabels() {
        return fixtures.insertMembersAndLabels();
    },
    'members:emails': function insertEmailsAndRecipients() {
        return fixtures.insertEmailsAndRecipients();
    },
    posts: function insertPostsAndTags() {
        return fixtures.insertPostsAndTags();
    },
    'posts:mu': function insertMultiAuthorPosts() {
        return fixtures.insertMultiAuthorPosts();
    },
    tags: function insertTags() {
        return fixtures.insertTags();
    },
    'tags:extra': function insertExtraTags() {
        return fixtures.insertExtraTags();
    },
    settings: function populateSettings() {
        settingsCache.shutdown();
        return settingsService.init();
    },
    'users:roles': function createUsersWithRoles() {
        return fixtures.createUsersWithRoles();
    },
    'users:no-owner': function createUsersWithoutOwner() {
        return fixtures.createUsersWithoutOwner();
    },
    'user:inactive': function createInactiveUser() {
        return fixtures.createInactiveUser();
    },
    'users:extra': function createExtraUsers() {
        return fixtures.createExtraUsers();
    },
    owner: function insertOwnerUser() {
        return fixtures.insertOwnerUser();
    },
    'owner:pre': function initOwnerUser() {
        return fixtures.initOwnerUser();
    },
    'owner:post': function overrideOwnerUser() {
        return fixtures.overrideOwnerUser();
    },
    'perms:init': function initPermissions() {
        return permissions.init();
    },
    perms: function permissionsFor(obj) {
        return fixtures.permissionsFor(obj);
    },
    filter: function createFilterParamFixtures() {
        return filterData(DataGenerator);
    },
    invites: function insertInvites() {
        return fixtures.insertInvites();
    },
    webhooks: function insertWebhooks() {
        return fixtures.insertWebhooks();
    },
    integrations: function insertIntegrations() {
        return fixtures.insertIntegrations();
    },
    api_keys: function insertApiKeys() {
        return fixtures.insertApiKeys();
    },
    emails: function insertEmails() {
        return fixtures.insertEmails();
    },
    snippets: function insertSnippets() {
        return fixtures.insertSnippets();
    }
};

/**
 * ## getFixtureOps
 *
 * Takes the arguments from a setup function and turns them into an array of promises to fullfil
 *
 * This is effectively a list of instructions with regard to which fixtures should be setup for this test.
 *  * `default` - a special option which will cause the full suite of normal fixtures to be initialised
 *  * `perms:init` - initialise the permissions object after having added permissions
 *  * `perms:obj` - initialise permissions for a particular object type
 *  * `users:roles` - create a full suite of users, one per role
 * @param {Object} toDos
 */
const getFixtureOps = (toDos) => {
    // default = default fixtures, if it isn't present, init with tables only
    const tablesOnly = !toDos.default;

    const fixtureOps = [];

    // Database initialisation
    if (toDos.init || toDos.default) {
        fixtureOps.push(function initDB() {
            // skip adding all fixtures!
            if (tablesOnly) {
                return knexMigrator.init({skip: 2});
            }

            return knexMigrator.init();
        });

        delete toDos.default;
        delete toDos.init;
    }

    // Go through our list of things to do, and add them to an array
    _.each(toDos, function (value, toDo) {
        let tmp;

        if ((toDo !== 'perms:init' && toDo.indexOf('perms:') !== -1)) {
            tmp = toDo.split(':');

            fixtureOps.push(function addCustomFixture() {
                return toDoList[tmp[0]](tmp[1]);
            });
        } else {
            if (!toDoList[toDo]) {
                throw new Error('setup todo does not exist - spell mistake?');
            }

            fixtureOps.push(toDoList[toDo]);
        }
    });

    return fixtureOps;
};

module.exports = {
    fixtures,
    getFixtureOps
};
