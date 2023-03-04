import type { Integration, Options } from '@sentry/types';
declare module '@sentry/types' {
    interface Integration {
        isDefaultInstance?: boolean;
    }
}
export declare const installedIntegrations: string[];
/** Map of integrations assigned to a client */
export declare type IntegrationIndex = {
    [key: string]: Integration;
};
/** Gets integrations to install */
export declare function getIntegrationsToSetup(options: Options): Integration[];
/**
 * Given a list of integration instances this installs them all. When `withDefaults` is set to `true` then all default
 * integrations are added unless they were already provided before.
 * @param integrations array of integration instances
 * @param withDefault should enable default integrations
 */
export declare function setupIntegrations(integrations: Integration[]): IntegrationIndex;
/** Setup a single integration.  */
export declare function setupIntegration(integration: Integration, integrationIndex: IntegrationIndex): void;
//# sourceMappingURL=integration.d.ts.map