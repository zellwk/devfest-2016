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
    permalink: '/blog',
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
        cwd: process.cwd(),
        path: path.join(process.cwd(), `${options.basename}${pageMod}.html`)
      });

      let permalink = path.join('/', options.basename);
      let prevPage = pageCount <= 1 ? null : pageCount - 1;
      let nextPage = (pageCount) * articlesPerPage > totalArticles ? null : pageCount + 1;

      file.localData = {
        title: toTitleCase(options.basename),
        permalink: path.join(permalink, '/'),
        articles: page,
        prevPage: prevPage,
        nextPage: nextPage,
        prevPagePermalink: path.join(permalink + prevPage, '/'),
        nextPagePermalink: path.join(permalink + nextPage, '/'),
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
