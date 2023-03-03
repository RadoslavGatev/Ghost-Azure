const utils = require('../utils');
const nql = require('../../lib/nql');

const knex = utils.db.client;

/**
 * The purpose of this file is to prove that NQL
 * is not just transformed to mongo queries correctly
 * but that this can be used in real world settings to query SQL databases
 */

describe('Integration with Knex', () => {
    before(utils.db.setup());
    after(utils.db.teardown());

    it('should match based on simple id', () => {
        const query = nql('featured:true');

        return query
            .querySQL(knex('posts'))
            .select()
            .then((result) => {
                result.should.be.an.Array().with.lengthOf(4);
                result[0].featured.should.equal(1);
            });
    });
});
