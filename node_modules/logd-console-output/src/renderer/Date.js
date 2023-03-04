'use strict';

const Renderer = require('./Renderer');






module.exports = class DateRenderer extends Renderer {

    getName() {
        return 'date';
    }


    

    render({
        context,
        value,
        label,
        decoration,
        color,
    }) {
        context.renderDecoration({label, decoration, close: true});
        context.print(this.decorate(context, value.toISOString(), 'text', color));
    }
}