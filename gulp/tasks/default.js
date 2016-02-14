const gulp = require('gulp')
const runSequence = require('run-sequence')
const config = require('../config')

// Not done yet
gulp.task('default', (cb) => {
  if (config.env === 'dev') {
    runSequence(
      ['clean', 'lint:js'],
      ['images', 'fonts'],
      ['sass', 'generateSite'],
      ['browserSync', 'webpack', 'watch'],
      cb)
  } else if (config.env === 'prod') {
    runSequence(
      ['clean', 'lint:js'],
      ['images', 'fonts', 'webpack'],
      ['sass', 'generateSite'],
      'useref',
      cb
      )
  }
})
