process.env.server__port = process.env.PORT; // Get the port from named pipe
let appInsightsKey = process.env.APP_INSIGHTS_KEY;

if (appInsightsKey) {
    let appInsights = require("applicationinsights");
    appInsights.setup(appInsightsKey).start();
}

require('./index.js')