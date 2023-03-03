'use strict';

const Renderer = require('./Renderer');



module.exports = class ModuleNameRenderer extends Renderer {

    getName() {
        return 'moduleName';
    }


    

    render({
        context,
        value,
    }) {
        context.print(this.decorate(context, `[${value}] `, 'text'));
    }
}
