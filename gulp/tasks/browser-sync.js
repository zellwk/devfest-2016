import gulp from 'gulp';
import browserSync from 'browser-sync';
import config from '../config'

gulp.task('browserSync', function() {
  browserSync(config.browserSync);
});

