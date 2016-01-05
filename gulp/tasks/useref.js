import gulp from 'gulp';
import lazypipe from 'lazypipe';
import through from 'through2';

import config from '../config';

import plugins from 'gulp-load-plugins';
let $ = plugins();

let cssPipe = lazypipe()
.pipe($.uncss, {
  html: [config.useref.src],
  ignore: config.uncss.ignore,
})
.pipe($.minifyCss);

let jsPipe = lazypipe()
  .pipe($.uglify);

gulp.task('useref', () => {
  return gulp.src(config.useref.src)
  .pipe($.useref(config.useref.opts))
  .pipe($.cached('useref'))
  .pipe($.if('*.css', cssPipe()))
  .pipe($.if('*.js', jsPipe()))
  .pipe($.if('*.css', $.rev()))
  .pipe($.if('*.js', $.rev()))
  .pipe($.revReplace())
  .pipe(gulp.dest(config.useref.dest))
  .pipe($.rev.manifest())
  .pipe(gulp.dest(config.useref.manifest));
});

