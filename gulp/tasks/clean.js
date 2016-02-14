const gulp = require('gulp')
const config = require('../config')
const del = require('del')
const plugins = require('gulp-load-plugins')
const $ = plugins()

gulp.task('clean', () => {
  return del.sync([config.dest + '/**/*'])
})

// Clear cache
gulp.task('clean:cc', cb => {
  return $.cache.clearAll(cb)
})
