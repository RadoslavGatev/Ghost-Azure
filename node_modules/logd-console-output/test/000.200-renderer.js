'use strict';

// dont move this line! teh stack will change
const err = new Error('A nasty problem that needs to be fixed!');
err.code = 'E_ACCESS';
err.errno = 5467;

const section = require('section-tests');
const assert = require('assert');
const OutputValidator = require('./lib/OutputValidator');
const chalk = require('chalk');




section('Renderer', (section) => {

    section.test('String', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate(['a friggin string'], ['\u001b[90m(16)\u001b[39m\u001b[90m: \u001b[39m\u001b[32ma friggin string\u001b[39m']);
    });


    section.test('Number', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([1], ['\u001b[34m1\u001b[39m']);
    });


    section.test('Date', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([new Date(0)], ['\u001b[36m1970-01-01T00:00:00.000Z\u001b[39m']);
    });


    section.test('Boolean', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([true, false], [
            '\u001b[2m\u001b[31mtrue\u001b[39m\u001b[22m',
            '\u001b[2m\u001b[31mfalse\u001b[39m\u001b[22m'
        ]);
    });


    section.test('RegExp', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([/test/ig], ['\u001b[90m[RegExp]\u001b[39m\u001b[90m: \u001b[39m\u001b[35m/test/gi\u001b[39m']);
    });


    section.test('Symbol', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([Symbol(1), Symbol()], [
            '\u001b[90m[Symbol]\u001b[39m\u001b[90m: \u001b[39m\u001b[35mSymbol(1)\u001b[39m',
            '\u001b[90m[Symbol]\u001b[39m\u001b[90m: \u001b[39m\u001b[35mSymbol()\u001b[39m'
        ]);
    });


    section.test('Error', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([err], [
            '\u001b[1m\u001b[31m[Error] \u001b[39m\u001b[22m\u001b[1m\u001b[37mA nasty problem that needs to be fixed!\u001b[39m\u001b[22m',
            '',
            '\u001b[37m    code\u001b[39m\u001b[90m: \u001b[39m\u001b[36mE_ACCESS\u001b[39m',
            '\u001b[37m   errno\u001b[39m\u001b[90m: \u001b[39m\u001b[36m5467\u001b[39m',
            '',
            '\u001b[33m       test/000.200-renderer.js\u001b[39m\u001b[37m    4\u001b[39m\u001b[90m:13  \u001b[39m\u001b[37mObject.<anonymous>\u001b[39m',
        ]);
    });


    section.test('Undefined', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([undefined], ['\u001b[35m<undefined>\u001b[39m']);
    });

    section.test('Null', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([null], ['\u001b[35m<null>\u001b[39m']);
    });


    section.test('Buffer', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([Buffer.alloc(100, 'a')], ['\u001b[90m[Buffer] (100 bytes)\u001b[39m\u001b[90m: \u001b[39m\u001b[37m0x6161616161616161616161616161616161616161616161616161616161616161616161616161616…\u001b[39m']);
    });


    section.test('WeakMap', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([new WeakMap()], ['\u001b[90m[WeakMap]\u001b[39m\u001b[90m: \u001b[39m\u001b[35m<non-iterable>\u001b[39m']);
    });


    section.test('WeakSet', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([new WeakSet()], ['\u001b[90m[WeakSet]\u001b[39m\u001b[90m: \u001b[39m\u001b[35m<non-iterable>\u001b[39m']);
    });


    section.test('Function', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        const testArrowFunction = (parameter) => {
            return 1;
        }

        await validator.validate([testArrowFunction], [
            '\u001b[90m[Function] (3 lines)\u001b[39m\u001b[90m: \u001b[39m\u001b[36mtestArrowFunction \u001b[39m\u001b[90m(parameter) => {\u001b[39m',
            '\u001b[90m    r…\u001b[39m'
        ]);
    });


    section.test('Promise', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        const promise = new Promise((resolve, rejects) => {
            resolve();
        })

        await validator.validate([promise], [
            '\u001b[90m[Promise]\u001b[39m\u001b[90m: \u001b[39m\u001b[35m<promise>\u001b[39m',
        ]);
    });



    section.test('Array', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([['first element', 'second element', 123445]], [
            '\u001b[90m[Array] (3): [\u001b[39m',
            '    \u001b[90m0 (13)\u001b[39m\u001b[90m: \u001b[39m\u001b[32mfirst element\u001b[39m',
            '    \u001b[90m1 (14)\u001b[39m\u001b[90m: \u001b[39m\u001b[32msecond element\u001b[39m',
            '    \u001b[90m2\u001b[39m\u001b[90m: \u001b[39m\u001b[34m123445\u001b[39m',
            '\u001b[90m]\u001b[39m'
        ]);
    });


    section.test('Set', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([new Set(['first element', 'second element', 123445])], [
            '\u001b[90m[Set] (3): [\u001b[39m',
            '    \u001b[90m0 (13)\u001b[39m\u001b[90m: \u001b[39m\u001b[32mfirst element\u001b[39m',
            '    \u001b[90m1 (14)\u001b[39m\u001b[90m: \u001b[39m\u001b[32msecond element\u001b[39m',
            '    \u001b[90m2\u001b[39m\u001b[90m: \u001b[39m\u001b[34m123445\u001b[39m',
            '\u001b[90m]\u001b[39m'
        ]);
    });


    section.test('Object', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([{first: 'first element', second: 'second element', third: 123445}], [
            '\u001b[90m[Object] (3): {\u001b[39m',
            '    \u001b[2m\u001b[37mfirst\u001b[39m\u001b[22m \u001b[90m(13)\u001b[39m\u001b[90m: \u001b[39m\u001b[32mfirst element\u001b[39m',
            '    \u001b[2m\u001b[37msecond\u001b[39m\u001b[22m \u001b[90m(14)\u001b[39m\u001b[90m: \u001b[39m\u001b[32msecond element\u001b[39m',
            '    \u001b[2m\u001b[37mthird\u001b[39m\u001b[22m\u001b[90m: \u001b[39m\u001b[34m123445\u001b[39m',
            '\u001b[90m}\u001b[39m'
        ]);
    });


    section.test('Map', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([new Map([
            ['first', 'first element'],
            ['second', 'second element'],
            ['third', 123445]
        ])], [
            '\u001b[90m[Map] (3): {\u001b[39m',
            '    \u001b[2m\u001b[37mfirst\u001b[39m\u001b[22m \u001b[90m(13)\u001b[39m\u001b[90m: \u001b[39m\u001b[32mfirst element\u001b[39m',
            '    \u001b[2m\u001b[37msecond\u001b[39m\u001b[22m \u001b[90m(14)\u001b[39m\u001b[90m: \u001b[39m\u001b[32msecond element\u001b[39m',
            '    \u001b[2m\u001b[37mthird\u001b[39m\u001b[22m\u001b[90m: \u001b[39m\u001b[34m123445\u001b[39m',
            '\u001b[90m}\u001b[39m'
        ]);
    });


    section.test('Array & Object', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([[{first: 'first element', second: 'second element', third: 123445}, 1]], [
            '\u001b[90m[Array] (2): [\u001b[39m',
            '    \u001b[90m0 [Object] (3): {\u001b[39m',
            '        \u001b[2m\u001b[37mfirst\u001b[39m\u001b[22m \u001b[90m(13)\u001b[39m\u001b[90m: \u001b[39m\u001b[32mfirst element\u001b[39m',
            '        \u001b[2m\u001b[37msecond\u001b[39m\u001b[22m \u001b[90m(14)\u001b[39m\u001b[90m: \u001b[39m\u001b[32msecond element\u001b[39m',
            '        \u001b[2m\u001b[37mthird\u001b[39m\u001b[22m\u001b[90m: \u001b[39m\u001b[34m123445\u001b[39m',
            '    \u001b[90m}\u001b[39m',
            '    \u001b[90m1\u001b[39m\u001b[90m: \u001b[39m\u001b[34m1\u001b[39m',
            '\u001b[90m]\u001b[39m'
        ]);
    });


    section.test('Object & Array', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([{first: 'first element', second: 'second element', third: [123445]}], [
            '\u001b[90m[Object] (3): {\u001b[39m',
            '    \u001b[2m\u001b[37mfirst\u001b[39m\u001b[22m \u001b[90m(13)\u001b[39m\u001b[90m: \u001b[39m\u001b[32mfirst element\u001b[39m',
            '    \u001b[2m\u001b[37msecond\u001b[39m\u001b[22m \u001b[90m(14)\u001b[39m\u001b[90m: \u001b[39m\u001b[32msecond element\u001b[39m',
            '    \u001b[2m\u001b[37mthird\u001b[39m\u001b[22m \u001b[90m[Array] (1): [\u001b[39m',
            '        \u001b[90m0\u001b[39m\u001b[90m: \u001b[39m\u001b[34m123445\u001b[39m',
            '    \u001b[90m]\u001b[39m',
            '\u001b[90m}\u001b[39m',
        ]);
    });





    section.test('Object in Object', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        const a = {a:{b:1}};

        await validator.validate([a], [
            '\u001b[90m[Object] (1): {\u001b[39m',
            '    \u001b[2m\u001b[37ma\u001b[39m\u001b[22m \u001b[90m[Object] (1): {\u001b[39m',
            '        \u001b[2m\u001b[37mb\u001b[39m\u001b[22m\u001b[90m: \u001b[39m\u001b[34m1\u001b[39m',
            '    \u001b[90m}\u001b[39m',
            '\u001b[90m}\u001b[39m',
        ]);
    });




    section.test('Recursion', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        const a = {b: 1};
        const b = {a: a};
        a.c = b;

        await validator.validate([a], [
            '\u001b[90m[Object] (2): {\u001b[39m',
            '    \u001b[2m\u001b[37mb\u001b[39m\u001b[22m\u001b[90m: \u001b[39m\u001b[34m1\u001b[39m',
            '    \u001b[2m\u001b[37mc\u001b[39m\u001b[22m \u001b[90m[Object] (1): {\u001b[39m',
            '        \u001b[2m\u001b[37ma\u001b[39m\u001b[22m\u001b[90m: \u001b[39m\u001b[90m<circular value object>\u001b[39m',
            '    \u001b[90m}\u001b[39m',
            '\u001b[90m}\u001b[39m',
        ]);
    });




    section.test('Object & some Types', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([{
            string: 'hello',
            number: 11,
            date: new Date(0),
            regExp: /matching stuff/gim,
            symbol: Symbol(234),
            undefined: undefined,
            null: null,
        }], [
            '\u001b[90m[Object] (7): {\u001b[39m',
            '    \u001b[2m\u001b[37mstring\u001b[39m\u001b[22m \u001b[90m(5)\u001b[39m\u001b[90m: \u001b[39m\u001b[32mhello\u001b[39m',
            '    \u001b[2m\u001b[37mnumber\u001b[39m\u001b[22m\u001b[90m: \u001b[39m\u001b[34m11\u001b[39m',
            '    \u001b[2m\u001b[37mdate\u001b[39m\u001b[22m\u001b[90m: \u001b[39m\u001b[36m1970-01-01T00:00:00.000Z\u001b[39m',
            '    \u001b[2m\u001b[37mregExp\u001b[39m\u001b[22m \u001b[90m[RegExp]\u001b[39m\u001b[90m: \u001b[39m\u001b[35m/matching stuff/gim\u001b[39m',
            '    \u001b[2m\u001b[37msymbol\u001b[39m\u001b[22m \u001b[90m[Symbol]\u001b[39m\u001b[90m: \u001b[39m\u001b[35mSymbol(234)\u001b[39m',
            '    \u001b[2m\u001b[37mundefined\u001b[39m\u001b[22m\u001b[90m: \u001b[39m\u001b[35m<undefined>\u001b[39m',
            '    \u001b[2m\u001b[37mnull\u001b[39m\u001b[22m\u001b[90m: \u001b[39m\u001b[35m<null>\u001b[39m',
            '\u001b[90m}\u001b[39m',
        ]);
    });


    section.test('Array & some Types', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate([[
            'hello',
            11,
            new Date(0),
            /matching stuff/gim,
            Symbol(234),
            undefined,
            null,
        ]], [
            '\u001b[90m[Array] (7): [\u001b[39m',
            '    \u001b[90m0 (5)\u001b[39m\u001b[90m: \u001b[39m\u001b[32mhello\u001b[39m',
            '    \u001b[90m1\u001b[39m\u001b[90m: \u001b[39m\u001b[34m11\u001b[39m',
            '    \u001b[90m2\u001b[39m\u001b[90m: \u001b[39m\u001b[36m1970-01-01T00:00:00.000Z\u001b[39m',
            '    \u001b[90m3 [RegExp]\u001b[39m\u001b[90m: \u001b[39m\u001b[35m/matching stuff/gim\u001b[39m',
            '    \u001b[90m4 [Symbol]\u001b[39m\u001b[90m: \u001b[39m\u001b[35mSymbol(234)\u001b[39m',
            '    \u001b[90m5\u001b[39m\u001b[90m: \u001b[39m\u001b[35m<undefined>\u001b[39m',
            '    \u001b[90m6\u001b[39m\u001b[90m: \u001b[39m\u001b[35m<null>\u001b[39m',
            '\u001b[90m]\u001b[39m',
        ]);
    });



    section.test('Custom Class Types', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        const X = class {
            get [Symbol.toStringTag]() {
                return 'AQL query';;
            }
        };

        await validator.validate([new X()], [
            '\u001b[90m[Object] (0): {\u001b[39m\u001b[90m}\u001b[39m',
        ]);
    });
});