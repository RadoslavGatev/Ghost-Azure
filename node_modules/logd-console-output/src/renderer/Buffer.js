'use strict';

const Renderer = require('./Renderer');






module.exports = class BufferRenderer extends Renderer {

    getName() {
        return 'buffer';
    }


    

    render({
        context,
        value,
        label,
        decoration,
        color,
    }) {
        context.renderDecoration({label, decoration: (decoration ? decoration+' ' : '')+`[Buffer] (${value.length} bytes)`, close: true});
        context.print(this.decorate(context, this.truncate('0x'+value.slice(0, 80).toString('HEX'), 80), 'text', color));
    }
}