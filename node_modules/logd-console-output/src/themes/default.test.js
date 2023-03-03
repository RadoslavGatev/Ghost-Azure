'use strict';


module.exports = {
    name: 'default.dark',
    indentation: 4,
    renderers: {
        moduleName: {
            text: {
                color: 'magenta',
                bold: true,
                dim: true,
            }
        },
        string: {
            text: {
                color: 'green',
            }
        },
        number: {
            text: {
                color: 'blue',
            }
        },
        date: {
            text: {
                color: 'cyan',
            }
        },
        boolean: {
            text: {
                color: 'red',
                dim: true,
            }
        },
        regexp: {
            text: {
                color: 'magenta',
            }
        },
        symbol: {
            text: {
                color: 'magenta',
            }
        },
        undefined: {
            text: {
                color: 'magenta',
            }
        },
        null: {
            text: {
                color: 'magenta',
            }
        },
        recursion: {
            text: {
                color: 'grey',
            }
        },
        weakSet: {
            text: {
                color: 'magenta',
            }
        },
        weakMap: {
            text: {
                color: 'magenta',
            }
        },
        buffer: {
            text: {
                color: 'white',
            }
        },
        function: {
            name: {
                color: 'cyan',
            },
            source: {
                color: 'grey'
            }
        },
        callsite: {
            path: {
                color: 'white',
                dim: true,
            },
            line: {
                color: 'grey'
            },
            signature: {
                color: 'white',
                dim: true,
            },
            time: {
                color: 'grey'
            },
        },
        promise: {
            name: {
                color: 'magenta',
            },
        },
        error: {
            message: {
                color: 'white',
                bold: true,
            },
            type: {
                color: 'red',
                bold: true,
            },
            path: {
                color: 'yellow',
            },
            decoration: {
                color: 'grey',
            },
            line: {
                color: 'white',
            },
            function: {
                color: 'white',
            },
            property: {
                color: 'white',
            },
            propertyValue: {
                color: 'cyan',
            },
        },
        decoration: {
            text: {
                color: 'white',
                dim: true,
            },
            decorator: {
                color: 'grey',
            }
        }
    },
}