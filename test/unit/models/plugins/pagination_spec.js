const should = require('should');
const sinon = require('sinon');
const Promise = require('bluebird');
const rewire = require('rewire');
const pagination = rewire('../../../../core/server/models/plugins/pagination');

describe('pagination', function () {
    let paginationUtils;

    afterEach(function () {
        sinon.restore();
    });

    describe('paginationUtils', function () {
        before(function () {
            paginationUtils = pagination.__get__('paginationUtils');
        });

        describe('formatResponse', function () {
            let formatResponse;

            before(function () {
                formatResponse = paginationUtils.formatResponse;
            });

            it('returns correct pagination object for single page', function () {
                formatResponse(5, {limit: 10, page: 1}).should.eql({
                    limit: 10,
                    next: null,
                    page: 1,
                    pages: 1,
                    prev: null,
                    total: 5
                });
            });

            it('returns correct pagination object for first page of many', function () {
                formatResponse(44, {limit: 5, page: 1}).should.eql({
                    limit: 5,
                    next: 2,
                    page: 1,
                    pages: 9,
                    prev: null,
                    total: 44
                });
            });

            it('returns correct pagination object for middle page of many', function () {
                formatResponse(44, {limit: 5, page: 9}).should.eql({
                    limit: 5,
                    next: null,
                    page: 9,
                    pages: 9,
                    prev: 8,
                    total: 44
                });
            });

            it('returns correct pagination object for last page of many', function () {
                formatResponse(44, {limit: 5, page: 3}).should.eql({
                    limit: 5,
                    next: 4,
                    page: 3,
                    pages: 9,
                    prev: 2,
                    total: 44
                });
            });

            it('returns correct pagination object when page not set', function () {
                formatResponse(5, {limit: 10}).should.eql({
                    limit: 10,
                    next: null,
                    page: 1,
                    pages: 1,
                    prev: null,
                    total: 5
                });
            });

            it('returns correct pagination object for limit all', function () {
                formatResponse(5, {limit: 'all'}).should.eql({
                    limit: 'all',
                    next: null,
                    page: 1,
                    pages: 1,
                    prev: null,
                    total: 5
                });
            });
        });

        describe('parseOptions', function () {
            let parseOptions;

            before(function () {
                parseOptions = paginationUtils.parseOptions;
            });

            it('should use defaults if no options are passed', function () {
                parseOptions().should.eql({
                    limit: 15,
                    page: 1
                });
            });

            it('should accept numbers for limit and page', function () {
                parseOptions({
                    limit: 10,
                    page: 2
                }).should.eql({
                    limit: 10,
                    page: 2
                });
            });

            it('should use defaults if bad options are passed', function () {
                parseOptions({
                    limit: 'thelma',
                    page: 'louise'
                }).should.eql({
                    limit: 15,
                    page: 1
                });
            });

            it('should permit all for limit', function () {
                parseOptions({
                    limit: 'all'
                }).should.eql({
                    limit: 'all',
                    page: 1
                });
            });
        });

        describe('addLimitAndOffset', function () {
            let addLimitAndOffset;
            const collection = {};

            before(function () {
                addLimitAndOffset = paginationUtils.addLimitAndOffset;
            });

            beforeEach(function () {
                collection.query = sinon.stub().returns(collection);
            });

            it('should add query options if limit is set', function () {
                addLimitAndOffset(collection, {limit: 5, page: 1});

                collection.query.calledTwice.should.be.true();
                collection.query.firstCall.calledWith('limit', 5).should.be.true();
                collection.query.secondCall.calledWith('offset', 0).should.be.true();
            });

            it('should not add query options if limit is not set', function () {
                addLimitAndOffset(collection, {page: 1});

                collection.query.called.should.be.false();
            });
        });
    });

    describe('fetchPage', function () {
        let model;
        let bookshelf;
        let knex;
        let mockQuery;

        before(function () {
            paginationUtils = pagination.__get__('paginationUtils');
        });

        beforeEach(function () {
            // Stub paginationUtils
            paginationUtils.parseOptions = sinon.stub();
            paginationUtils.addLimitAndOffset = sinon.stub();
            paginationUtils.formatResponse = sinon.stub().returns({});

            // Mock out bookshelf model
            mockQuery = {
                clone: sinon.stub(),
                select: sinon.stub(),
                toQuery: sinon.stub()
            };
            mockQuery.clone.returns(mockQuery);
            mockQuery.select.returns(Promise.resolve([{aggregate: 1}]));

            model = function () {
            };

            model.prototype.fetchAll = sinon.stub().returns(Promise.resolve({}));
            model.prototype.query = sinon.stub();
            model.prototype.query.returns(mockQuery);

            knex = {raw: sinon.stub().returns(Promise.resolve())};

            bookshelf = {Model: model, knex: knex};

            pagination(bookshelf);
        });

        it('extends Model with fetchPage', function () {
            bookshelf.Model.prototype.should.have.ownProperty('fetchPage');
            bookshelf.Model.prototype.fetchPage.should.be.a.Function();
        });

        it('calls all paginationUtils and methods', function (done) {
            paginationUtils.parseOptions.returns({});

            bookshelf.Model.prototype.fetchPage().then(function () {
                sinon.assert.callOrder(
                    paginationUtils.parseOptions,
                    model.prototype.query,
                    mockQuery.clone,
                    mockQuery.select,
                    paginationUtils.addLimitAndOffset,
                    model.prototype.fetchAll,
                    paginationUtils.formatResponse
                );

                paginationUtils.parseOptions.calledOnce.should.be.true();
                paginationUtils.parseOptions.calledWith(undefined).should.be.true();

                paginationUtils.addLimitAndOffset.calledOnce.should.be.true();
                paginationUtils.formatResponse.calledOnce.should.be.true();

                model.prototype.query.calledOnce.should.be.true();
                model.prototype.query.firstCall.calledWith().should.be.true();

                mockQuery.clone.calledOnce.should.be.true();
                mockQuery.clone.firstCall.calledWith().should.be.true();

                mockQuery.select.calledOnce.should.be.true();
                mockQuery.select.calledWith().should.be.true();

                model.prototype.fetchAll.calledOnce.should.be.true();
                model.prototype.fetchAll.calledWith({}).should.be.true();

                done();
            }).catch(done);
        });

        it('calls all paginationUtils and methods when order set', function (done) {
            const orderOptions = {order: {id: 'DESC'}};
            paginationUtils.parseOptions.returns(orderOptions);

            bookshelf.Model.prototype.fetchPage(orderOptions).then(function () {
                sinon.assert.callOrder(
                    paginationUtils.parseOptions,
                    model.prototype.query,
                    mockQuery.clone,
                    mockQuery.select,
                    paginationUtils.addLimitAndOffset,
                    model.prototype.query,
                    model.prototype.fetchAll,
                    paginationUtils.formatResponse
                );

                paginationUtils.parseOptions.calledOnce.should.be.true();
                paginationUtils.parseOptions.calledWith(orderOptions).should.be.true();

                paginationUtils.addLimitAndOffset.calledOnce.should.be.true();
                paginationUtils.formatResponse.calledOnce.should.be.true();

                model.prototype.query.calledTwice.should.be.true();
                model.prototype.query.firstCall.calledWith().should.be.true();
                model.prototype.query.secondCall.calledWith('orderBy', 'id', 'DESC').should.be.true();

                mockQuery.clone.calledOnce.should.be.true();
                mockQuery.clone.firstCall.calledWith().should.be.true();

                mockQuery.select.calledOnce.should.be.true();
                mockQuery.select.calledWith().should.be.true();

                model.prototype.fetchAll.calledOnce.should.be.true();
                model.prototype.fetchAll.calledWith(orderOptions).should.be.true();

                done();
            }).catch(done);
        });

        it('calls all paginationUtils and methods when group by set', function (done) {
            const groupOptions = {groups: ['posts.id']};
            paginationUtils.parseOptions.returns(groupOptions);

            bookshelf.Model.prototype.fetchPage(groupOptions).then(function () {
                sinon.assert.callOrder(
                    paginationUtils.parseOptions,
                    model.prototype.query,
                    mockQuery.clone,
                    mockQuery.select,
                    paginationUtils.addLimitAndOffset,
                    model.prototype.query,
                    model.prototype.fetchAll,
                    paginationUtils.formatResponse
                );

                paginationUtils.parseOptions.calledOnce.should.be.true();
                paginationUtils.parseOptions.calledWith(groupOptions).should.be.true();

                paginationUtils.addLimitAndOffset.calledOnce.should.be.true();
                paginationUtils.formatResponse.calledOnce.should.be.true();

                model.prototype.query.calledTwice.should.be.true();
                model.prototype.query.firstCall.calledWith().should.be.true();
                model.prototype.query.secondCall.calledWith('groupBy', 'posts.id').should.be.true();

                mockQuery.clone.calledOnce.should.be.true();
                mockQuery.clone.firstCall.calledWith().should.be.true();

                mockQuery.select.calledOnce.should.be.true();
                mockQuery.select.calledWith().should.be.true();

                model.prototype.fetchAll.calledOnce.should.be.true();
                model.prototype.fetchAll.calledWith(groupOptions).should.be.true();

                done();
            }).catch(done);
        });

        it('returns expected response', function (done) {
            paginationUtils.parseOptions.returns({});
            bookshelf.Model.prototype.fetchPage().then(function (result) {
                result.should.have.ownProperty('collection');
                result.should.have.ownProperty('pagination');
                result.collection.should.be.an.Object();
                result.pagination.should.be.an.Object();

                done();
            });
        });

        it('returns expected response even when aggregate is empty', function (done) {
            // override aggregate response
            mockQuery.select.returns(Promise.resolve([]));
            paginationUtils.parseOptions.returns({});

            bookshelf.Model.prototype.fetchPage().then(function (result) {
                result.should.have.ownProperty('collection');
                result.should.have.ownProperty('pagination');
                result.collection.should.be.an.Object();
                result.pagination.should.be.an.Object();

                done();
            });
        });
    });
});
