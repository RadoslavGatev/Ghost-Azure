/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns Boolean
 */
module.exports.isReqResUserSpecific = (req, res) => {
    return req?.get('cookie')
        || req?.get('authorization')
        || res?.get('set-cookie');
};

/**
 * Kitchen sink of Cache-Control header values used in Ghost
 * 
 * Reference of value meanings (based on rfc9111 - https://httpwg.org/specs/rfc9111.html):
 * 
 * 'no-cache'       - The response MUST NOT be used to satisfy any other request without
 *                    forwarding it for validation and receiving a successful response.
 * 
 * 'private'        - Indicates that a shared cache MUST NOT store the response (i.e., the response 
 *                    is intended for a single user).
 *                    In context of Ghost it means the header should only be used if there are
 *                    cookie or authorization headers set on the response, otherwise there’s no
 *                    “single user” intention.
 * 
 * 'no-store'       - A cache MUST NOT store any part of either the immediate request or the
 *                    response and MUST NOT use the response to satisfy any other request.
 * 
 * 'must-revalidate'- Means that the response must not be reused without revalidation once it is stale.
 * 
 */
module.exports.cacheControlValues = {
    // never cache a single bit in any type of cache
    private: 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0',
    // never cache except if it's a shared cache (lack of 'private' allows to do so)
    noCacheDynamic: 'no-cache, max-age=0, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
};
