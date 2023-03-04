'use strict';

const Renderer = require('./Renderer');






module.exports = class WeakMapRenderer extends Renderer {

    getName() {
        return 'weakMap';
    }


    

    render({
        context,
        value,
        label,
        decoration,
    }) {
        context.renderDecoration({label, decoration: (decoration ? decoration+' ' : '')+'[WeakMap]', close: true});
        context.print(this.decorate(context, '<non-iterable>', 'text'));
    }
}