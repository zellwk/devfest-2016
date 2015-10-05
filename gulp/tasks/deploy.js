import gulp from 'gulp';
import fs from 'fs';

// import config
import config from '../config';

import plugins from 'gulp-load-plugins';
let $ = plugins();

// Deployment tasks
if (!process.env.CI) {
  var secrets = JSON.parse(fs.readFileSync('./secrets.json'));

  gulp.task('deploy', () => {
    let deployMethod = config.deploy.method;
    console.log(deployMethod);
    gulp.start('deploy-' + deployMethod);
  })
}

gulp.task('deploy-rsync', function() {
    rsync({
      src: 'dist/',
      dest: secrets.rsync.dest,
      ssh: true,
      recursive: true,
      deleteAll: true

    }, function(error, stdout, stderr, cmd) {
      if (error) {
        console.log(error.message);
        console.log(stdout);
        console.log(stderr);
      }
    });
  });

  gulp.task('deploy-aws', () => {
    gulp.src('./dist/**/*')
      .pipe($.s3(secrets.aws));
  });

  gulp.task('deploy-ghpages', () => {
    gulp.src('./dist/**/*')
    .pipe($.ghPages());
  });