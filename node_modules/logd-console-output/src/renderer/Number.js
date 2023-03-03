'use strict';

const Renderer = require('./Renderer');






module.exports = class NumberRenderer extends Renderer {

    getName() {
        return 'number';
    }


    

    render({
        context,
        value,
        label,
        decoration,
        color,
    }) {
        context.renderDecoration({label, decoration, close: true});
        context.print(this.decorate(context, value, 'text', color));
    }
}