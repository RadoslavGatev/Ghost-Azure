const models = require('../../models');

module.exports = {
    docName: 'roles',
    browse: {
        options: [
            'permissions'
        ],
        validation: {
            options: {
                permissions: ['assign']
            }
        },
        permissions: true,
        query(frame) {
            return models.Role.findAll(frame.options);
        }
    }
};
