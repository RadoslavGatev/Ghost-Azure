"use strict";
var expect      = require('chai').expect;
var CustomError = require('../index');

describe('CustomError', function() {

    describe('define', function() {

        it('returns constructor function', function() {
            expect(CustomError('MyError')).to.be.a('function');
        });

        describe('parameter tests', function() {

            it('no parameters', function() {
                var proto = CustomError().prototype.CustomError;
                expect(proto.chain).to.be.an('Array');
                expect(proto.factory).to.be.a('function');
                expect(proto.name).to.be.equal('Error');
                expect(proto.parent).to.be.equal(Error);
                expect(proto.properties).to.be.deep.equal({});
            });

            describe('start name', function() {

                it('name only', function() {
                    expect(CustomError('Foo').prototype.CustomError.name).to.be.equal('Foo');
                });

                it('name and parent', function() {
                    var P = CustomError();
                    var E = CustomError('Foo', P);
                    expect(E.prototype.CustomError.name).to.be.equal('Foo');
                    expect(E.prototype.CustomError.parent).to.be.equal(P);
                });

                it('name and properties', function() {
                    var E = CustomError('Foo', { foo: 'bar' });
                    expect(E.prototype.CustomError.name).to.be.equal('Foo');
                    expect(E.prototype.CustomError.properties).to.be.deep.equal({ foo: 'bar' });
                });

                it('name and factory', function() {
                    var fn = function() {};
                    var E = CustomError('Foo', fn);
                    expect(E.prototype.CustomError.name).to.be.equal('Foo');
                    expect(E.prototype.CustomError.factory).to.be.equal(fn);
                });

            });

            describe('start parent', function() {

                it('parent only', function() {
                    var E = CustomError();
                    expect(CustomError(E).prototype.CustomError.parent).to.be.equal(E);
                });

                it('parent and properties', function() {
                    var P = CustomError();
                    var E = CustomError(P, { foo: 'bar' });
                    expect(E.prototype.CustomError.parent).to.be.equal(P);
                    expect(E.prototype.CustomError.properties).to.be.deep.equal({ foo: 'bar' });
                });

                it('should fail properties then parent', function() {
                    try {
                        var P = CustomError();
                        var E = CustomError({ foo: 'bar' }, P);
                        throw new Error('Should have failed');
                    } catch (e) {
                        expect(e.name).to.be.equal('CustomError');
                        expect(e.code).to.be.equal('EOARG');
                    }
                });

                it('parent and factory', function() {
                    var fn = function() {};
                    var P = CustomError();
                    var E = CustomError(P, fn);
                    expect(E.prototype.CustomError.parent).to.be.equal(P);
                    expect(E.prototype.CustomError.factory).to.be.equal(fn);
                });

            });

            describe('start properties', function() {

                it('properties only', function() {
                    expect(CustomError({ foo: 'bar' }).prototype.CustomError.properties).to.be.deep.equal({ foo: 'bar' });
                });

                it('properties and factory', function() {
                    var fn = function() {};
                    var E = CustomError({ foo: 'bar' }, fn);
                    expect(E.prototype.CustomError.properties).to.be.deep.equal({ foo: 'bar' });
                    expect(E.prototype.CustomError.factory).to.be.equal(fn);
                });

            });

            describe('start factory', function() {

                it('factory only', function() {
                    var fn = function() {};
                    expect(CustomError(fn).prototype.CustomError.factory).to.be.equal(fn);
                });

            });

        });

    });

    describe('inherit', function() {

        it('inherits from Error', function() {
            var E = CustomError();
            expect(E()).to.be.instanceof(Error);
        });

        it('instance of self custom error constructor', function() {
            var E = CustomError();
            expect(E()).to.be.instanceof(E);
        });

        it('inherits from custom error', function() {
            var P = CustomError();
            var E = CustomError(P);
            var e = E();
            expect(e).to.be.instanceof(Error);
            expect(e).to.be.instanceof(P);
            expect(e).to.be.instanceof(E);
        });

    });

    describe('name', function() {

        it('instance has name provided', function() {
            var e = CustomError('FooError')();
            expect(e.name).to.be.equal('FooError');
        });

        it('instance has name inherited', function() {
            var P = CustomError('FooError');
            var e = CustomError(P)();
            expect(e.name).to.be.equal('FooError');
        });

        it('instance has constructor name provided', function() {
            var e = CustomError('FooError')();
            expect(e.constructor.name).to.be.equal('FooError');
        });

        it('instance has constructor name inherited', function() {
            var P = CustomError('FooError');
            var e = CustomError(P)();
            expect(e.constructor.name).to.be.equal('FooError');
        });

    });

    describe('factory', function() {

        it('default factory', function() {
            var E = CustomError();
            var e = E('Hello');
            expect(e.message).to.be.equal('Hello');
        });

        it('custom factory', function() {
            var fn = function(props, config) { this.message = JSON.stringify(props); };
            var e = CustomError(fn)('Hello');
            expect(e.message).to.be.equal('{"message":"Hello"}');
            expect(e.stack).to.be.undefined;
        });

        it('custom factory calling root', function() {
            var fn = function(props, config, factory) {
                factory.root(props, config);
                this.message += ', Bob';
            };
            var e = CustomError(fn)('Hello');
            expect(e.message).to.be.equal('Hello, Bob');
            expect(e.stack).to.not.be.undefined;
        });

        it('custom and inherited factory', function() {
            var fn = function(props, config) { this.message += 'ABC'; };
            var P = CustomError();
            var e = CustomError(P, fn)('Hello');
            expect(e.message).to.be.equal('HelloABC');
        });

    });

});