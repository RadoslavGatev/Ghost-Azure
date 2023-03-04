'use strict'

const pReflect = require('p-reflect')
const { URL } = require('url')

const got = require('got').extend({
  decompress: false,
  responseType: 'buffer',
  retry: 1,
  headers: {
    Range: 'bytes=0-0'
  },
  hooks: {
    beforeRetry: [
      options => {
        delete options.headers.range
      }
    ]
  }
})

const mergeResponse = (responseOrigin = {}, responseDestination = {}) => ({
  statusMessage: 'Not Found',
  statusCode: 404,
  headers: { ...responseOrigin.headers, ...responseDestination.headers },
  ...responseOrigin,
  ...responseDestination
})

const reachableUrl = async (url, opts) => {
  const req = got(url, opts)

  const redirectStatusCodes = []
  const redirectUrls = []
  let response

  req.on('response', res => {
    response = res
  })

  req.on('redirect', res => {
    redirectUrls.push(res.url)
    redirectStatusCodes.push(res.statusCode)
  })

  const { isFulfilled, value, reason: error } = await pReflect(req)

  const mergedResponse = mergeResponse(isFulfilled ? value : error.response, response)

  if (mergedResponse.statusCode === 206) {
    const contentRange = mergedResponse.headers['content-range']
    if (typeof contentRange === 'string') {
      let contentLength = contentRange.split('/')
      if (contentLength.length > 1) {
        contentLength = contentLength[contentLength.length - 1]
        mergedResponse.statusCode = 200
        mergedResponse.statusMessage = 'OK'
        mergedResponse.headers['content-length'] = contentLength
        mergedResponse.headers['content-range'] = undefined
      }
    }
  }

  return {
    url,
    ...mergedResponse,
    redirectUrls,
    redirectStatusCodes,
    requestUrl: url
  }
}

const isReachable = ({ statusCode }) => statusCode >= 200 && statusCode < 400

module.exports = async (url, opts) => reachableUrl(new URL(url).href, opts)

module.exports.isReachable = isReachable
