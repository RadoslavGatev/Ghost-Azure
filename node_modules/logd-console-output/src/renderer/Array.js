'use strict';

const Renderer = require('./Renderer');






module.exports = class ArrayRenderer extends Renderer {

    getName() {
        return 'array';
    }


    

    render({
        context,
        value,
        theme,
        label,
        options,
    }) {
        context.renderDecoration({label, decoration: `[Array] (${value.length}): [`});

        if (value.length) {
            context.in();
            value.forEach((value, index) => {
                context.newLine();
                context.renderValue({
                    value, decoration: `${index}`,
                    options,
                });
            });
            context.out();
            context.newLine();
        }
        
        context.renderDecoration({decoration: `]`});
    }
}