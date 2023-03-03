module.exports = {
    'GS090-NO-IMG-URL-IN-CONDITIONALS': require('./lint-no-img-url-in-conditionals'),
    'GS090-NO-UNKNOWN-CUSTOM-THEME-SETTINGS': require('./lint-no-unknown-custom-theme-settings'),
    'GS090-NO-UNKNOWN-CUSTOM-THEME-SELECT-VALUE-IN-MATCH': require('./lint-no-unknown-custom-theme-select-value-in-match'),
    'GS090-NO-AUTHOR-HELPER-IN-POST-CONTEXT': require('./lint-no-author-helper-in-post-page-context'),
    'no-multi-param-conditionals': require('./lint-no-multi-param-conditionals'),
    'no-nested-async-helpers': require('./lint-no-nested-async-helpers'),
    'no-prev-next-post-outside-post-context': require('./lint-no-prev-next-post-outside-post-context'),
    'no-unknown-globals': require('./lint-no-unknown-globals'),
    'no-unknown-partials': require('./lint-no-unknown-partials'),
    'no-unknown-helpers': require('./lint-no-unknown-helpers')
};
