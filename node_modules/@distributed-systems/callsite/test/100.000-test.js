'use strict';

const section = require('section-tests');
const assert = require('assert');
const log = require('ee-log');




// use the spec reporter for console ouput
section.use(new section.SpecReporter());



section('Callsite', () => {
    section.test('Loading the code', async () => {
        require('../');
    });


    section.test('Instantiating the class', async () => {
        const Callsite = require('../');
        new Callsite();
    });


    section.test('getRawStack', async () => {
        const Callsite = require('../');
        const callsite = new Callsite();
        const frames = callsite.getRawStack();

        assert(frames.length > 3);
        assert.equal(frames[0].getFunctionName(), 'section.test');
    });


    section.test('getRawStack with a custom frame', async() => {
        const Callsite = require('../');
        const callsite = new Callsite();

        const x = () => {
            return callsite.getRawStack({
                fn: x
            });
        };

        const y = () => x();

        const frames = y();

        assert(frames.length > 3);
        assert.equal(frames[0].getFunctionName(), 'y');
    });


    section.test('getRawStack, slice', async() => {
        const Callsite = require('../');
        const callsite = new Callsite();

        const x = () => {
            return callsite.getRawStack({
                slice: 1
            });
        };

        const y = () => x();

        const frames = y();

        assert(frames.length > 3);
        assert.equal(frames[0].getFunctionName(), 'y');
    });


    section.test('getRawStack, limit', async() => {
        const Callsite = require('../');
        const callsite = new Callsite();
        const frames = callsite.getRawStack({limit: 1});

        assert.equal(frames.length, 1);
        assert.equal(frames[0].getFunctionName(), 'section.test');
    });


    section.test('getStack', async () => {
        const Callsite = require('../');
        const callsite = new Callsite();
        const frames = callsite.getStack();

        assert(frames.length > 3);
        assert.equal(frames[0].function, 'section.test');
    });
});