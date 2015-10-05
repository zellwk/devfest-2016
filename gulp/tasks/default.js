import gulp from 'gulp';
import runSequence from 'run-sequence';

// Import configs
import config from '../config';

import plugins from 'gulp-load-plugins';
let $ = plugins();

// Not done yet
gulp.task('default', (cb) => {
  if (config.env === 'dev') {
    runSequence(
      ['clean', 'lint:scss', 'lint:js'],
      ['sprites', 'images', 'fonts'],
      ['sass', 'generateSite'],
      ['browserSync', 'webpack', 'watch'],
      cb);
  } else if (config.env === 'prod' || config.env === 'production') {
    runSequence(
      ['clean', 'lint:scss', 'lint:js'],
      ['sprites', 'images', 'fonts', 'webpack'],
      ['sass', 'generateSite'],
      'useref',
      'critical',
      'browserSync',
      cb
      );
  }
});

