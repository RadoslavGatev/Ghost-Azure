'use strict';

const Renderer = require('./Renderer');






module.exports = class BooleanRenderer extends Renderer {

    getName() {
        return 'boolean';
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