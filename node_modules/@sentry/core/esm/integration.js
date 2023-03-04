import { addGlobalEventProcessor, getCurrentHub } from '@sentry/hub';
import { logger } from '@sentry/utils';

var installedIntegrations = [];

/** Map of integrations assigned to a client */

/**
 * @private
 */
function filterDuplicates(integrations) {
  return integrations.reduce((acc, integrations) => {
    if (acc.every(accIntegration => integrations.name !== accIntegration.name)) {
      acc.push(integrations);
    }
    return acc;
  }, [] );
}

/** Gets integration to install */
function getIntegrationsToSetup(options) {
  var defaultIntegrations = (options.defaultIntegrations && [...options.defaultIntegrations]) || [];
  var userIntegrations = options.integrations;

  let integrations = [...filterDuplicates(defaultIntegrations)];

  if (Array.isArray(userIntegrations)) {
    // Filter out integrations that are also included in user options
    integrations = [
      ...integrations.filter(integrations =>
        userIntegrations.every(userIntegration => userIntegration.name !== integrations.name),
      ),
      // And filter out duplicated user options integrations
      ...filterDuplicates(userIntegrations),
    ];
  } else if (typeof userIntegrations === 'function') {
    integrations = userIntegrations(integrations);
    integrations = Array.isArray(integrations) ? integrations : [integrations];
  }

  // Make sure that if present, `Debug` integration will always run last
  var integrationsNames = integrations.map(i => i.name);
  var alwaysLastToRun = 'Debug';
  if (integrationsNames.indexOf(alwaysLastToRun) !== -1) {
    integrations.push(...integrations.splice(integrationsNames.indexOf(alwaysLastToRun), 1));
  }

  return integrations;
}

/**
 * Given a list of integration instances this installs them all. When `withDefaults` is set to `true` then all default
 * integrations are added unless they were already provided before.
 * @param integrations array of integration instances
 * @param withDefault should enable default integrations
 */
function setupIntegrations(integrations) {
  var integrationIndex = {};

  integrations.forEach(integration => {
    integrationIndex[integration.name] = integration;

    if (installedIntegrations.indexOf(integration.name) === -1) {
      integration.setupOnce(addGlobalEventProcessor, getCurrentHub);
      installedIntegrations.push(integration.name);
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && logger.log(`Integration installed: ${integration.name}`);
    }
  });

  return integrationIndex;
}

export { getIntegrationsToSetup, installedIntegrations, setupIntegrations };
//# sourceMappingURL=integration.js.map
