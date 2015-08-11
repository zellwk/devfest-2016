import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import runSequence from 'run-sequence'
// Import configs
import config from '../config';

let $ = plugins();

// Not done yet
gulp.task('default', (cb) => {
  if (config.env === 'dev') {
    runSequence(
      ['clean', 'scsslint'], 
      ['sprites', 'jspm', 'images', 'fonts'], 
      ['sass', 'generateSite'],
      'browserSync',
      'watch', 
      cb);  
  } else if (config.env === 'prod' || config.env === 'production') {
    runSequence(
      ['clean', 'scsslint'], 
      ['jspm', 'sass', 'images', 'fonts'], 
      ['generateSite'],
      'useref',
      'critical',
      'browserSync',
      cb
      );
  }
}); 

// TODO: Add CSS regression test (later)
// TODO: Add Js unit tests (later)

// Prod: 
// TODO: gzip? (Check if Amazon requires g-zipping) 
// TODO: Deploy with rsync (later, when done with productino tasks)

// Deploy to S3

let aws = {
  "key": "AKIAJ4YAB4SHRYAQGRMQ",
  "secret": "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",
  "bucket": "zellwk",
  "region": "us-east-1"
}

gulp.task('deploy', () => {
  gulp.src('./dist/**/*')
    .pipe($.s3(aws));
});

gulp.task('deploy-gh', () => {
  gulp.src('./dist/**/*')
  .pipe($.ghPages());
})