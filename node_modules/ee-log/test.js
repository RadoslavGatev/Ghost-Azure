var log = require( "./" );

log.debug(`debugging stuff (log.debug)?`);
log.info(`oh, some information (log.info)!`);
log.warn(`it's getting scary! (log.warn)`);
log.error(`no good :( (log.error)`);
log.highlight(`interesting (log.highlight)!`);
log.success(`finally somethign worked (log.success)!`);
log.trace(new Error('something went very wrong :/'));
log({
    string: 'Hi, my name is Lina',
    numbers: 1336,
    booleans: true,
    RegularExpressions: /mathing stuff/gi,
    Symbols: Symbol('Very unique'),
    Maps: new Map([
        ['key-a', `It's a string!`],
        ['key-b', new Set(['A', 'set', 'with', 'important', 'values'])],
        ['key-c', {objects: 'too'}],
    ]),
    and: 'many more',
});
