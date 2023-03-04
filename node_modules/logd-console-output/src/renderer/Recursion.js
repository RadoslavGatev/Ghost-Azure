'use strict';

const Renderer = require('./Renderer');






module.exports = class RecursionRenderer extends Renderer {

    getName() {
        return 'recursion';
    }


    

    render({
        context,
        value,
        label,
        decoration,
    }) {
        context.renderDecoration({label, decoration, close: true});
        context.print(this.decorate(context, value, 'text'));
    }
}