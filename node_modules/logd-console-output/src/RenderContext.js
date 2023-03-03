'use strict';


const type = require('ee-types');



module.exports = class RenderContext {

    constructor({
        indentation,
        renderers,
        printer = console.log,
        theme,
    }) {
        if (theme.indentation) this.indentation = theme.indentation;
        if (indentation) this.indentation = indentation;
        this.renderers = renderers;
        this.printer = printer;
        this.theme = theme;

        // how many indentation levels are we in?
        this.level = 0;

        // buffer everything until a linebreak is reached
        this.lineBuffer = '';

        // don't print anything twice, store refernces to all objects
        // so that this can be prevents
        this.processedObjects = new WeakSet();
    }






    /**
    * set options for rendering
    */
    setOptions({
        maxArrayLength,
        maxStringLength,
        indentation,
    } = {}) {
        if (maxArrayLength) this.maxArrayLength = maxArrayLength;
        if (maxStringLength) this.maxStringLength = maxStringLength;
        if (indentation) this.indentation = indentation;
    }





    /**
    * render a lable fo a value
    */
    renderDecoration(value) {
        this.renderers.get('decoration').render({
            context: this,
            value: value,
        });
    }





    /**
    * return a theme config for a given element
    */
    getThemeFor(element, decorator) {
        if (!this.theme) throw new Error(`No theme set on the reenderContext!`);
        if (!this.theme.renderers) throw new Error(`No renderers configurations present fr the theme '${theme.name}'!`);
        if (!this.theme.renderers[element]) throw new Error(`The '${this.theme.name}' theme doesn't contain a definition for the element '${element}'!`);
        if (!this.theme.renderers[element][decorator]) throw new Error(`The '${this.theme.name}' theme doesn't contain a definition for the decorator '${decorator}' of the element '${element}'!`);
        return this.theme.renderers[element][decorator];
    }





    /**
    * render multiple values
    */
    render({
        values,
        callsite,
        color,
        decoration,
        label,
        options,
        moduleName,
    }) {
        if (callsite) {
            this.renderers.get('callsite').render({
                context: this, 
                value: callsite,
            });
        }


        if (moduleName) {
            this.renderers.get('moduleName').render({
                context: this,
                value: moduleName,
            });
        }


        values.forEach((value) => {
            this.renderValue({
                value,
                decoration,
                label,
                color,
                options,
            });

            this.newLine();
        });
    }









    /**
    * renders a single value
    */
    renderValue({
        value,
        color,
        decoration,
        label,
        options = {},
    }) {
        // make sure no objects is rendered twice
        if (typeof value === 'object' && value !== null) {
            if (this.processedObjects.has(value)) {
                this.renderers.get('recursion').render({
                    context: this,
                    decoration,
                    label,
                    value: `<circular value ${type(value)}>`,
                });
                return;
            } else this.processedObjects.add(value);
        }


        let valueType;


        // allow custom renderer assignments
        if (type.object(value) && value.__logd_custom_renderer) {
            valueType = value.__logd_custom_renderer;
        } else {
            valueType = type(value);
        }


        if (this.renderers.has(valueType)) {
            const renderer = this.renderers.get(valueType);

            renderer.render({
                context: this,
                value,
                decoration,
                label,
                color,
                options,
            });
        } else {
console.log(155555555555, typeof value, Object.prototype.toString.call(value));
            // just render an error
            this.renderers.get('error').render({
                context: this, 
                decoration,
                label,
                value: new Error(`logd console renderer: no render for the type '${valueType}' found! Please file an issue on github https://github.com/distributed-systems/logd-console-output`)
            });
        }
    }






    /**
    * set a custom printer function
    */
    setPrinter(printer = console.log) {
        this.printer = printer;
        return this;
    }  






    /**
    * print to console
    */
    print(string) {
        this.lineBuffer += string;
    }   



    /**
    * print everything and start a new line
    */
    newLine() {
        this.printer(this.lineBuffer);
        this.lineBuffer = this.getSpacing();
    }



    /**
    * increases the level
    */
    in() {
        this.level++;
    }



    /**
    * decreses the level
    */
    out() {
        this.level--;
    }



    /**
    * returns the wihitespace that needs to be in front of items
    */
    getSpacing() {
        return ' '.repeat(this.indentation*this.level);
    }
}