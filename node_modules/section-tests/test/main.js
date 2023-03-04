{
    'use strict';

    const log = require('ee-log'); 
    const section = require('../');
    const SpecReporter = require('../src/SpecReporter'); 
    const assert = require('assert');


    section.setTimeout(1000);


    section.use(new SpecReporter());



    section('Libraries', {timeout: 6000}, (section) => {
        section('Venue', (section) => {
            section.test('findByZip', async () => {
                //log('testing');
                assert.equal('3', 2, 'not equal, dude!');
            });

            section.test('create', async () => {
                //log('testing');
                return new Promise((r) => {
                    setTimeout(r, 600);
                });
            });

            section.test('some method without a name', async () => {
                //log('testing');
            });
        })


        section.test('create things that are cute', async () => {
                //log('testing');
                
        });

        section.test('delete shitty stuff', async () => {
            //log('testing');
            
        });

        section.test('create another', async () => {
            //log('testing');
            
        });

        section.test('bulk create the good stuff', async () => {
            //log('testing');
        });



        section('Timeout', (section) => {
            section.test('should timeout', () => {
                section.setTimeout(300);
                return new Promise(() => {
                    setTimeout(() => {}, 3000);
                });
            });
        });


        section('Venue', (section) => {
            section.test('delete all', async () => {
                //log('testing');
                
            });

            section.test('delete one', async () => {
                //log('testing');
            });
        })




        section('Event', (section) => {
            section.test('create', async () => {
                //log('testing');
                
            });

            section.test('update', async () => {
                //log('testing');
            });

            section.test('read', async () => {
                //log('testing');
            });

            section.test('delete', async () => {
                //log('testing');
            });
        });
    });


    section('Integration', (section) => {
        section.test('create', async () => {
            //log('testing');
            
        });

        section.test('update', async () => {
            //log('testing');
        });

        section.test('read', async () => {
            //log('testing');
        });

        section.test('delete', async () => {
            //log('testing');
        });
    });




    section.setup('Setting things up', () => {
        section.warn('pay attention, there stuff happening ...');
        section.info('creating things ..');
        section.info('updating things ....');
    });


    section.destroy('Stopping services', () => {
        section.info('you should probably know :/');
        section.warn('think twice ...');
        section.error('uh, really? proably not good :)');
        section.success(`yep, that's nice!`);
    });

}