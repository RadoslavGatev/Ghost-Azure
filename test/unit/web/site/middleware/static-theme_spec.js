const should = require('should');
const sinon = require('sinon');

const express = require('../../../../../core/shared/express');
const themeEngine = require('../../../../../core/frontend/services/theme-engine');
const staticTheme = require('../../../../../core/server/web/site/middleware/static-theme');

describe('staticTheme', function () {
    let expressStaticStub;
    let activeThemeStub;
    let req;
    let res;

    beforeEach(function () {
        req = {};
        res = {};

        activeThemeStub = sinon.stub(themeEngine, 'getActive').returns({
            path: 'my/fake/path'
        });

        expressStaticStub = sinon.spy(express, 'static');
    });

    afterEach(function () {
        sinon.restore();
    });

    it('should skip for .hbs file', function (done) {
        req.path = 'mytemplate.hbs';

        staticTheme()(req, res, function next() {
            activeThemeStub.called.should.be.false();
            expressStaticStub.called.should.be.false();

            done();
        });
    });

    it('should skip for .md file', function (done) {
        req.path = 'README.md';

        staticTheme()(req, res, function next() {
            activeThemeStub.called.should.be.false();
            expressStaticStub.called.should.be.false();

            done();
        });
    });

    it('should skip for .json file', function (done) {
        req.path = 'sample.json';

        staticTheme()(req, res, function next() {
            activeThemeStub.called.should.be.false();
            expressStaticStub.called.should.be.false();

            done();
        });
    });

    it('should call express.static for .css file', function (done) {
        req.path = 'myvalidfile.css';

        staticTheme()(req, res, function next() {
            // Specifically gets called twice
            activeThemeStub.calledTwice.should.be.true();
            expressStaticStub.called.should.be.true();

            // Check that express static gets called with the theme path + maxAge
            should.exist(expressStaticStub.firstCall.args);
            expressStaticStub.firstCall.args[0].should.eql('my/fake/path');
            expressStaticStub.firstCall.args[1].should.be.an.Object().with.property('maxAge');

            done();
        });
    });

    it('should call express.static for .js file', function (done) {
        req.path = 'myvalidfile.js';

        staticTheme()(req, res, function next() {
            // Specifically gets called twice
            activeThemeStub.calledTwice.should.be.true();
            expressStaticStub.called.should.be.true();

            // Check that express static gets called with the theme path + maxAge
            should.exist(expressStaticStub.firstCall.args);
            expressStaticStub.firstCall.args[0].should.eql('my/fake/path');
            expressStaticStub.firstCall.args[1].should.be.an.Object().with.property('maxAge');

            done();
        });
    });

    it('should not error if active theme is missing', function (done) {
        req.path = 'myvalidfile.css';

        // make the active theme not exist
        activeThemeStub.returns(undefined);

        staticTheme()(req, res, function next() {
            activeThemeStub.calledOnce.should.be.true();
            expressStaticStub.called.should.be.false();

            done();
        });
    });

    it('should NOT skip if file is on whitelist', function (done) {
        req.path = 'manifest.json';

        staticTheme()(req, res, function next() {
            // Specifically gets called twice
            activeThemeStub.calledTwice.should.be.true();
            expressStaticStub.called.should.be.true();

            // Check that express static gets called with the theme path + maxAge
            should.exist(expressStaticStub.firstCall.args);
            expressStaticStub.firstCall.args[0].should.eql('my/fake/path');
            expressStaticStub.firstCall.args[1].should.be.an.Object().with.property('maxAge');

            done();
        });
    });
});
