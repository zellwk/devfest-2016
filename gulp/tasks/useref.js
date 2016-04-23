const gulp = require('gulp')
const config = require('../config')
const plugins = require('gulp-load-plugins')
const $ = plugins()

gulp.task('useref', () => {
  return gulp.src(config.useref.src)
  .pipe($.useref(config.useref.opts))
  .pipe($.cached('useref'))
  .pipe($.if('*.css', $.cssnano()))
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.css', $.rev()))
  .pipe($.if('*.js', $.rev()))
  .pipe($.revReplace())
  .pipe(gulp.dest(config.useref.dest))
  .pipe($.rev.manifest())
  .pipe(gulp.dest(config.useref.manifest))
})

