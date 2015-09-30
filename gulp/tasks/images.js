import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

// Import configs
import config from '../config';

let $ = plugins();

// TODO: Redo images task
gulp.task('images', () => {
  return gulp.src(config.images.src)
  .pipe(gulp.dest(config.images.dest))
  .pipe($.if(config.env === 'prod', $.imagemin(config.images.opts)))
  .pipe($.size({'title': 'images'}))
  .pipe(gulp.dest(config.images.dest));  
});
