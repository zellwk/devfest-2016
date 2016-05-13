const gulp = require('gulp');
const config = require('../config')

gulp.task('cname', () => {
  return gulp.src('./src/CNAME')
    .pipe(gulp.dest(config.dest));
})