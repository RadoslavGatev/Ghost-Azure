{
    'use strict';


    const log = require('ee-log');
    const chalk = require('chalk');




    const colorMap = new Map();

    colorMap.set('error', 'red'); 
    colorMap.set('warn', 'yellow'); 
    colorMap.set('success', 'green'); 
    colorMap.set('info', 'white'); 
    colorMap.set('notice', 'dim'); 





    module.exports = class SpecReporter {




        constructor() {
            this.setupStarted = false;
            this.destroyingStarted = false;
        }





        send(message) {
            //log(message, '✔'.green);
            this.padAmount = 4 * message.depth - 2;
            this.displayMessage(message);

            this.lastType = message.type;
        }






        displayMessage(message) {//log(message);
            switch (message.type) {
                case 'sectionMessage': return this.displaySectionMessage(message);

                case 'testErrorMessage': return this.displayTestErrorMessage(message);
                case 'testSuccessMessage': return this.displayTestSuccessMessage(message);

                case 'setupErrorMessage': return this.displaySetupErrorMessage(message);
                case 'setupSuccessMessage': return this.displaySetupSuccessMessage(message);

                case 'destroyerErrorMessage': return this.displayDestroyerErrorMessage(message);
                case 'destroyerSuccessMessage': return this.displayDestroyerSuccessMessage(message);

                case 'logMessage': return this.displayLogMessage(message);

                case 'destroyerStartMessage':
                case 'setupStartMessage':
                case 'testStartMessage':
                    this.lastStartMessage = message;
                    return;
            }
        }






        displayLogMessage(message) {

            // do we need to display the startemssage
            if (this.lastStartMessage) {
                switch (this.lastStartMessage.type) {
                    case 'setupStartMessage': 
                        this.displaySetupStartMessage(this.lastStartMessage);
                        break;
                    case 'testStartMessage': 
                        this.displayTestStartMessage(this.lastStartMessage);
                        break;
                    case 'destroyerStartMessage': 
                        this.displayDestroyerStartMessage(this.lastStartMessage);
                        break;
                }

                this.lastStartMessage = null;
            }

            const prefix = chalk[colorMap.get(message.level)](`➟  ${message.level}:`);
            console.log(`${this.pad(8)}${prefix} ${chalk.white(message.message)}`);
        }











        displaySetupStartMessage(message) {
            //if (!this.setupStarted) console.log(''), this.setupStarted = true;
            console.log(`${this.pad(4)}${chalk.dim('⬇ ')}${chalk.grey(message.name)}`);
        }


        displaySetupErrorMessage(message) {
            //if (!this.setupStarted) console.log(''), this.setupStarted = true;
            console.log(`${this.pad(4)}${chalk.red('✖ ')}${chalk.yellow(`${message.name}:`)} ${chalk.white(message.err.message)}\n`);
            message.err.stack.forEach((frame) => {
                console.log(`${this.pad(8)}${chalk.dim(`at ${frame.functionName} (${frame.fileName}:${frame.lineNumber})`)}`);
            });
        }


        displaySetupSuccessMessage(message) {
            //if (!this.setupStarted) console.log(''), this.setupStarted = true;
            console.log(`${this.pad(4)}${chalk.dim.green('✔ ')}${chalk.grey(message.name)}${this.getDurationMark(message)}`);
        }













        displayTestStartMessage(message) {
            console.log(`${this.pad(4)}${chalk.dim('⬇ ')}${chalk.white(message.test.name)}`);
        }


        displayTestSuccessMessage(message) {
            console.log(`${this.pad(4)}${chalk.green('✔ ')}${chalk.white(message.test.name)}${this.getDurationMark(message)}`);
        }


        displayTestErrorMessage(message) {
            console.log(`${this.pad(4)}${chalk.red('✖ ')}${chalk.yellow(message.test.name+':')} ${chalk.white(message.err.message)}\n`);
            console.log(`${this.pad(8)}${chalk.dim(`at ${message.err.stack[0].functionName} (${message.err.stack[0].fileName}:${message.err.stack[0].lineNumber})`)}`);

            if (message.err.type === 'AssertionError' && message.err.actual !== undefined && message.err.expected !== undefined) {
                console.log(`\n${this.pad(8)}${chalk.red('actual: ')}    ${chalk.white(message.err.actual)}`);
                console.log(`${this.pad(8)}${chalk.dim('operator: ')}  ${chalk.dim(message.err.operator)}`);
                console.log(`${this.pad(8)}${chalk.green('expected: ')}  ${chalk.white(message.err.expected)}\n`);
            } else {

                
                // display the friggin stack
                if (typeof message.err.stack === 'string') log(message.err.stack);
                else {
                    message.err.stack.slice(1).forEach((frame) => {
                        console.log(`${this.pad(8)}${chalk.dim(`at ${frame.functionName} (${frame.fileName}:${frame.lineNumber})`)}`);
                    });
                }
            }
        }







        getDurationMark(message) {
            if (message.duration && Number.isInteger(message.duration)) {
                if (message.duration > 500) return chalk.dim(` (${chalk.yellow.bold(message.duration)} msec)`);
            }

            return '';
        }













        displayDestroyerStartMessage(message) {
            //if (!this.destroyingStarted) console.log(''), this.destroyingStarted = true;
            console.log(`${this.pad(4)}${chalk.dim('⬇ ')}${chalk.grey(message.name)}`);
        }


        displayDestroyerErrorMessage(message) {
            //if (!this.destroyingStarted) console.log(''), this.destroyingStarted = true;
            console.log(`${this.pad(4)}${chalk.red('✖ ')}${chalk.yellow(`${message.name}:`)} ${chalk.white(message.err.message)}\n`);
            message.err.stack.forEach((frame) => {
                console.log(`${this.pad(8)}${chalk.dim(`at ${frame.functionName} (${frame.fileName}:${frame.lineNumber})`)}`);
            });
        }


        displayDestroyerSuccessMessage(message) {
            //if (!this.destroyingStarted) console.log(''), this.destroyingStarted = true;
            console.log(`${this.pad(4)}${chalk.dim.green('✔ ')}${chalk.grey(message.name)}${this.getDurationMark(message)}`);
        }











        displaySectionMessage(message) {
            if (message.sectionName !== 'root' || message.depth !== 0) {
                console.log(`${this.lastType === 'sectionMessage' ? '' : '\n'}${this.pad()}${chalk.blue.bold(message.sectionName)}`);
            } else {
                console.log(`  ${chalk.blue.bold('Executing Tests')}`);
            }
        }






        pad(add = 0) {
            return ' '.repeat(this.padAmount+add);
        }
    }
}