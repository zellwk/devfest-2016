import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import through from 'through2';
// Import configs
import config from '../config';
import plumber from '../custom_modules/plumber';

let $ = plugins();

// Format Tests

// Note: Task requires Ruby & scss-lint installed onto your system
// Note: Linters slow down the watch task. Hence, recommend to lint separately

gulp.task('lint:scss', () => {
  return gulp.src(config.scsslint.src)
  .pipe($.scssLint({
    customReports: $.scssLintStylish,
    endless: false,
  }));
});

gulp.task('lint:js', () => {
  return gulp.src('src/js/**/*.js')
  .pipe(plumber('Error Linting JS'))
  .pipe($.jshint())
    // .pipe($.jshint.reporter('default'));
    .pipe($.jshint.reporter('jshint-stylish'))
    // .pipe($.jshint.reporter('fail', {
    //   ignoreWarning: true,
    //   ignoreInfo: true
    // }))

    .pipe($.jscs({
      fix: true,
      configPath: '.jscsrc'
    }))
    .pipe(gulp.dest('src/js'))
});

