import gulp from 'gulp';
import lazypipe from 'lazypipe';
import plugins from 'gulp-load-plugins';

// Import configs
import config from '../config';

let $ = plugins();

// TODO: Enable caching for images task
gulp.task('images', () => {
  return gulp.src(config.images.src)
  .pipe($.if(config.env === 'prod', $.cache($.imagemin(config.images.opts))))
  .pipe(gulp.dest(config.images.dest))
  .pipe($.size({'title': 'images'}));
});
