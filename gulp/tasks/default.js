import gulp from 'gulp';
import runSequence from 'run-sequence'
// Import configs
import config from '../config';

// Not done yet
gulp.task('default', (cb) => {
  if (config.env === 'dev') {
    runSequence(
      ['clean', 'scsslint'], 
      ['jspm', 'sass', 'images', 'fonts'], 
      ['generateSite'],
      ['browserSync'],
      'watch', 
      cb);  
  } else if (config.env === 'prod' || config.env === 'production') {
    // Production tasks not ready yet
  }
}); 

// TODO: Add CSS regression test (later)
// TODO: Add Js unit tests (later)

// TODO: Prod: 
// TODO: Optimize with useref + uncss, csso, critical 
// TODO: gzip? (Check if Amazon requires g-zipping) 
// TODO: Deploy with rsync (later, when done with productino tasks)
