const path = require('path')
const through = require('through2')
const generateArchives = require('./generate-archives')
const _ = require('lodash')

function createTags (tags, options) {
  var stream = through.obj((file, enc, cb) => {
    cb(null, file)
  })

  var basename = options.basename || '/'

  _.forEach(tags, (tagObject) => {
    generateArchives(stream, {
      basename: path.join(basename, tagObject.tag),
      title: tagObject.tag,
      permalink: tagObject.permalink,
      articlesPerPage: options.postsPerPage,
      articles: tagObject.posts,
      dest: options.dest
    })
  })

  stream.end()
  stream.emit('end')

  return stream
}

module.exports = createTags
