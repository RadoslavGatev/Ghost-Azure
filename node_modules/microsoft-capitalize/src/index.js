'use strict'

const head = str => str.charAt(0)

const tail = str => str.slice(1)

const upperHead = str => head(str).toUpperCase()

const capitalize = str => upperHead(str) + tail(str).toLowerCase()

const isUpperCaseWord = str =>
  str.split('').every(letter => letter === letter.toUpperCase())

module.exports = (str, exceptions = []) => {
  // all minus unless the first world
  let title = str
    .split(/\.(?![\d])/)
    .map(str => capitalize(str.trim()))
    .join('. ')
    .trim()

  // respect special words
  if (exceptions.length) {
    exceptions.forEach(word => {
      const re = new RegExp(`\\b(?:${word})\\b`, 'gi')
      if (re.test(str)) {
        title = title.replace(re, word)
      }
    })

    // still be sure first word is capitalized even it's an exception
    title = upperHead(title) + tail(title)
  }

  // respect uppercase words
  title = title.split(' ')
  str.split(' ').forEach((word, index) => {
    if (isUpperCaseWord(word)) {
      title[index] = word
    }
  })

  title = title.join(' ')

  // uppercase after `:`
  if (title.includes(':')) {
    title = title.split(':')
    title = `${title[0]}: ${capitalize(title[1].trim())}`
  }

  return title
}
