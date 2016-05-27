const gulp = require('gulp')
const runSequence = require('run-sequence')
const config = require('../config')

gulp.task('default', (cb) => {
  if (config.env === 'dev') {
    runSequence(
      ['clean', 'lint:js'],
      ['images', 'svg', 'copy-svg', 'fonts'],
      ['sass', 'generateSite'],
      ['browserSync', 'webpack', 'watch'],
      cb)
  } else if (config.env === 'prod') {
    runSequence(
      ['lint:js'],
      ['images', 'svg', 'copy-svg','fonts', 'webpack'],
      ['sass', 'generateSite'],
      'useref',
      // Commented out because it took too long for multiple pages
      // 'critical',
      'sitemap',
      'cname',
      cb
    )
  }
})
