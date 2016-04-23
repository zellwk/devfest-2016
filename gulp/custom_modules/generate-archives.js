const gutil = require('gulp-util')
const path = require('path')
const _ = require('lodash')

function generateArchives (stream, options) {
  var defaults = {
    articles: [],
    articlesPerPage: 10,
    basename: 'blog',
    permalink: '/blog',
    title: 'blog'
  }

  options = Object.assign(defaults, options)

  var articles = _.orderBy(options.articles, 'date', 'desc')
  var articlesPerPage = parseInt(options.articlesPerPage, 10)
  var pages = splitPages(articles, articlesPerPage)

  // Creates a new file for every page
  pages.forEach((page, index) => {
    var file = new gutil.File({
      cwd: process.cwd(),
      path: absPathToPage(index, options.basename)
    })

    file.localData = {
      title: toTitleCase(options.title),
      permalink: absPathToPage(index, options.basename),
      articles: page,
      prevPage: index - 1 >= 0 ? true : null,
      nextPage: index + 1 < pages.length ? true : null,
      prevPageUrl: pathToPage(index - 1, options.basename),
      nextPageUrl: pathToPage(index + 1, options.basename),
      pagination: pagination(index, pages.length, options.basename)
    }

    stream.write(file)
  })
}

function pagination (index, totalPages, basename) {
  index += 1
  var lowerLimit = Math.max(index - 4, 1)
  var upperLimit = Math.min(index + 5, totalPages)

  if (index + 5 > totalPages) {
    lowerLimit = Math.max(totalPages - 9, 1)
  }

  if (index < 5) {
    upperLimit = Math.min(10, totalPages)
  }

  return createPageArray(index, lowerLimit, upperLimit, basename, [])
}

function createPageArray (index, lowerLimit, upperLimit, basename, out) {
  if (lowerLimit > upperLimit) return out
  else {
    var p = {}
    p.index = lowerLimit
    p.url = pathToPage(lowerLimit - 1, basename)
    p.active = lowerLimit === index
    out.push(p)
    return createPageArray(index, lowerLimit + 1, upperLimit, basename, out)
  }
}

function splitPages (a, n) {
  var out = []
  var len = a.length
  var i = 0

  while (i < len) {
    var arr = a.slice(i, i + n)
    out.push(arr)
    i += n
  }

  return out
}

function pathToPage (index, basename) {
  if (index < 0) {
    return false
  } else if (index === 0) {
    return path.join('/', basename)
  } else {
    return path.join('/', basename, `page-${index + 1}`)
  }
}

function absPathToPage (index, basename) {
  return path.join(process.cwd(), pathToPage(index, basename), 'index.html')
}

function toTitleCase (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

module.exports = generateArchives
