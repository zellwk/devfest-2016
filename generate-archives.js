import gulp from 'gulp';
import gutil from 'gulp-util';
import through from 'through2';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

function generateArchives(
  basename, postsPerPage, posts, stream
) {

  let pages = [],
    pageCount = 1,
    totalPosts = posts.length + 1;

  postsPerPage = parseInt(postsPerPage);

  // Sort posts, latest first
  posts = _.sortByOrder(posts, 'date', false);

  // Separates posts into pages
  for (let i = 0; i < posts.length + postsPerPage; i++) {

    let page = _.slice(posts, 0, postsPerPage);

    recursiveShift(posts, postsPerPage + 1);

    if (!_.isEmpty(page)) {
      let pageMod = pageCount !== 1 ? '/page-' + pageCount : '';
      pages.push(page);
      let file = new gutil.File({
        base: path.join(__dirname, './testing/'),
        cwd: __dirname,
        path: path.join(__dirname, `./testing/${basename}${pageMod}.html`)
      });

      file.posts = page;
      file.prevPage = pageCount <= 1 ? null : pageCount - 1;
      file.nextPage = (pageCount) * postsPerPage > totalPosts ? null : pageCount + 1;

      stream.write(file);
    }
    pageCount += 1;
  }
}

function recursiveShift(arr, n) {
  if (n <= 1) {
    return;
  } else {
    arr.shift();
  }

  return recursiveShift(arr, n - 1);
}

module.exports = generateArchives;
