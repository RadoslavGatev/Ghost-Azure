'use strict';

const Renderer = require('./Renderer');






module.exports = class WeakSetRenderer extends Renderer {

    getName() {
        return 'weakSet';
    }


    

    render({
        context,
        value,
        label,
        decoration,
    }) {
        context.renderDecoration({label, decoration: (decoration ? decoration+' ' : '')+'[WeakSet]', close: true});
        context.print(this.decorate(context, '<non-iterable>', 'text'));
    }
}