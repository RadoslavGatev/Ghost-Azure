'use strict';

const Renderer = require('./Renderer');






module.exports = class RegExpRenderer extends Renderer {

    getName() {
        return 'regexp';
    }


    

    render({
        context,
        value,
        label,
        decoration,
        color,
    }) {
        context.renderDecoration({label, decoration: (decoration ? decoration+' ' : '')+'[RegExp]', close: true});
        context.print(this.decorate(context, value, 'text', color));
    }
}