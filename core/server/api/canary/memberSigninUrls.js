const i18n = require('../../../shared/i18n');
const errors = require('@tryghost/errors');
const membersService = require('../../services/members');

module.exports = {
    docName: 'member_signin_urls',
    permissions: true,
    read: {
        data: [
            'id'
        ],
        permissions: true,
        async query(frame) {
            let model = await membersService.api.members.get(frame.data, frame.options);

            if (!model) {
                throw new errors.NotFoundError({
                    message: i18n.t('errors.api.members.memberNotFound')
                });
            }

            const magicLink = await membersService.api.getMagicLink(model.get('email'));

            return {
                member_id: model.get('id'),
                url: magicLink
            };
        }
    }
};
