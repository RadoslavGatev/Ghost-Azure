'use strict';

var chai = require('chai'),
    expect = chai.expect,
    helpers = require('../lib/helpers');

describe('helpers', function () {
    describe('#tag', function () {
        it('returns an opening tag with attributes', function () {
            var el = {
                type: 'tag',
                name: 'foo',
                attribs: {
                    bar: 'bat'
                }
            };

            expect(helpers.tag(el)).to.be.equal('<foo bar="bat">');
        });

        it('returns an opening tag without attributes', function () {
            var el = {
                type: 'tag',
                name: 'foo'
            };

            expect(helpers.tag(el)).to.be.equal('<foo>');
        });
    });

    describe('#text', function () {
        it('returns the element\'s contents', function () {
            var el = {
                type: 'text',
                data: 'some text'
            };

            expect(helpers.text(el)).to.be.equal('some text');
        });
    });

    describe('#comment', function () {
        it('returns the element\'s contents', function () {
            var el = {
                type: 'comment',
                data: 'some text'
            };

            expect(helpers.comment(el)).to.be.equal('<!--some text-->');
        });
    });

    describe('#directive', function () {
        it('returns the element\'s contents', function () {
            var el = {
                type: 'directive',
                data: '!DOCTYPE html'
            };

            expect(helpers.directive(el)).to.be.equal('<!DOCTYPE html>');
        });
    });

    describe('#close', function () {
        it('closes non-singular tags', function () {
            var el = {
                type: 'tag',
                name: 'foo'
            };

            expect(helpers.close(el)).to.be.equal('</foo>');
        });

        it('does not close singular tags', function () {
            var el = {
                type: 'tag',
                name: 'img'
            };

            expect(helpers.close(el)).to.be.equal('');
        });

        it('does not close non-tags', function () {
            var el = {
                type: 'foo',
                name: 'bar'
            };

            expect(helpers.close(el)).to.be.equal('');
        });
    });
});
