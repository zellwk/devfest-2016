const gulp = require('gulp')
const lazypipe = require('lazypipe')
const config = require('../config')
const plugins = require('gulp-load-plugins')
const $ = plugins()

let cssPipe = lazypipe()
// .pipe($.uncss, {
//   html: config.useref.src,
//   ignore: config.uncss.ignore
// })
.pipe($.cssnano)

let jsPipe = lazypipe()
  .pipe($.uglify)

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
  .pipe(gulp.dest(config.useref.manifest))
})

