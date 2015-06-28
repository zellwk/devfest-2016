import gulp from 'gulp';
import gutil from 'gulp-util';
import through from 'through2';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

function generateArchives(stream, options) {

  let defaults = {
    articles: [],
    articlesPerPage: 10,
    basename: 'blog',
    dest: './dev'
  }

  options = _.assign(defaults, options);

  let pageCount = 1,
    totalArticles = options.articles.length + 1,
    articlesPerPage = parseInt(options.articlesPerPage),
    articles = _.sortByOrder(options.articles, 'date', false); // latest articles first

  // Separates articles into pages
  for (let i = 0; i < articles.length + articlesPerPage; i++) {

    let page = _.slice(articles, 0, articlesPerPage);

    // Pops out the same number of articles as articles per page
    recursiveShift(articles, articlesPerPage + 1);

    if (!_.isEmpty(page)) {
      let pageMod = pageCount !== 1 ? '/page-' + pageCount : '';

      let file = new gutil.File({
        base: path.join(__dirname, options.dest),
        cwd: __dirname,
        path: path.join(__dirname, options.dest, `${options.basename}${pageMod}.html`)
      });

      file.frontmatter = {
        title: toTitleCase(options.basename),
        articles: page,
        prevPage: pageCount <= 1 ? null : pageCount - 1,
        nextPage: (pageCount) * articlesPerPage > totalArticles ? null : pageCount + 1
      }

      stream.write(file);

    }
    pageCount += 1;
  }
}

// Recursively pops an array
function recursiveShift(arr, n) {
  if (n <= 1) {
    return;
  } else {
    arr.shift();
  }

  return recursiveShift(arr, n - 1);
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

module.exports = generateArchives;
