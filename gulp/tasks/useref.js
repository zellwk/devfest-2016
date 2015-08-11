import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import critical from 'critical';
import config from '../config';
import lazypipe from 'lazypipe';
import through from 'through2';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

let $ = plugins();

let cssPipe = lazypipe()
  .pipe($.uncss, {
    html: ['./dist/**/*.html'],
    ignore: [/.is-/, /.has-/, /.hljs-/],
  })
  .pipe($.minifyCss)
  .pipe($.csso)

let jsPipe = lazypipe()
  .pipe($.uglify);

// Optimizes with the help of useref. 
// Note: Unable to rev inserted JSPM script (yet)
gulp.task('useref', () => {

  var assets = $.useref.assets();

  return gulp.src('./dist/**/*.html')
  .pipe(assets)
  .pipe($.cached('useref'))
  .pipe($.if('*.css', cssPipe()))
  .pipe($.if('*.js', jsPipe()))
  .pipe($.rev())
  .pipe(assets.restore())
  .pipe($.useref({
    // Check if there's way to bring uncomment build type to 
    // be reved https://github.com/jonkemp/gulp-useref/issues/121
    uncomment: (content, target, options, alternateSearchPath) => {
      content = content.replace('<!--', '').replace('-->', '');
      return content;
    }
  }))
  .pipe($.revReplace())
  .pipe(gulp.dest('./dist'));
});

gulp.task('critical', function() {
  critical.generate({
    inline: true,
    base: './dist',
    src: 'index.html',
    dest: './dist/index.html',
    width: 320,
    height: 480,
    minify: true
  });        
});
