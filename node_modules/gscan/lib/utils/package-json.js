/**
 * Copy of Ghost defaults for https://github.com/TryGhost/Ghost/blob/e25f1df0ae551c447da0d319bae06eadf9665444/core/frontend/services/theme-engine/config/defaults.json
 */
const defaultConfig = {
    posts_per_page: 5,
    card_assets: {
        exclude: ['bookmark', 'gallery']
    }
};

/**
 * Extracts the package.json JSON content. Note that this function never throws,
 * even when there is a JSON parsing error.
 * This function uses the default `config` property to match Ghost implementation.
 * @param {Object} theme The theme to extract package.json from.
 * @returns {Object} The content of the package.json file, or `null` if
 * something happened (no file, JSON parsing error...).
 */
function getJSON(theme) {
    let packageJSON = theme.files.find(item => item.file === 'package.json');
    if (packageJSON && packageJSON.content) {
        try {
            const json = JSON.parse(packageJSON.content);

            // Use the default .config and allow it to be overwritten
            const content = Object.assign({}, json, {
                config: Object.assign({}, defaultConfig, json.config)
            });

            return content;
        } catch (e) {
            // Do nothing here
        }
    }
    return {
        config: defaultConfig
    };
}

module.exports = getJSON;
