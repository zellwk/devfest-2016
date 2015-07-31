import gulp from 'gulp';
import gutil from 'gulp-util';
import Builder from 'systemjs-builder';
import through from 'through2';
import config from '../config';

let builder = new Builder();
global.System = Builder.loader;

gulp.task('jspm', (cb) => {
  return jspmBuild()
})

// Builds files with JSPM. Not entirely happy with this yet. 
// Might decide to copy JSPM packages and config to /dev instead
function jspmBuild() {
  let stream = through.obj((file, enc, cb) => {
    cb(null, file);
  })

  // builder.reset();
  builder.loadConfig('./jspm.config.js')
  .then(()=> {

    if (config.env === 'dev') {
      return builder.buildSFX(config.jspm.src, config.jspm.dest, {
        sourceMaps: true
      })
    } else {
      return builder.buildSFX(config.jspm.src, config.jspm.dest, {
        minify: true,
        sourceMaps: true,
        lowResSourceMaps: true,
      })
    }
  })
  .catch((err) => {
    console.log('build error');
    console.log(err);
  })

  stream.end();
  stream.emit('end');

  return stream;
}
