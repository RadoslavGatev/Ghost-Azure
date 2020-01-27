const common = require('../../../../lib/common');
const commands = require('../../../schema/commands');

module.exports = {
    config: {
        transaction: true
    },

    async up(options){
        const conn = options.transacting || options.connection;
        const hasTable = await conn.schema.hasTable('members_stripe_customers');

        if (hasTable) {
            common.logging.info('Dropping table: members_stripe_customers');
            await commands.deleteTable('members_stripe_customers', conn);
        } else {
            common.logging.warn('Dropping table: members_stripe_customers');
        }

        common.logging.info('Adding table: members_stripe_customers');
        return commands.createTable('members_stripe_customers', conn);
    },

    async down(options){
        const conn = options.transacting || options.connection;
        const hasTable = await conn.schema.hasTable('members_stripe_customers');

        if (!hasTable) {
            common.logging.warn('Dropping table: members_stripe_customers');
            return;
        }

        common.logging.info('Dropping table: members_stripe_customers');
        return commands.deleteTable('members_stripe_customers', conn);
    }
};

