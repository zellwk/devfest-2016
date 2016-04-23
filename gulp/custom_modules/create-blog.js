const through = require('through2')
const generateArchives = require('./generate-archives')

function createBlog (options) {
  var stream = through.obj((file, enc, cb) => {
    cb(null, file)
  })

  generateArchives(stream, options)

  stream.end()
  stream.emit('end')

  return stream
}

module.exports = createBlog
