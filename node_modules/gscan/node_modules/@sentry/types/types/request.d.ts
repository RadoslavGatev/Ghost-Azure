/** Request data included in an event as sent to Sentry */
export interface Request {
    url?: string;
    method?: string;
    data?: any;
    query_string?: QueryParams;
    cookies?: {
        [key: string]: string;
    };
    env?: {
        [key: string]: string;
    };
    headers?: {
        [key: string]: string;
    };
}
export declare type QueryParams = string | {
    [key: string]: string;
} | Array<[string, string]>;
//# sourceMappingURL=request.d.ts.map