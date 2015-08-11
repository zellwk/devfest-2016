import through from 'through2';
import generateArchives from './generate-archives';

function createBlog(options) {

  let stream = through.obj((file, enc, cb) => {
    cb(null, file);
  });

  generateArchives(stream, options);

  stream.end();
  stream.emit('end');

  return stream;
}

module.exports = createBlog;