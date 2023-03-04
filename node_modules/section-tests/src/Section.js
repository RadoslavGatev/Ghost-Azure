{
    'use strict';


    const type = require('ee-types');
    const log = require('ee-log');
    const assert = require('assert');
    const SectionExecutor = require('./SectionExecutor');




    class Section {
        


        constructor({parent, name = 'root', options = {}} = {}) {
            if (parent) this.parent = parent;
            this.name = name;
            this.options = options;


            // the global timeout time
            if (this.isRootSection()) this.timeoutTime = 2000;


            // store 
            this.childSections = new Map();
            this.tests = new Set();
            this.setups = new Set();
            this.destroyers = new Set();
            this.transports = new Set();
        }






        /**
        * the user may set a custom timeout time
        */
        setTimeout(msec) {
            assert(type.number(msec), `The timeout time must be an number!`);
            this.timeoutTime = msec;
        }



        /**
        * returns the current timeout time
        */
        getTimeoutTime() {
            return this.timeoutTime || !this.isRootSection() && this.parent.getTimeoutTime();
        }



        /**
        * remove the custom timeout time
        */
        resetTimeoutTime() {
            this.timeoutTime = null;
        }






        getDepth(depth = 0) {
            if (this.isRootSection()) return depth;
            else return this.parent.getDepth(depth+1);
        }



        getTransports() {
            return this.collectTransports();
        }





        warn(message) {
            this.log(message, 'warn');
        }

        error(message) {
            this.log(message, 'error');
        }

        success(message) {
            this.log(message, 'success');
        }

        info(message) {
            this.log(message, 'info');
        }

        notice(message) {
            this.log(message, 'notice');
        }

        log(message, level = 'info') {
            if (this.sendLog) this.sendLog(message, level);
            else throw new Error('Cannot log message outside of a test, setup or destroyer routine!');
        }






        collectTransports(transports = []) {
            transports.push(...this.transports.values());

            if (this.isRootSection()) return transports;
            else return this.getRoot().collectTransports(transports);
        }




        getInterface() {

            // return a function that can be invoked by the user
            const iface = this.createSection.bind(this);


            // expose some methods
            iface.test = this.test.bind(this);
            iface.setup = this.setup.bind(this);
            iface.destroy = this.destroy.bind(this);
            iface.execute = this.execute.bind(this);
            iface.use = this.use.bind(this);


            iface.warn = this.warn.bind(this);
            iface.error = this.error.bind(this);
            iface.success = this.success.bind(this);
            iface.info = this.info.bind(this);
            iface.notice = this.notice.bind(this);

            // let the user define timeouts
            iface.setTimeout = this.setTimeout.bind(this);

            return iface;
        }






        async execute() {
            const section = this;
            const executor = new SectionExecutor({section});
            await executor.execute();
        }







        use(transport) {
            this.transports.add(transport);
        }






        test(...params) {
            let options = {};
            let executeTest;
            let name = 'anonymous';


            params.forEach((param, index) => {
                if (type.object(param)) options = param;
                else if (type.function(param)) executeTest = param;
                else if (type.string(param)) name = param;
                else throw new Error(`Ìnvalid option at position ${index}!`);
            });


            this.tests.add({name, executeTest, options});
        }








        setup(...params) {
            let executeSetup;
            let name = 'Setting Up';

            params.forEach((param, index) => {
                if (type.function(param)) executeSetup = param;
                else if (type.string(param)) name = param;
                else throw new Error(`Ìnvalid option at position ${index}!`);
            });


            this.setups.add({name, executeSetup});
        }








        destroy(...params) {
            let executeDestroy;
            let name = 'Destroying';

            params.forEach((param, index) => {
                if (type.function(param)) executeDestroy = param;
                else if (type.string(param)) name = param;
                else throw new Error(`Ìnvalid option at position ${index}!`);
            });


            this.destroyers.add({name, executeDestroy});
        }








        getRoot() {
            return this.isRootSection() ? this : this.parent.getRoot();
        }




        isRootSection() {
            return !this.parent;
        }




        createSection(...params) {
            let options = {};
            let executeSection;
            let name = 'anonymous';

            params.forEach((param, index) => {
                if (type.object(param)) options = param;
                else if (type.function(param)) executeSection = param;
                else if (type.string(param)) name = param;
                else throw new Error(`Ìnvalid option at position ${index}!`);
            });



            if (!this.childSections.has(name)) {
                const parent = this;
                const instance = new Section({name, parent, options});

                this.childSections.set(name, instance);
            }

            executeSection(this.childSections.get(name).getInterface());
        }
    }






    module.exports = Section;
}