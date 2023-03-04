const _ = require('lodash');
const spec = require('../specs');
const {versions, normalizePath, getPackageJSON} = require('../utils');
const ASTLinter = require('../ast-linter');

function processFileFunction(files, failures, rules) {
    // This rule is needed to find partials
    // Partials are needed for a full parsing
    if (!rules['mark-used-partials']) {
        rules['mark-used-partials'] = require(`../ast-linter/rules/mark-used-partials`);
    }

    return function processFile(linter, themeFile) {
        if (themeFile.parsed.error) {
            // Ignore parsing errors, they are handled in 005
            return;
        }

        const astResults = linter.verify({
            parsed: themeFile.parsed,
            rules,
            source: themeFile.content,
            moduleId: themeFile.file
        });

        if (astResults.length) {
            failures.push({
                ref: themeFile.file,
                message: astResults[0].message
            });
        }

        linter.partials.forEach(({node: partial}) => {
            const file = files.find(f => normalizePath(f.file) === `partials/${normalizePath(partial)}.hbs`);
            if (file) {
                processFile(linter, file);
            }
        });
    };
}

function getCustomThemeSettings(theme) {
    const packageJSON = getPackageJSON(theme);
    let customThemeSettingsConfig;
    if (packageJSON && packageJSON.config && packageJSON.config.custom) {
        customThemeSettingsConfig = packageJSON.config.custom;
    }
    return customThemeSettingsConfig;
}

const checkTemplatesCompile = function checkTemplatesCompile(theme, options) {
    const checkVersion = _.get(options, 'checkVersion', versions.default);
    const ruleSet = spec.get([checkVersion]);
    const customThemeSettings = getCustomThemeSettings(theme);

    const ruleRegex = /GS090-.*/g;

    const rulesToCheck = _.pickBy(ruleSet.rules, function (rule, ruleCode) {
        if (ruleCode.match(ruleRegex)) {
            return rule;
        }
    });

    _.each(rulesToCheck, function (check, ruleCode) {
        const failures = [];
        const processFile = processFileFunction(
            theme.files,
            failures,
            {
                [ruleCode]: require(`../ast-linter/rules`)[ruleCode]
            }
        );

        const linter = new ASTLinter({
            partials: theme.partials,
            helpers: [],
            customThemeSettings: customThemeSettings
        });

        _.each(theme.files, function (themeFile) {
            let templateTest = themeFile.file.match(/(?<!partials\/.+?)\.hbs$/);

            if (templateTest) {
                processFile(linter, themeFile);
            }
        });

        if (failures.length > 0) {
            theme.results.fail[ruleCode] = {failures: failures};
        } else {
            theme.results.pass.push(ruleCode);
        }
    });

    return theme;
};

module.exports = checkTemplatesCompile;
