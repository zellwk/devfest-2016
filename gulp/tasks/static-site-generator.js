import _ from 'lodash';
import fs from 'fs';
import gulp from 'gulp';
import gutil from 'gulp-util';
import moment from 'moment';
import path from 'path';
import through from 'through2';
import plugins from 'gulp-load-plugins';
import runSequence from 'run-sequence'
import stripJSONComments from 'strip-json-comments';

// Custom modules 
import plumber from '../custom_modules/plumber';
import createBlog from '../custom_modules/create-blog';
import createTags from '../custom_modules/create-tags';
import nunjuckTemplate from '../custom_modules/nunjucks-template';

// Import Config 
import config from '../config';

// Load plugins from gulp load plugins
let $ = plugins();

let posts = [];
let tags = [];

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
    .pipe(nunjuckTemplate({ data: config.blog.globalData }))
    .pipe($.prettyUrl())
    .pipe(gulp.dest(config.dest));
});
 
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
    .pipe(tapDate())
    .pipe(tapFilename())
    .pipe(tapPermalink(config.blog.blogDir))
    .pipe(tapTags())
    .pipe(getBlog(posts))
    .pipe(getTags(tags))
    .pipe(nunjuckTemplate({ data: config.blog.globalData }))
    .pipe($.prettyUrl())
    .pipe(gulp.dest(config.blog.postDest));
});

gulp.task('createBlog', () => {
  return createBlog({
      articles: posts,
      articlesPerPage: config.blog.articlesPerPage,
      basename: config.blog.blogDir,
    })
    .pipe(plumber())
    .pipe(nunjuckTemplate({
      data: config.blog.globalData,
      template: 'blog'
    }))
    .pipe($.prettyUrl())
    .pipe(gulp.dest(config.dest));
});

gulp.task('createTags', () => {
  return createTags(tags, {
      postsPerPage: config.blog.articlesPerPage,

    })
    .pipe(plumber())
    .pipe(nunjuckTemplate({
      data: config.blog.globalData,
      template: 'tag'
    }))
    .pipe($.prettyUrl())
    .pipe(gulp.dest(config.dest));
});

gulp.task('generateSite', (cb) => {
  // Resets posts and tags
  posts = [];
  tags = [];
  runSequence(
   ['posts', 'pages'],
   ['createBlog', 'createTags'],
   cb);  
});

// Get Global to pass on to swig templates (which I will edit later)
function tapGlobals(filepath) {
  return through.obj((file, enc, cb) => {
    let json = stripJSONComments(fs.readFileSync(filepath).toString());
    file.globalData = JSON.parse(json);
    cb(null, file);
  });
}

// Extracts Summary 
function tapSummary(marker) {
  return through.obj(function(file, enc, cb) {
    let contents = file.contents.toString();
    var summary;

    if (contents.includes(marker)) {
      summary = file.contents.toString().split(marker)[0];
    }

    file.frontmatter.summary = summary;

    cb(null, file);
  });
}

// Creates Date frontmatter
function tapDate(options = {}) {
  return through.obj((file, enc, cb) => {

    options.fileDateFormat = 'YYYY-MM-DD';
    options.outputDateFormat = 'Do MMM, YYYY';
    let filename = path.basename(file.path, path.extname(file.path));
    let date = moment(filename, options.fileDateFormat);

    file.frontmatter.date = date.format(options.fileDateFormat);
    file.frontmatter.dateString = date.format(options.outputDateFormat);

    cb(null, file);
  });
}

// Replace filename with permalink (if present) 
// (No checking if permalink exists yet
function tapFilename() {
  return through.obj((file, enc, cb) => {

    let dirname = path.dirname(file.path);
    let extname = path.extname(file.path);
    let filename = path.basename(file.path, extname);
    let permalink = file.frontmatter.permalink || 
      file.frontmatter.title ||
      filename;

    // ensures permalink is in correct format, replacing spaces with '-'
    permalink = permalink.toString().trim().replace(/\s+/g, '-').toLowerCase();

    // Replace filename with permalink
    filename = permalink;
    file.path = path.join(dirname, filename + extname);

    // Update frontmatter permalink
    file.frontmatter.permalink = permalink;
    cb(null, file);
  });
}

// Prepares Permalink to be placed in the correct directory. 
function tapPermalink(dirname) {
  return through.obj((file, enc, cb) => {
    let permalink = file.frontmatter.permalink;

    // Prep permalink with dirname 
    permalink = path.join(`/`, dirname, permalink);

    file.frontmatter.permalink = permalink;
    file.frontmatter.dirname = dirname;

    cb(null, file);
  });
}

// Formats Tags
function tapTags() {
  return through.obj((file, enc, cb) => {
  let frontmatter = file.frontmatter,
    dirname = frontmatter.dirname,
    // Splits tags with spaces or commas
    articleTags = frontmatter.tags ? frontmatter.tags.split(/[ ,]+/) : [];

    // Reset frontmatter tags
    frontmatter.tags = [];

    // Augments tag string into tag collection
    _.forEach(articleTags, (tag) => {
      let permalink;

      // Creates permalink for tag 
      permalink = path.join(path.join('/', dirname, tag));

      // Pushes permalink back to tag collection
      frontmatter.tags.push({
        tag: tag,
        dirname: dirname,
        permalink: permalink
      });
    });

    file.frontmatter = frontmatter;

    cb(null, file);
  });
}

// Gathers all blogs post articles
function getBlog(posts) {
  return through.obj((file, enc, cb) => {
    posts.push(file.frontmatter);
    cb(null, file);
  });
}

// Gathers all tags
function getTags(tags) {
  return through.obj((file, enc, cb) => {

    let articleTags = file.frontmatter.tags;

    _.forEach(articleTags, (tagObj) => {
      let index;

      // Searches for tag in tags
      index = _.findIndex(tags, {
        tag: tagObj.tag
      });

      // Creates tag if not found
      if (index < 0) {
        index = tags.length;
        tags.push({
          tag: tagObj.tag,
          permalink: tagObj.permalink,
          posts: []
        });
      }

      tags[index].posts.push(file.frontmatter);
    });

    cb(null, file);

  });
}
