import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

// Import configs
import config from '../config';
import plumber from '../custom_modules/plumber';

let $ = plugins();

gulp.task('lint:js', () => {
  return gulp.src('src/js/**/*.js')
  .pipe(plumber('Error Linting JS'))
  .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail', {
      ignoreWarning: true,
      ignoreInfo: true
    }))
    .pipe($.jscs({
      fix: true,
      configPath: '.jscsrc'
    }))
    .pipe(gulp.dest('src/js'))
});

