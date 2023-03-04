'use strict'

const ALPHABET = ['K', 'M', 'B', 'T']
const TRESHOLD = 1e3

module.exports = (n, fn) => {
  let idx = 0
  while (n >= TRESHOLD && ++idx <= ALPHABET.length) n /= TRESHOLD
  if (fn) n = fn(n)
  return String(idx === 0 ? n : n + ALPHABET[idx - 1])
}
