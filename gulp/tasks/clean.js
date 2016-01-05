import gulp from 'gulp';
import config from '../config';
import del from 'del';
import plugins from 'gulp-load-plugins';

let $ = plugins();

gulp.task('clean', () => {
  return del.sync([config.dest + '/**/*']);
});

// Clear cache
gulp.task('clean:cc', cb => {
  return $.cache.clearAll(cb);
})

// Partial clean (doesn't remove images)
// gulp.task('clean', (cb) => {
//   del([
//       config.dest + '/**/*',
//       '!' + config.dest + '/images',
//       '!' + config.dest + '/images/**/*'
//     ],
//     cb
//   )
// })