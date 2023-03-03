{
    'use strict';


    const log = require('ee-log');
    const glob = require('glob');
    const section = require('../');



    module.exports = class TestRunner {



        constructor({patterns}) {
            this.patterns = patterns;
        }




        async execute() {
            const files = await this.getFiles();
            await this.loadFiles(files);
            await section.execute();
        }





        async loadFiles(files) {
            for (const file of files) {
                try {
                    require(file);
                } catch (err) {
                    console.log(`Failed to load ${file}:`);
                    console.log(err.message);
                    err.stack.forEach(frame => console.log(frame.toString()));
                    process.exit(1);
                }                
            }
        }





        async getFiles() {
            return Promise.all(this.patterns.map((pattern) => {
                return new Promise((resolve, reject) => {
                    glob.glob(pattern, (err, files) => {
                        if (err) reject(err);
                        else resolve(files);
                    });
                });
            })).then((fileArrays) => {
                return Promise.resolve(fileArrays.reduce((p, c) => { return p.push(...c), p;}, []));
            });
        }
    }
}