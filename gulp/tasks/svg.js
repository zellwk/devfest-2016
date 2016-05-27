const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../config')

gulp.task('svg', () => {
  return gulp.src(config.svg.src)
    .pipe($.svgSprite(config.svg.opts))
    .pipe(gulp.dest(config.svg.dest))
})

gulp.task('copy-svg', function () {
  gulp.src(config.svg.src)
    .pipe($.svgo())
    .pipe(gulp.dest(config.images.dest))
})
