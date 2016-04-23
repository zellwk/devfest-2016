const gulp = require('gulp')
const browserSync = require('browser-sync')
const config = require('../config')

var reload = browserSync.reload

// Watch for file changes
gulp.task('watch', function () {
  // Watch assets
  gulp.watch(config.sass.src, ['sass'])

  // Watch site generators
  gulp.watch(config.blog.postSrc, ['site-watch'])
  gulp.watch(config.blog.pageSrc, ['site-watch'])
  gulp.watch(config.blog.watch, ['site-watch'])
})

// Slow watch tasks
gulp.task('site-watch', ['regenerateSite'], reload)

