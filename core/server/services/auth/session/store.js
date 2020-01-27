const {Store} = require('express-session');
const common = require('../../../lib/common');

module.exports = class SessionStore extends Store {
    constructor(SessionModel) {
        super();
        this.SessionModel = SessionModel;
    }

    destroy(sid, callback) {
        this.SessionModel
            .destroy({session_id: sid})
            .then(() => {
                callback(null);
            })
            .catch(callback);
    }

    get(sid, callback) {
        this.SessionModel
            .findOne({session_id: sid})
            .then((model) => {
                if (!model) {
                    return callback(null, null);
                }
                callback(null, model.get('session_data'));
            })
            .catch(callback);
    }

    set(sid, sessionData, callback) {
        if (!sessionData.user_id) {
            return callback(new common.errors.InternalServerError({
                message: common.i18n.t('errors.middleware.auth.missingUserID')
            }));
        }
        this.SessionModel
            .upsert({session_data: sessionData}, {session_id: sid})
            .then(() => {
                callback(null);
            })
            .catch(callback);
    }
};
