require('../utils');
const knex = require('knex')({client: 'mysql'});
const convertor = require('../../lib/convertor');

const runQuery = query => convertor(knex('posts'), query).toQuery();

describe('Simple Expressions', function () {
    it('should match based on simple id', function () {
        runQuery({id: 3})
            .should.eql('select * from `posts` where `posts`.`id` = 3');
    });

    it('should match based on string', function () {
        runQuery({title: 'Second post'})
            .should.eql('select * from `posts` where `posts`.`title` = \'Second post\'');
    });

    it('should accept any table input and interprets it as destination where clause', function () {
        runQuery({'posts.title': 'Second post'})
            .should.eql('select * from `posts` where `posts`.`title` = \'Second post\'');
    });

    it('should accept any table input and interprets it as destination where clause', function () {
        runQuery({'count.posts': '3'})
            .should.eql('select * from `posts` where `count`.`posts` = \'3\'');
    });
});

describe('Comparison Query Operators', function () {
    it('can match equals', function () {
        runQuery({id: 2})
            .should.eql('select * from `posts` where `posts`.`id` = 2');
    });

    it('can match not equals', function () {
        runQuery({id: {$ne: 2}})
            .should.eql('select * from `posts` where `posts`.`id` != 2');
    });

    it('can match gt', function () {
        runQuery({id: {$gt: 2}})
            .should.eql('select * from `posts` where `posts`.`id` > 2');
    });

    it('can match lt', function () {
        runQuery({id: {$lt: 2}})
            .should.eql('select * from `posts` where `posts`.`id` < 2');
    });

    it('can match gte', function () {
        runQuery({id: {$gte: 2}})
            .should.eql('select * from `posts` where `posts`.`id` >= 2');
    });

    it('can match lte', function () {
        runQuery({id: {$lte: 2}})
            .should.eql('select * from `posts` where `posts`.`id` <= 2');
    });

    it('can match simple in (single value)', function () {
        runQuery({id: {$in: [2]}})
            .should.eql('select * from `posts` where `posts`.`id` in (2)');
    });

    it('can match simple in (multiple values)', function () {
        runQuery({id: {$in: [1, 3]}})
            .should.eql('select * from `posts` where `posts`.`id` in (1, 3)');
    });

    it('can match simple NOT in (single value)', function () {
        runQuery({id: {$nin: [2]}})
            .should.eql('select * from `posts` where `posts`.`id` not in (2)');
    });

    it('can match simple NOT in (multiple values)', function () {
        runQuery({id: {$nin: [1, 3]}})
            .should.eql('select * from `posts` where `posts`.`id` not in (1, 3)');
    });

    it('can match array in (single value)', function () {
        runQuery({tags: {$in: ['video']}})
            .should.eql('select * from `posts` where `posts`.`tags` in (\'video\')');
    });

    it('can match array in (multiple values)', function () {
        runQuery({tags: {$in: ['video', 'audio']}})
            .should.eql('select * from `posts` where `posts`.`tags` in (\'video\', \'audio\')');
    });

    it('can match array NOT in (single value)', function () {
        runQuery({tags: {$nin: ['video']}})
            .should.eql('select * from `posts` where `posts`.`tags` not in (\'video\')');
    });

    it('can match array NOT in (multiple values)', function () {
        runQuery({tags: {$nin: ['video', 'audio']}})
            .should.eql('select * from `posts` where `posts`.`tags` not in (\'video\', \'audio\')');
    });
});

describe('Logical Query Operators', function () {
    it('$and (different properties)', function () {
        runQuery({$and: [{featured: false}, {status: 'published'}]})
            .should.eql('select * from `posts` where (`posts`.`featured` = false and `posts`.`status` = \'published\')');
    });

    it('$and (same properties)', function () {
        runQuery({$and: [{featured: false}, {featured: true}]})
            .should.eql('select * from `posts` where (`posts`.`featured` = false and `posts`.`featured` = true)');
    });

    it('$or (different properties)', function () {
        runQuery({$or: [{featured: false}, {status: 'published'}]})
            .should.eql('select * from `posts` where (`posts`.`featured` = false or `posts`.`status` = \'published\')');
    });

    it('$or (same properties)', function () {
        runQuery({$or: [{featured: true}, {featured: false}]})
            .should.eql('select * from `posts` where (`posts`.`featured` = true or `posts`.`featured` = false)');
    });
});

