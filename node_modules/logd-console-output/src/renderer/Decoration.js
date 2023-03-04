'use strict';

const Renderer = require('./Renderer');






module.exports = class LabelRenderer extends Renderer {

    getName() {
        return 'decoration';
    }


    

    render({
        context,
        value,
    }) {
        if (value.label) context.print(this.decorate(context, value.label, 'text'));
        if (value.label && value.decoration) context.print(' ');
        if (value.decoration) context.print(this.decorate(context, value.decoration, 'decorator'));
        if ((value.label || value.decoration) && value.close) context.print(this.decorate(context, ': ', 'decorator'));
    }
}