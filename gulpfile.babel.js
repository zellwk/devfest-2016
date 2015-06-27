import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpMarked from 'gulp-marked';
import frontmatter from 'gulp-front-matter';
import swigTemplate from './swig-template';
import gulpPrettyUrl from 'gulp-pretty-url';
import through from 'through2';
import path from 'path';
import fs from 'fs';
import moment from 'moment';
import _ from 'lodash';
import generateArchives from './generate-archives';

let posts = [];
let tags = [];

// Handling Templates 
gulp.task('posts', () => {
  return gulp.src('./src/posts/*.md')
    .pipe(frontmatter({
      property: 'frontmatter',
      remove: true
    }))
    .pipe(gulpMarked({
      smartypants: true
    }))
    .pipe(swigTemplate({
      useTemplate: true,
      swigOptions: {
        locals: require('./src/data/data.json')
      }
    }))
    .pipe(gulpPrettyUrl())
    .pipe(gulp.dest('dev/blog'));
});

gulp.task('pages', () => {
  return gulp.src('./src/pages/*.html')
    .pipe(swigTemplate({
      swigOptions: {
        locals: require('./src/data/data.json')
      }
    }))
    .pipe(gulpPrettyUrl())
    .pipe(gulp.dest('dev'));
});

gulp.task('archives', () => {
  return gulp.src('./src/posts/*.{md,html}')
    .pipe(tapGlobals('./src/data/data.json'))
    .pipe(frontmatter({
      property: 'frontmatter',
      remove: true
    }))
    .pipe(gulpMarked({
      smartypants: true
    }))
    .pipe(tapSummary('<!--more-->'))
    .pipe(tapPermalink())
    .pipe(tapDate())
    .pipe(getBlog(posts))
    .pipe(getTags(posts, tags))
    // .pipe(gulp.dest('testing'));
});



gulp.task('createBlog', ['archives'], () => {
  return createBlog('blog', '5', posts)
    // swig template here (Might have to tweak file or swig template.js)
    .pipe(testing())
    .pipe(gulp.dest('testing'));
});

gulp.task('createTags', ['archives'], () => {
  return createTags(5)
    .pipe(testing())
    .pipe(gulp.dest('testing'));
})

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

// Creates Permalinks if permalink frontmatter not found. 
function tapPermalink() {
  return through.obj((file, enc, cb) => {
    if (!file.frontmatter.permalink) {
      // Creates permalink by trimming ends, replacing spaces and setting lowercase

      file.frontmatter.permalink = file.frontmatter.title.trim().replace(/\s+/g, '-').toLowerCase();
    }

    cb(null, file);
  })
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
  })
}

// Get Global to pass on to swig templates (which I will edit later)
function tapGlobals(filepath) {
  return through.obj((file, enc, cb) => {
    file.globalData = JSON.parse(fs.readFileSync(filepath));
    cb(null, file);
  });
}

function getBlog(posts, tags) {
  return through.obj((file, enc, cb) => {
    posts.push(file.frontmatter);
    cb(null, file);
  });
}

// Gathers all tags into tags. 
// Already in chronological order since running foreach from posts 
function getTags(posts, tags) {
  return through.obj((file, enc, cb) => {
    let frontmatter = file.frontmatter,
      filetags = frontmatter.tags.split(',');

    _.forEach(filetags, (tag) => {
      tag = tag.trim();

      let index = _.findIndex(tags, {
        tag: tag
      });

      // Creates tag if tag not found 
      if (index < 0) {
        index = tags.length;
        tags.push({
          tag: tag,
          posts: []
        });
      }

      tags[index].posts.push(frontmatter);
    });

    cb(null, file);

  });
}

function createBlog(basename, postsPerPage, posts) {

  let stream = through.obj((file, enc, cb) => {
    cb(null, file);
  });

  generateArchives(stream, {
    basename: basename,
    articlesPerPage: postsPerPage,
    articles: posts
  });

  stream.end();
  stream.emit('end');

  return stream;
}

function createTags(postsPerPage) {

  let stream = through.obj((file, enc, cb) => {
    cb(null, file);
  });

  _.forEach(tags, (tagObject) => {
    generateArchives(stream, {
      basename: tagObject.tag,
      articlesPerPage: postsPerPage,
      articles: tagObject.posts
    });
  });

  stream.end();
  stream.emit('end');

  return stream;
}

function testing() {
  return through.obj((file, enc, cb) => {
    console.log(file.path);
    cb(null, file);
  })
}
