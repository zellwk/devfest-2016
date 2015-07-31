import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

// Import configs
import config from '../config';

let $ = plugins();

// Format Tests

// Note: Task requires Ruby & scss-lint installed onto your system
// Untested
gulp.task('scsslint', () => {
  return gulp.src(config.scsslint.src)
  .pipe($.scssLint({
    customReports: $.scssLintStylish,
    endless: true,
  }))
});

// TODO: JShint
// gulp.task('jshint', ()=> {
//   return gulp.src('src/js/main.js')
//   .pipe($.jshint())
// });

// TODO: JSCS
