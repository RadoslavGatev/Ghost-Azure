const Rule = require('./base');

module.exports = class MarkUsedCustomThemeSettings extends Rule {
    _markUsedCustomThemeSettings(node) {
        if (node.data && node.parts && node.parts.length === 2 && node.parts[0] === 'custom') {
            this.scanner.context.customThemeSettings.push(node.parts[1]);
        }
    }

    visitor() {
        return {
            PathExpression: this._markUsedCustomThemeSettings.bind(this)
        };
    }
};
