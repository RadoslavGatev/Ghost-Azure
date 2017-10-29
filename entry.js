process.env.server__port = process.env.PORT; // Get the port from named pipe
let appInsightsKey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY;

if (appInsightsKey) {
    let appInsights = require("applicationinsights");
    appInsights.setup(appInsightsKey).start();
}

require('./index.js')
