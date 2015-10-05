import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

// Import configs
import config from '../config';
import plumber from '../custom_modules/plumber';

let $ = plugins();

gulp.task('sass', () => {
  return gulp.src(config.sass.src)
    .pipe(plumber('Error Running Sass'))
    .pipe($.sourcemaps.init())
    .pipe($.sass(config.sass.opts))
    .pipe($.autoprefixer(config.autoprefixer))
    .pipe($.sourcemaps.write())
    .pipe($.size({'title': 'styles'}))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
})
