'use strict'

const encode = require('punycode2/to-ascii')
const parseURI = require('parse-uri')

// Illegal characters (anything which is not in between the square brackets):
const ILLEGALS = /[^a-z0-9:/?#[\]@!$&'()*+,;=.\-_~%]/i

// Incomplete HEX escapes:
const HEX1 = /%[^0-9a-f]/i
const HEX2 = /%[0-9a-f](:?[^0-9a-f]|$)/i

// Scheme must begin with a letter, then consist of letters, digits, '+', '.', or '-' => e.g., 'http', 'https', 'ftp'
const PROTOCOL = /^[a-z][a-z0-9+\-.]*$/

// If authority is not present, path must not begin with '//'
const PATH = /^\/\//

module.exports = (input, opts) => {
  if (!input) return false
  const encoded = encode(String(input))

  if (!encoded) return false
  if (ILLEGALS.test(encoded)) return false
  if (HEX1.test(encoded) || HEX2.test(encoded)) return false

  const uri = parseURI(encoded, opts)
  if (!uri.protocol || !PROTOCOL.test(uri.protocol.toLowerCase())) return false
  if (!uri.authority && PATH.test(uri.path)) return false

  return true
}
