import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

// Import configs
import config from '../config';
let $ = plugins();

// Note: Task requires Ruby & scss-lint installed onto your system

gulp.task('lint:scss', () => {
  return gulp.src(config.scsslint.src)
  .pipe($.scssLint({
    customReports: $.scssLintStylish,
    endless: false,
  }));
});
