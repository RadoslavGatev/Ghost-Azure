const parser = require('../dist/parser').parser;
parser.yy = require('./scope');

exports.lex = (input) => {
    parser.lexer.setInput(input);
    var lexed = parser.lexer.lex(),
        tokens = [];

    while (lexed !== parser.lexer.EOF) {
        tokens.push({token: parser.terminals_[lexed], matched: parser.lexer.match});
        lexed = parser.lexer.lex();
    }

    return tokens;
};

// returns the JSON object
exports.parse = (input, options) => parser.parse(input, options || {});
