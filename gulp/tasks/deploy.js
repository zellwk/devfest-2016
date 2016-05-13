const gulp = require('gulp')
const fs = require('fs')
const plugins = require('gulp-load-plugins')
var $ = plugins()

// const config
const config = require('../config')

// Deployment tasks
if (!process.env.CI) {
  var secrets = JSON.parse(fs.readFileSync('./secrets.json'))

  gulp.task('deploy', () => {
    var deployMethod = config.deploy.method
    gulp.start('deploy-' + deployMethod)
  })
}

gulp.task('deploy-rsync', () => {
  rsync({
    src: 'dist/',
    dest: secrets.rsync.dest,
    ssh: true,
    recursive: true,
    deleteAll: true

  }, function (error, stdout, stderr, cmd) {
    if (error) {
      console.log(error.message)
      console.log(stdout)
      console.log(stderr)
    }
  })
})

gulp.task('deploy-aws', () => {
  gulp.src('./dist/**/*')
    .pipe($.s3(secrets.aws))
})

gulp.task('deploy-ghpages', () => {
  gulp.src('./dist/**/*')
  .pipe($.ghPages())
})
