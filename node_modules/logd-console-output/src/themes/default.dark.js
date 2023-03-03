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
                color: 'white',
                bold: true,
                dim: true,
            }
        },
        number: {
            text: {
                color: 'blue',
                bold: true,
            }
        },
        date: {
            text: {
                color: 'magenta',
                bold: true,
            }
        },
        boolean: {
            text: {
                color: 'yellow',
            }
        },
        regexp: {
            text: {
                color: 'red',
                bold: true,
                dim: true,
            }
        },
        symbol: {
            text: {
                color: 'red',
                bold: true,
                dim: true,
            }
        },
        undefined: {
            text: {
                color: 'blue',
                bold: true,
                dim: true,
            }
        },
        null: {
            text: {
                color: 'blue',
                bold: true,
                dim: true,
            }
        },
        recursion: {
            text: {
                color: 'grey',
            }
        },
        weakSet: {
            text: {
                color: 'red',
                bold: true,
                dim: true,
            }
        },
        weakMap: {
            text: {
                color: 'red',
                bold: true,
                dim: true,
            }
        },
        buffer: {
            text: {
                color: 'white',
                dim: true,
            }
        },
        function: {
            name: {
                color: 'cyan',
            },
            source: {
                color: 'white',
                dim: true,
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
                color: 'red',
                bold: true,
                dim: true,
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
                dim: true,
            },
            propertyValue: {
                color: 'white',
            },
        },
        decoration: {
            text: {
                color: 'white',
                dim: true
            },
            decorator: {
                color: 'grey',
                dim: true
            }
        }
    },
}