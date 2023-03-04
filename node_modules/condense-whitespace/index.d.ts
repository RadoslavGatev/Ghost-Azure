/**
Remove leading, trailing, and repeated whitespace from a string.

@example
```
import condenseWhitespace = require('condense-whitespace');

condenseWhitespace('  foo bar     baz ');
//=> 'foo bar baz'
```
*/
declare function condenseWhitespace(string: string): string;

export = condenseWhitespace;
