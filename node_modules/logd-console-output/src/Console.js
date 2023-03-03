'use strict';


const chalk = require('chalk');
const {promisify} = require('util');
const glob = promisify(require('glob'));
const path = require('path');
const RenderContext = require('./RenderContext');




module.exports = class Console {



    constructor(config) {
        this.renderers = new Map();
        this.loadRenderers();

        // use the default theme for black consoles
        const blackDefaultTheme = require('./themes/default.dark');
        this.setTheme(blackDefaultTheme);
    }





    /**
    * load all available renderers from the filesystem
    */
    loadRenderers() {
        const files = glob.sync(path.join(__dirname, './renderer/*.js'));

        files.forEach((file) => {
            const Constructor = require(file);
            const renderer = new Constructor();
            this.renderers.set(renderer.getName(), renderer);
        });
    }





    /**
    * let the user set color themes
    */
    setTheme(theme) {
        this.theme = theme;
    }





    /**
    * creates a new render context which is
    * used to render a set of values
    */
    createContext() {
        const context = new RenderContext({
            renderers: this.renderers,
            theme: this.theme,
        });

        return context;
    }





    /**
    * print any type of input to the console
    */
    log({
        values,
        context = this.createContext(),
        options,
        callsite,
        color,
        moduleName,
    }) {
        if (options) context.setOptions(options);
        
        // render all values
        context.render({
            values,
            callsite,
            color,
            options,
            moduleName,
        });
        
        // return the context to the user
        return context;
    }




    /**
    * object renderer
    */
    object(...objects) {

    }



    /**
    * render simple text messages
    */
    message(color, ...messages) {

    }




    /**
    * render an error message
    */
    trace(...errors) {

    }
}