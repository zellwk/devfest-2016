const gulp = require('gulp')
const plugins = require('gulp-load-plugins')
const config = require('../config')
const $ = plugins()

gulp.task('sitemap', () => {
  return gulp.src(config.dest + '/**/*.html')
    .pipe($.sitemap({
      siteUrl: 'http://zellwk.com'
    }))
    .pipe(gulp.dest(config.dest))
})
