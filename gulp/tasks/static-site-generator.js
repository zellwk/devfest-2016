const _ = require('lodash')
const gulp = require('gulp')
const moment = require('moment')
const path = require('path')
const through = require('through2')
const plugins = require('gulp-load-plugins')
const runSequence = require('run-sequence')

// Custom modules
const plumber = require('../custom_modules/plumber')
const createBlog = require('../custom_modules/create-blog')
const createTags = require('../custom_modules/create-tags')
const nunjuckTemplate = require('../custom_modules/nunjucks-template')
const config = require('../config')

// Load plugins = require(gulp load plugin)
const $ = plugins()

var posts = []
var tags = []

// Handling Templates

// TODO: Switch tapGlobals and Nunjuck Templates such that
// 1) collectData Sources => 1 plugin
// 2) Output Data => 1 plugin

gulp.task('pages', () => {
  return gulp.src(config.blog.pageSrc)
    .pipe(plumber())
    .pipe($.frontMatter({
      property: 'frontmatter',
      remove: true
    }))
    // .pipe(tapGlobals(config.blog.globalData))
    .pipe(nunjuckTemplate({data: config.blog.globalData}))
    .pipe($.prettyUrl())
    .pipe(gulp.dest(config.dest))
})

gulp.task('posts', () => {
  return gulp.src(config.blog.postSrc)
    .pipe(plumber())
    .pipe($.frontMatter({
      property: 'frontmatter',
      remove: true
    }))
    // Must use this. Nunjuck Markdown tag screws up summary marker
    .pipe($.markdown(config.blog.markdownOptions))
    .pipe(tapSummary(config.blog.summaryMarker))
    .pipe(tapDate(config.blog.date))
    .pipe(tapFilename())
    .pipe(tapPermalink(config.blog.blogDir))
    .pipe(tapTags(config.blog.tags))
    .pipe(getBlog(posts))
    .pipe(getTags(tags))
    .pipe(nunjuckTemplate({data: config.blog.globalData}))
    .pipe($.prettyUrl())
    .pipe(gulp.dest(config.blog.postDest))
})

gulp.task('createBlog', () => {
  return createBlog({
    articles: posts,
    articlesPerPage: config.blog.articlesPerPage,
    basename: config.blog.blogDir
  })
    .pipe(plumber())
    .pipe(nunjuckTemplate({
      data: config.blog.globalData,
      template: 'blog'
    }))
    .pipe($.prettyUrl())
    .pipe(gulp.dest(config.dest))
})

gulp.task('createTags', () => {
  return createTags(tags, {
    postsPerPage: config.blog.articlesPerPage,
    basename: config.blog.tags.basename
  })
    .pipe(plumber())
    .pipe(nunjuckTemplate({
      data: config.blog.globalData,
      template: 'tag'
    }))
    .pipe($.prettyUrl())
    .pipe(gulp.dest(config.dest))
})

gulp.task('generateSite', (cb) => {
  // Resets posts and tags
  posts = []
  tags = []
  runSequence(
   ['posts', 'pages'],
   ['createBlog', 'createTags'],
   cb)
})

// Get Global to pass on to swig templates (which I will edit later)
// function tapGlobals(filepath) {
//   return through.obj((file, enc, cb) => {
//     let json = stripJSONComments(fs.readFileSync(filepath).toString());
//     file.globalData = JSON.parse(json);
//     cb(null, file);
//   });
// }

// Extracts Summary
function tapSummary (marker) {
  return through.obj(function (file, enc, cb) {
    var contents = file.contents.toString()
    var summary

    if (contents.includes(marker)) {
      summary = file.contents.toString().split(marker)[0]
    }

    file.frontmatter.summary = summary

    cb(null, file)
  })
}

// Creates Date frontmatter
function tapDate (options) {
  return through.obj((file, enc, cb) => {
    var filename = path.basename(file.path, path.extname(file.path))
    var date = moment(filename, options.fileDateFormat)

    file.frontmatter.date = date.format(options.fileDateFormat)
    file.frontmatter.dateString = date.format(options.outputDateFormat)

    cb(null, file)
  })
}

// Replace filename with permalink (if present)
// (No checking if permalink exists yet
function tapFilename () {
  return through.obj((file, enc, cb) => {
    var dirname = path.dirname(file.path)
    var extname = path.extname(file.path)
    var filename = path.basename(file.path, extname)
    var permalink = file.frontmatter.permalink ||
      file.frontmatter.title ||
      filename

    // ensures permalink is in correct format, replacing spaces with '-'
    permalink = permalink.toString().trim().replace(/\s+/g, '-').toLowerCase()

    // Replace filename with permalink
    filename = permalink
    file.path = path.join(dirname, filename + extname)

    // Update frontmatter permalink
    file.frontmatter.permalink = permalink
    cb(null, file)
  })
}

// Prepares Permalink to be placed in the correct directory.
function tapPermalink (dirname) {
  return through.obj((file, enc, cb) => {
    var permalink = file.frontmatter.permalink

    // Prep permalink with dirname
    permalink = path.join(`/`, dirname, permalink)

    file.frontmatter.permalink = permalink
    file.frontmatter.dirname = dirname

    cb(null, file)
  })
}

// Formats Tags
function tapTags (options) {
  return through.obj((file, enc, cb) => {
    var frontmatter = file.frontmatter
    var dirname = frontmatter.dirname
    // Splits tags with spaces or commas
    var articleTags = frontmatter.tags ? frontmatter.tags.split(/[ ,]+/) : []
    articleTags.sort()
    var basename = options.basename || '/'

    // Reset frontmatter tags
    frontmatter.tags = []

    // Augments tag string into tag collection
    _.forEach(articleTags, (tag) => {
      var permalink

      tag = tag.replace('==', '')

      // Creates permalink for tag
      permalink = path.join(path.join(basename, tag))

      // Pushes permalink back to tag collection
      frontmatter.tags.push({
        tag: tag,
        dirname: dirname,
        permalink: permalink
      })
    })

    file.frontmatter = frontmatter

    cb(null, file)
  })
}

// Gathers all blogs post articles
function getBlog (posts) {
  return through.obj((file, enc, cb) => {
    posts.push(file.frontmatter)
    cb(null, file)
  })
}

// Gathers all tags
function getTags (tags) {
  return through.obj((file, enc, cb) => {
    var articleTags = file.frontmatter.tags

    _.forEach(articleTags, (tagObj) => {
      var index

      // Searches for tag in tags
      index = _.findIndex(tags, {
        tag: tagObj.tag
      })

      // Creates tag if not found
      if (index < 0) {
        index = tags.length
        tags.push({
          tag: tagObj.tag,
          permalink: '/tags' + tagObj.permalink,
          posts: []
        })
      }

      tags[index].posts.push(file.frontmatter)
    })

    cb(null, file)
  })
}
