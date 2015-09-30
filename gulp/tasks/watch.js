import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence'
import config from '../config';

let reload = browserSync.reload;

// Watch for file changes 
gulp.task('watch', function() {
  // Watch assets
  gulp.watch(config.sass.src , ['sass', 'lint:scss']);
  gulp.watch(config.webpack.src, ['webpack']);

  // Watch site generators
  gulp.watch(config.blog.postSrc, ['site-watch']);
  gulp.watch(config.blog.pageSrc, ['site-watch']);
  gulp.watch(config.blog.watch, ['site-watch']);
}); 

// Slow watch tasks 
gulp.task('site-watch', ['generateSite'], reload);