describe('Logical Groups', function () {
    describe('$or', function () {
        it('ungrouped version', function () {
            runQuery({
                $or:
                    [{author: {$ne: 'joe'}},
                        {tags: {$in: ['photo']}},
                        {image: {$ne: null}},
                        {featured: true}]
            })
                .should.eql('select * from `posts` where (`posts`.`author` != \'joe\' or `posts`.`tags` in (\'photo\') or `posts`.`image` is not null or `posts`.`featured` = true)');
        });

        it('RIGHT grouped version', function () {
            runQuery({
                $or:
                    [{author: {$ne: 'joe'}},
                        {
                            $or:
                                [{tags: {$in: ['photo']}},
                                    {image: {$ne: null}},
                                    {featured: true}]
                        }]
            })
                .should.eql('select * from `posts` where (`posts`.`author` != \'joe\' or (`posts`.`tags` in (\'photo\') or `posts`.`image` is not null or `posts`.`featured` = true))');
        });

        it('LEFT grouped version', function () {
            runQuery({
                $or:
                    [{
                        $or:
                            [
                                {tags: {$in: ['photo']}},
                                {image: {$ne: null}},
                                {featured: true}]
                    },
                    {author: {$ne: 'joe'}}]
            })
                .should.eql('select * from `posts` where ((`posts`.`tags` in (\'photo\') or `posts`.`image` is not null or `posts`.`featured` = true) or `posts`.`author` != \'joe\')');
        });
    });

    describe('$and', function () {
        it('ungrouped version', function () {
            runQuery({
                $and:
                    [{author: {$ne: 'joe'}},
                        {tags: {$in: ['photo']}},
                        {image: {$ne: null}},
                        {featured: true}]
            })
                .should.eql('select * from `posts` where (`posts`.`author` != \'joe\' and `posts`.`tags` in (\'photo\') and `posts`.`image` is not null and `posts`.`featured` = true)');
        });

        it('RIGHT grouped version', function () {
            runQuery({
                $and:
                    [{author: {$ne: 'joe'}},
                        {
                            $and:
                                [{tags: {$in: ['photo']}},
                                    {image: {$ne: null}},
                                    {featured: true}]
                        }]
            })
                .should.eql('select * from `posts` where (`posts`.`author` != \'joe\' and (`posts`.`tags` in (\'photo\') and `posts`.`image` is not null and `posts`.`featured` = true))');
        });

        it('LEFT grouped version', function () {
            runQuery({
                $and:
                    [{
                        $and:
                            [{tags: {$in: ['photo']}},
                                {image: {$ne: null}},
                                {featured: true}]
                    },
                    {author: {$ne: 'joe'}}]
            })
                .should.eql('select * from `posts` where ((`posts`.`tags` in (\'photo\') and `posts`.`image` is not null and `posts`.`featured` = true) and `posts`.`author` != \'joe\')');
        });
    });

    describe('$or with $and group', function () {
        it('ungrouped version', function () {
            runQuery({
                $or:
                    [{author: {$ne: 'joe'}},
                        {
                            $and:
                                [{tags: {$in: ['photo']}},
                                    {image: {$ne: null}},
                                    {featured: true}]
                        }]
            })
                .should.eql('select * from `posts` where (`posts`.`author` != \'joe\' or (`posts`.`tags` in (\'photo\') and `posts`.`image` is not null and `posts`.`featured` = true))');
        });

        it('RIGHT grouped version', function () {
            runQuery({
                $or:
                    [{author: {$ne: 'joe'}},
                        {
                            $and:
                                [{tags: {$in: ['photo']}},
                                    {image: {$ne: null}},
                                    {featured: true}]
                        }]
            })
                .should.eql('select * from `posts` where (`posts`.`author` != \'joe\' or (`posts`.`tags` in (\'photo\') and `posts`.`image` is not null and `posts`.`featured` = true))');
        });

        it('LEFT grouped version', function () {
            runQuery({
                $or:
                    [{
                        $and:
                            [{tags: {$in: ['photo']}},
                                {image: {$ne: null}},
                                {featured: true}]
                    },
                    {author: {$ne: 'joe'}}]
            })
                .should.eql('select * from `posts` where ((`posts`.`tags` in (\'photo\') and `posts`.`image` is not null and `posts`.`featured` = true) or `posts`.`author` != \'joe\')');
        });
    });

    describe('$and with $or group', function () {
        it('ungrouped version', function () {
            runQuery({
                $or:
                    [{
                        $and:
                            [{author: {$ne: 'joe'}},
                                {tags: {$in: ['photo']}}]
                    },
                    {image: {$ne: null}},
                    {featured: true}]
            })
                .should.eql('select * from `posts` where ((`posts`.`author` != \'joe\' and `posts`.`tags` in (\'photo\')) or `posts`.`image` is not null or `posts`.`featured` = true)');
        });

        it('RIGHT grouped version', function () {
            runQuery({
                $and:
                    [{author: {$ne: 'joe'}},
                        {
                            $or:
                                [{tags: {$in: ['photo']}},
                                    {image: {$ne: null}},
                                    {featured: true}]
                        }]
            })
                .should.eql('select * from `posts` where (`posts`.`author` != \'joe\' and (`posts`.`tags` in (\'photo\') or `posts`.`image` is not null or `posts`.`featured` = true))');
        });

        it('LEFT grouped version', function () {
            runQuery({
                $and:
                    [{
                        $or:
                            [{tags: {$in: ['photo']}},
                                {image: {$ne: null}},
                                {featured: true}]
                    },
                    {author: {$ne: 'joe'}}]
            })
                .should.eql('select * from `posts` where ((`posts`.`tags` in (\'photo\') or `posts`.`image` is not null or `posts`.`featured` = true) and `posts`.`author` != \'joe\')');
        });
    });
});
