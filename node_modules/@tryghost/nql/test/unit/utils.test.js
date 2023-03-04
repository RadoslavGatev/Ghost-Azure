const utils = require('../../lib/utils');

describe('Utils', function () {
    describe('Expand filters', function () {
        it('should not fail when no expansions provided', function () {
            utils.expandFilters({status: 'draft'}).should.eql({status: 'draft'});
        });

        it('should substitute single alias without expansion', function () {
            const mongoJSON = {primary_tag: 'en'};
            const expansions = [{
                key: 'primary_tag',
                replacement: 'tags.slug'
            }];

            const output = {'tags.slug': 'en'};

            utils.expandFilters(mongoJSON, expansions).should.eql(output);
        });

        it('should substitute single alias', function () {
            const filter = {primary_tag: 'en'};
            const expansions = [{
                key: 'primary_tag',
                replacement: 'tags.slug',
                expansion: `posts_tags.order:0`
            }];

            const processed = {$and: [
                {'tags.slug': 'en'},
                {'posts_tags.order': 0}
            ]};

            utils.expandFilters(filter, expansions).should.eql(processed);
        });

        it('should substitute single alias with multiple expansions', function () {
            const filter = {primary_tag: 'en'};
            const expansions = [{
                key: 'primary_tag',
                replacement: 'tags.slug',
                expansion: 'posts_tags.order:0+tags.visibility:public'
            }];

            const processed = {$and: [
                {'tags.slug': 'en'},
                {'posts_tags.order': 0},
                {'tags.visibility': 'public'}
            ]};

            utils.expandFilters(filter, expansions).should.eql(processed);
        });
    });

    describe('Parse expansions', function () {
        it('should transform single expansion', function () {
            const input = [
                {
                    key: 'primary_authors',
                    replacement: 'users',
                    expansion: 'order:0'
                }
            ];
            const output = [
                {
                    key: 'primary_authors',
                    replacement: 'users',
                    expansion: {order: 0}
                }
            ];

            utils.parseExpansions(input).should.eql(output);
            input.should.eql(input); // input should not be mutated
        });

        it('should transform multiple expansions', function () {
            const input = [
                {
                    key: 'primary_authors',
                    replacement: 'users',
                    expansion: 'order:0'
                },
                {
                    key: 'primary_tags',
                    replacement: 'tags',
                    expansion: 'order:0'
                }
            ];
            const output = [
                {
                    key: 'primary_authors',
                    replacement: 'users',
                    expansion: {order: 0}
                },
                {
                    key: 'primary_tags',
                    replacement: 'tags',
                    expansion: {order: 0}
                }
            ];

            utils.parseExpansions(input).should.eql(output);
            input.should.eql(input); // input should not be mutated
        });
    });
});
