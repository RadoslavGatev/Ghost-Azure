!function() {
    'use strict';


    var   Class     = require('ee-class')
        , type      = require('ee-types')
        , fs        = require('fs')
        , util      = require('util');


    var stylize, project;




    // colorful strings
    stylize = function (str, style) {
        var styles = {
              'bold':       [1, 22]
            , 'italic':     [3, 23]
            , 'underline':  [4, 24]
            , 'inverse':    [7, 27]
            , 'white':      [37, 39]
            , 'grey':       [90, 39]
            , 'black':      [90, 39]
            , 'blue':       [34, 39]
            , 'cyan':       [36, 39]
            , 'green':      [32, 39]
            , 'magenta':    [35, 39]
            , 'red':        [31, 39]
            , 'yellow':     [33, 39]
        };
        return '\x1b[' + (styles[style][0]) + 'm' + str + '\x1b[' + (styles[style][1]) + 'm';
    };

    ['bold', 'underline', 'italic', 'inverse', 'grey', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta'].forEach(function(style) {
        try{
            Object.defineProperty(String.prototype, style, {
                get: function () {
                    return process.argv.includes('--no-colors') ? this : stylize(this, style);
                }
                , configurable: true
            });
        } catch(e) {}
    });




    // old dependency emulation
    project = new (new Class({
        init: function() {
            var   file = process.argv[1]
                , stats;

            if(file && file.indexOf('node_modules') >= 0) file = file.substr(0, file.indexOf('node_modules'));

            stats = fs.statSync(file);


            if(stats) {
                if (stats.isDirectory()) {
                    this.root = file+'/';
                }
                else {
                    this.root = file.substr(0, file.lastIndexOf('/')+1);
                }
            }
            else {
                console.warn('Failed to evaluate project root dir!');
            }
        }
    }))();





    module.exports = new Class({

        init: function() {
            this.blacklist = [];
        }


        , disable: function() {
            this.blacklist.push(this.getCallingPath(3));
        }

        , enable: function() {
            var index = this.blacklist.indexOf(this.getCallingPath(3));
            if (index >= 0) {
                this.blacklist.splice(index, 1);
            }
        }

        , getCallingPath: function(depth) {
            var pos = new RegExp(new Array(depth + 1).join('.*\\n') + '[^\\(]+\\(([^:]+)', 'i').exec((new Error()).stack);
            return pos[1].replace(project.root, '');
        }


        // debug
        , debug: function debug() {
            this.log(arguments, 'grey');
        }

        // info
        , info: function info() {
            this.log(arguments, 'white');
        }

        // warn
        , warn: function warn() {
            this.log(arguments, 'yellow', true);
        }

        // error (uncatchable)
        , error: function error() {
            this.log(arguments, 'red', true);
        }

        // wtf
        , wtf: function wtf() {
            Array.prototype.unshift.call(arguments, 'WTF?');
            this.log(arguments, 'magenta', true);
        }

        // success, the green stuff
        , success: function success() {
            this.log(arguments, 'green', true);
        }



        // highlight a message
        , highlight: function highlight() {
            this.log(arguments, 'cyan', true);
        }


        , log: function(args, color, bold) {
            if (this.blacklist.length === 0 || this.blacklist.indexOf(this.getCallingPath(4)) === -1) {
                var logs = this.buildMessage(Array.prototype.slice.call(args));
                console.log(this.createSignature(color, bold) + (bold ? logs.text[color].bold : logs.text[color]));

                this.printDir(logs.dir);
                logs.errors.forEach(function(e) { this.trace(e, true); }.bind(this));
            }
        }



        , buildMessage: function(items) {
            if (items.length > 0) {
                if (type.string(items[0])) {
                    var reg = /\%s/gi, i = 0;
                    while(reg.exec(items[0])) {
                        i++;
                        if (items.length > i) {
                            var formatted = this.formatItem(items[i]);
                            items[0] = items[0].replace(/\%s/i, formatted);
                            reg.lastIndex += formatted.length - 1;
                        }
                        else return this.processItems('', items);
                    }

                    return this.processItems(items[0], items.slice(i + 1));
                }
                else return this.processItems('', items);
            }
            return this.processItems('', []);
        }


        , processItems: function(text, items) {
            var logs = { text: [], dir: [], errors: [] }, currentItem;

            if (text) logs.text.push(text);

            for (var i = 0, l = items.length; i < l; i++) {
                currentItem = this.formatItem(items[i]);
                if (type.error(currentItem)) logs.errors.push(currentItem);
                else if (typeof currentItem === 'object') logs.dir.push(items[i]);
                else logs.text.push(currentItem);
            }

            logs.text = logs.text.join(', ');

            return logs;
        }


        , formatItem: function(input) {
            switch (type(input)) {
                case 'string':
                    return input.length > 1000 ? input.substr(0, 1000) + ' [...]' : input;
                case 'null':
                    return 'null';
                case 'undefined':
                    return 'undefined';
                case 'buffer':
                    var str = '';
                    for (var k = 0, m = input.length; k < m; k++) {
                        str += (input[k].toString(16).length === 1 ? '0' : '') + input[k].toString(16) + ' ';
                        if (k > 400) {
                            str += '[...]'
                            break;
                        }
                    }
                    return str;
                case 'error':
                    return input.name + ': ' + input.message;
                case 'array':
                case 'object':
                case 'set':
                case 'map':
                case 'weakSet':
                case 'weakMap':
                    return input;
                case 'symbol':
                    return input.toString();
                default:
                    return input + '';
            }
        }


        // dir an object displaying an optional message
        , dir: function() {
            // required for creating the correct signature (nede to add a line to the stack);

            this.printDir(Array.prototype.slice.call(arguments));
        }


        , printDir: function(items) {
            for (var i = 0, l = items.length; i < l; i++) {
                //console.log(this.createSignature('white') + '[Dir]'.white);
                this._dir(items[i], 0, null, true, []);
            }
        }


        // private dir
        , _dir: function(data, margin, name, first, knownObjects, spacing) {
            spacing = spacing || '';

            var fnname = name;
            name = (typeof name === 'string' ? name + ': ' : '').white;

            switch (typeof data) {
                case 'object':
                    // null
                    if (data === null) {
                        console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + 'null'.white);
                    }

                    // error
                    else if (type.error(data)) {
                        console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + '[Error]'.white);
                        this.trace(data, true, (margin+1) * 4, true);
                    }

                    // regexp
                    else if (type.regexp(data)) {
                        console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + '[RegExp] '.white + (data + '').blue.bold);
                    }

                    // ee-orm object
                    else if (typeof data.isModel === 'function' && data.isModel()) {
                        this._dir(data.toJSON(), margin, fnname, first, knownObjects);
                    }

                    // ee loggable object
                    else if (data._ee_serializable) {
                        this._dir(data.toJSON(), margin, fnname, first, knownObjects);
                    }

                    // date
                    else if (data instanceof Date) {
                        console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + data.toISOString().white);
                    }


                    // set
                    else if (type.set(data)) {
                        // convert to array
                        this._dir(Array.from(data), margin, (fnname ? (fnname+' [Set]') : '[Set]'), first, knownObjects);
                    }

                    // weak set
                    else if (type.weakSet(data)) {
                        console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + ('Weak Set').grey);
                    }

                    // map
                    else if (type.map(data)) {
                        // get an object
                        var currObj = {};
                        var pair;
                        var idx;

                        for (pair of data) {
                            if (idx++ > 101) break;
                            currObj[pair[0]] = pair[1];
                        }
                        this._dir(currObj, margin, (fnname ? (fnname+' [Map]') : '[Map]'), first, knownObjects);
                    }


                    // weak map
                    else if (type.weakMap(data)) {
                        console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + ('Weak Map').grey);
                    }


                    // buffer
                    else if (Buffer.isBuffer(data)) {
                        var result =  this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name;

                        for (var i = 0, l = data.length; i < l; i++) {
                            if (i > 66) {
                                result += '... (omitted '.grey + ((data.length - 66) + '').grey + ')'.grey
                                break;
                            }
                            else {
                                result += (data[i].toString(16) + ' ').white;
                            }
                        }
                        console.log(result);
                    }
                    else {
                        // dont do circular things
                        if (knownObjects.indexOf(data) >= 0) {
                            return console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + '[circular]'.grey);
                        }
                        else {
                            knownObjects.push(data);
                        }
                        var keys = Object.keys(data), i = keys.length, l = i, k = 0
                            , isArray = data instanceof Array;

                        if (margin > 20) return console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + ': '.grey + (isArray ?  '(' + data.length + '):[...]' : '{ ... }').grey + ' // max inspection depth reached'.grey);

                        if (i === 0) {
                            return console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + (isArray ? '(' + data.length + '):[]' : '{}').grey);
                        }

                        console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + (isArray ? '(' + data.length + '):[' : '{').grey);
                        first = true;
                        while(i--) {
                            if (k > 400) {
                                console.log(this._pad('', (margin + 1) * 4, ' ') + ', '.grey + (isArray ? '' + name : name) + '... (omitted '.grey + (i + 1 + '').grey + ') // max items per object reached'.grey);
                                console.log(this._pad('', margin * 4, ' ') + (isArray ? ']' : '}').grey);
                                return;
                            }
                            //console.log(keys[l - i - 1 ]);
                            if (Object.prototype.hasOwnProperty.call(data, keys[l - i - 1 ])) this._dir(data[keys[l - i - 1 ]], margin + 1, (isArray ? '' +  keys[l - i - 1 ]  : keys[l - i - 1 ]), first, knownObjects, (l === 1 ? '' : '  '));
                            if (first) first = false;
                            k++
                        }
                        console.log(this._pad('', margin * 4, ' ') + (isArray ? ']' : '}').grey);
                    }
                    break;

                case 'string':
                    if (data.length > 400) {
                        console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + '"'.white + data.substr(0, 400).green + '..."'.white + ' (omitted '.grey + (data.length - 400 + '').grey + ')'.grey);
                    }
                    else {
                        console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + '"'.white + data.green + '"'.white);
                    }
                    break;

                case 'number':
                    console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + (data + '').blue.bold);
                    break;

                case 'boolean':
                    console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + data.toString().yellow);
                    break;

                case 'function':
                    console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + ('function ' + (fnname || '')).grey);
                    break;

                case 'symbol':
                    console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + data.toString().green);
                    break;

                default:
                    console.log(this._pad('', margin * 4, ' ') + (! first ? ', ' : spacing).grey + name + data);
                    break;

            }
        }



        // trace an error displaying an optional message
        , trace: function trace(err, skip, padding, compact) {
            var lines, current, i, l;

            padding = padding || 0;

            if (err && err.stack) {

                if (!skip)(function() { console.log(this.createSignature('red', true) + '[Trace]'.red.bold); }.bind(this))();
                else if (!compact) console.log(this.createSignature('red', true) + '[Trace]'.red.bold);

                if (!compact) console.log(this._pad('', 80, '-').grey);
                console.log(this._pad('', padding, ' ')+(err.name + ': ').red.bold + (err.message ? err.message : '-').white.bold );
                if (!compact) console.log(this._pad('', 80, '-').grey);

                lines = err.stack.split('\n');
                i = lines.length, l = i;

                while(i--) {
                    current = /at (.*) \((.*)\:([0-9]+)\:([0-9]+)\)$/.exec(lines[l - i]);

                    if (!current) {
                        current = /at ()(.*)\:([0-9]+)\:([0-9]+)$/.exec(lines[l - i]);
                    }
                    if (current) {
                        console.log(this._pad('', padding, ' ')+this._pad(current[2].replace(project.root, '/'), 30, ' ').yellow + this._pad(current[3], 5, ' ').white + ':'.grey + this._pad(current[4], 4, ' ', true).grey + current[1].white );
                    }
                }

                if (!compact) console.log(this._pad('', 80, '-').grey);
            }
            else if (err) {
                if (!skip)(function() { console.log(this.createSignature('red', true) + (err.name + ': ').red.bold + (err.message ? err.message : '-').white.bold+(' (no stack provided)'.grey)); }.bind(this))();
                else console.log(this.createSignature('red', true) + (err.name + ': ').red.bold + (err.message ? err.message : '-').white.bold+(' (no stack provided)'.grey));
            }
        }



        // create logsignature
        , createSignature: function(color, bold) {
            var   date = new Date()
                , result
                , line = /\n.*\n.*\n.*\n\s*at\s([^\n]+)/i.exec((new Error()).stack)
                , pos = /([^\)]+)\s*\(([^:]+)\:([0-9]+)\:([0-9]+)|([^\:]+)\:([0-9]+)\:([0-9]+)/i.exec(line ? line[1] : '');

            if (pos) {
                var loc = {
                      file: (pos[2] || pos[5] || '').replace(project.root, '/')
                    , line: (pos[3] || pos[6] || '')
                    , char: (pos[4] || pos[7] || '')
                    , fn:   (pos[1] || '')
                };
            }


            result  = this._pad(date.getDate(), 2) + ' ';
            result += this._pad(date.getHours(), 2) + ':';
            result += this._pad(date.getMinutes(), 2) + ':';
            result += this._pad(date.getSeconds(), 2) + '.';
            result += this._pad(date.getMilliseconds(), 3);

            result += ' > ';
            if (pos) {
                var mpath = loc.file;
                if (mpath.lastIndexOf('node_modules') >= 0) {
                    mpath = 'nm:' + mpath.substr(mpath.lastIndexOf('node_modules') + 12);
                }
                var tlen = 65 - (loc.fn.length + mpath.length + loc.line.length + loc.char.length) + 1;
                if (tlen < 1) tlen = 1;
                result += ((mpath + ' ').grey  + loc.line.grey + (':' + loc.char).grey + ', '.grey + loc.fn.grey) + new Array(tlen).join(' ');
            }
            result += ' >>> '.grey;

            return result.grey;
        }



        // pad
        , _pad: function(text, len, char, invert) {
            text = text + '';
            return text.length >= len ? text : (invert ? text + new Array(len - text.length + 1).join(char || '0') : new Array(len - text.length + 1).join(char || '0') + text);
        }
    });
}();
