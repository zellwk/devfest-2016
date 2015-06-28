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
import createBlog from './create-blog';
import createTags from './create-tags';
import debug from 'gulp-debug';

let posts = [];
let tags = [];

// Handling Templates 
gulp.task('posts', () => {
  return gulp.src('./src/posts/*.{md,html}')
    .pipe(testing())
    .pipe(tapGlobals('./src/data/data.json'))
    .pipe(frontmatter({
      property: 'frontmatter',
      remove: true
    }))
    .pipe(gulpMarked({
      smartypants: true
    }))
    .pipe(tapSummary('<!--more-->'))
    .pipe(tapPermalink('blog'))
    .pipe(tapDate())
    .pipe(tapTags('blog'))
    .pipe(getBlog(posts))
    .pipe(getTags(tags, 'blog'))
    .pipe(swigTemplate({
      swigOptions: {
        locals: require('./src/data/data.json')
      }
    }))
    // .pipe(permalinks())
    .pipe(gulpPrettyUrl())
    .pipe(gulp.dest('dev/blog'));
});

gulp.task('createBlog', ['posts'], () => {
  return createBlog({
      articles: posts,
      articlesPerPage: '5',
      basename: 'blog'
    })
    // swig template here (Might have to tweak file or swig template.js)
    .pipe(swigTemplate({
      template: 'blog',
      swigOptions: {
        locals: JSON.parse(fs.readFileSync('./src/data/data.json'))
      }
    }))
    .pipe(gulpPrettyUrl())
    .pipe(gulp.dest('dev'));
});

gulp.task('createTags', ['posts'], () => {
  return createTags(tags, {
      postsPerPage: 5
    })
    .pipe(swigTemplate({
      template: 'tag',
      swigOptions: {
        locals: JSON.parse(fs.readFileSync('./src/data/data.json'))
      }
    }))
    .pipe(gulpPrettyUrl())
    .pipe(gulp.dest('dev'));
})

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

// Creates Permalinks from file title if permalink frontmatter not found. 
function tapPermalink(basename) {
  return through.obj((file, enc, cb) => {
    let permalink = file.frontmatter.permalink ? file.frontmatter.permalink : file.frontmatter.title;

    // ensures permalink is in correct format, replacing spaces with '-'
    permalink = permalink.trim().replace(/\s+/g, '-').toLowerCase();

    // Prep permalink with basename 

    permalink = path.join(`/`, basename, permalink);

    file.frontmatter.permalink = permalink;

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

// Gathers all blogs post articles
function getBlog(posts, tags) {
  return through.obj((file, enc, cb) => {
    posts.push(file.frontmatter);
    cb(null, file);
  });
}

// Gathers all tags
function getTags(tags, basename) {
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
        })
      }

      tags[index].posts.push(file.frontmatter);
    });

    cb(null, file);

  });
}

function testing() {
  return through.obj((file, enc, cb) => {
    cb(null, file);
  })
}


// Formats Tags
function tapTags(basename) {
  return through.obj((file, enc, cb) => {
    let frontmatter = file.frontmatter,
      // Splits tags with spaces or commas
      articleTags = frontmatter.tags.split(/[ ,]+/);

    // Reset frontmatter tags
    frontmatter.tags = [];

    // Augments tag string into tag collection
    _.forEach(articleTags, (tag) => {
      let permalink;

      // Creates permalink for tag 
      permalink = path.join(path.join('/', basename, tag));

      // Pushes permalink back to tag collection
      frontmatter.tags.push({
        tag: tag,
        permalink: permalink
      });
    });

    file.frontmatter = frontmatter;

    cb(null, file);
  })
}
