'use strict';


const section = require('section-tests');
const assert = require('assert');
const OutputValidator = require('./lib/OutputValidator');
const chalk = require('chalk');




section('Extended Functions', (section) => {

    section.test('Custom Colors', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        await validator.validate(['a red string'], [
            '\u001b[90m(12)\u001b[39m\u001b[90m: \u001b[39m\u001b[31ma red string\u001b[39m',
        ], {color: 'red'});
    });



    section.test('Callsite (long)', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        const callsite = {
            lineNumber: 3425,
            fileName: __filename.replace('.js', '/')+'a/pretty/long/path/to/be/Truncated.js',
            type: 'Object',
            function: 'section.test',
            method: 'cb',
            date: new Date(0),
        };

        await validator.validate([1], [
            `${chalk.grey('01  01:00:00.000 > ')}${chalk.dim(chalk.white('…y/long/path/to/be/Truncated.js'))}${chalk.grey(':3425  ')}${chalk.dim(chalk.white('…t.section.test (as cb): '))}${chalk.blue(1)}`,
        ], {callsite});
    });



    section.test('Callsite (short)', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        const callsite = {
            lineNumber: 3425,
            fileName: __filename.replace('000.300-extdended-functio', ''),
            type: 'o',
            function: 's',
            method: '',
            date: new Date(0),
        };

        await validator.validate([1], [
            `${chalk.grey('01  01:00:00.000 > ')}${chalk.dim(chalk.white('                     test/ns.js'))}${chalk.grey(':3425  ')}${chalk.dim(chalk.white('                    o.s: '))}${chalk.blue(1)}`,
        ], {callsite});
    });



    section.test('Callsite (missing values)', async () => {
        const Console = require('../');
        const log = new Console();
        const validator = new OutputValidator(log);

        const callsite = {
            lineNumber: 3425,
            fileName: __filename.replace('000.300-extdended-functio', ''),
            type: 'o',
            date: new Date(0),
        };

        await validator.validate([1], [
            `${chalk.grey('01  01:00:00.000 > ')}${chalk.dim(chalk.white('                     test/ns.js'))}${chalk.grey(':3425  ')}${chalk.dim(chalk.white('                      o: '))}${chalk.blue(1)}`,
        ], {callsite});
    });
});