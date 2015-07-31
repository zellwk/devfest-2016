import gulp from 'gulp';
import config from '../config';
import del from 'del';
import plugins from 'gulp-load-plugins';

let $ = plugins();

gulp.task('clean', (cb) => {
  del([
      config.dest + '/**/*',
      '!' + config.dest + '/images',
      '!' + config.dest + '/images/**/*'
    ],
    cb
  )
})

gulp.task('clean:cc', (cb) => {
  // console.log($.cached.caches);
  // $.cached.caches = {};
  del([config.dest], cb)
  // return cache.clearAll(callback);
})
