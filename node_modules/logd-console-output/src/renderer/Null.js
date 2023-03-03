'use strict';

const Renderer = require('./Renderer');






module.exports = class NullRenderer extends Renderer {

    getName() {
        return 'null';
    }


    

    render({
        context,
        value,
        label,
        decoration,
        color,
    }) {
        context.renderDecoration({label, decoration, close: true});
        context.print(this.decorate(context, '<null>', 'text', color));
    }
}