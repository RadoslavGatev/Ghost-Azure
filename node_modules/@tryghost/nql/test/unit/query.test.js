require('../utils');

const nql = require('../../');
const knex = require('knex')({client: 'mysql'});

describe('NQL -> SQL', function () {
    describe('Can handle regexes safely', function () {
        it('can handle regex STRING with escaped quotes', function () {
            let query;

            query = nql(`name:~'John O\\'Nolan'`);

            query.lex().should.eql([
                {token: 'PROP', matched: 'name:'},
                {token: 'CONTAINS', matched: '~'},
                {token: 'STRING', matched: '\'John O\\\'Nolan\''}
            ]);

            query.toJSON().should.eql({name: {$regex: /John O'Nolan/i}});
            query.querySQL(knex('users')).toQuery().should.eql('select * from `users` where lower(`users`.`name`) like \'%john o\\\'nolan%\'');

            query = nql(`name:~'John O\\"Nolan'`);
            query.toJSON().should.eql({name: {$regex: /John O"Nolan/i}});

            query.lex().should.eql([
                {token: 'PROP', matched: 'name:'},
                {token: 'CONTAINS', matched: '~'},
                {token: 'STRING', matched: '\'John O\\"Nolan\''}
            ]);

            query.querySQL(knex('users')).toQuery().should.eql('select * from `users` where lower(`users`.`name`) like \'%john o\\"nolan%\'');

            query = nql(`name:~'A\\'B\\"C\\"D\\''`);
            query.toJSON().should.eql({name: {$regex: /A'B"C"D'/i}});

            query.lex().should.eql([
                {token: 'PROP', matched: 'name:'},
                {token: 'CONTAINS', matched: '~'},
                {token: 'STRING', matched: '\'A\\\'B\\"C\\"D\\\'\''}
            ]);

            query.querySQL(knex('users')).toQuery().should.eql('select * from `users` where lower(`users`.`name`) like \'%a\\\'b\\"c\\"d\\\'%\'');
        });

        it('errors for unescaped quotes / injection patterns', function () {
            (function () {
                nql(`name:~'bad';'`).lex();
            }).should.throw();

            (function () {
                nql(`name:~'';'`).lex();
            }).should.throw();

            let query;
            // we can't force bad quotes, it errors as above
            // query = nql("name:~'';select * from `settings` where `value` like ''");

            // Can we trick SQL?
            query = nql("name:~'\\';select * from `settings` where `value` like \\''"); // eslint-disable-line quotes

            // The regex only has the regex chars escaped, not quotes
            query.toJSON().should.eql({name: {$regex: /';select \* from `settings` where `value` like '/i}});

            //SQL still ends up correctly escaped. This is all handled by knex... but having a test feels right
            query.querySQL(knex('users')).toQuery().should.eql('select * from `users` where lower(`users`.`name`) like \'%\\\';select * from `settings` where `value` like \\\'%\'');
        });
    });
});
