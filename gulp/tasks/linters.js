import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

// Import configs
import config from '../config';

let $ = plugins();

// Format Tests

// Note: Task requires Ruby & scss-lint installed onto your system
// Note: Linters slow down the watch task. Hence, recommend to lint separately

gulp.task('scsslint', () => {
  return gulp.src(config.scsslint.src)
  .pipe($.scssLint({
    customReports: $.scssLintStylish,
    endless: false,
  }))
});

// TODO: JShint
// gulp.task('jshint', ()=> {
//   return gulp.src('src/js/main.js')
//   .pipe($.jshint())
// });

// TODO: JSCS
