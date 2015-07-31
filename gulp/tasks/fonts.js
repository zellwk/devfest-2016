import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

// Import configs
import config from '../config';

let $ = plugins();

gulp.task('fonts', ()=> {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest))
});

