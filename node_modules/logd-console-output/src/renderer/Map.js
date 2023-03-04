'use strict';

const Renderer = require('./Renderer');






module.exports = class MapRenderer extends Renderer {

    getName() {
        return 'map';
    }


    

    render({
        context,
        value,
        theme,
        label,
        decoration,
        options,
    }) {
        context.renderDecoration({label, decoration: `${decoration ? decoration+' ' : ''}[Map] (${value.size}): {`});

        if (value.size) {
            context.in();
            for (const [key, item] of value.entries()) {
                context.newLine();
                context.renderValue({
                    value: item,
                    label: key,
                    options,
                });
            }
            context.out();
            context.newLine();
        }

        context.renderDecoration({decoration: `}`});
    }
}