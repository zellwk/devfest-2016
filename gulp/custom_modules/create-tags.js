import through from 'through2';
import generateArchives from './generate-archives';
import _ from 'lodash';

function createTags(tags, options) {

  let stream = through.obj((file, enc, cb) => {
    cb(null, file);
  });

  _.forEach(tags, (tagObject) => {
    generateArchives(stream, {
      basename: tagObject.tag,
      permalink: tagObject.permalink,
      articlesPerPage: options.postsPerPage,
      articles: tagObject.posts,
      dest: options.dest
    });
  });

  stream.end();
  stream.emit('end');

  return stream;
}

module.exports = createTags;
