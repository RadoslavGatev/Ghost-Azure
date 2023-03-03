const Rule = require('./base');
const {logNode} = require('../helpers');

module.exports = class NoUnknownGlobals extends Rule {
    _checkForUnknownGlobal(node) {
        if (node.path.data && !this.scope.isLocal(node)) {
            this.log({
                message: `${logNode(node)} is not a known global`,
                line: node.loc && node.loc.start.line,
                column: node.loc && node.loc.start.column,
                source: this.sourceForNode(node)
            });
        }
    }

    visitor() {
        return {
            MustacheStatement: this._checkForUnknownGlobal.bind(this)
        };
    }
};