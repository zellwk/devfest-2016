import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import merge from 'merge-stream';
import Builder from 'systemjs-builder';
import through from 'through2';
import config from '../config';

let $ = plugins();

let builder = new Builder();
global.System = Builder.loader;

gulp.task('jspm', () => {
  // TODO: Update JSPM Tasks for config
  // Not entirely happy with JSPM task now, but works
  if (config.env === 'dev') {
    let jsStream = gulp.src('./src/js/**/*.js')
    .pipe($.newer('./dev/js'))
    .pipe(gulp.dest('./dev/js'));

    let packagesStream = gulp.src(['./jspm_packages/**/*', './jspm.config.js'])
    .pipe($.newer('./dev/jspm_packages'))
    .pipe(gulp.dest('./dev/jspm_packages'));

    let configStreama = gulp.src('./jspm.config.js')
    .pipe(gulp.dest('./dev'))

    return merge(jsStream, packagesStream);

  } else {
    return jspmBuild()
  }
});

// Builds files with JSPM. Not entirely happy with this yet. 
// TODO: Depcache 
function jspmBuild() {
  let stream = through.obj((file, enc, cb) => {
    cb(null, file);
  });

  // builder.reset();
  builder.loadConfig('./jspm.config.js')
  .then(()=> {
    // Check with Guy bedford if we can change baseURL.
    // Otherwise, have to manually change jspm pkg baseURL from "/" to "./"
    // builder.config({
    //   baseURL: './',
    // });
    return builder.buildSFX(config.jspm.src, config.jspm.dest, {
      minify: true,
      sourceMaps: true,
      lowResSourceMaps: true,
    });
  })
  .catch((err) => {
    console.log('build error');
    console.log(err);
  });

  // builder.trace('./dev').then(function(trace) {
  //   console.log(trace);
  //   builder.getDepCache(trace.tree);
  // }).catch((err)=> {
  //   console.log(err);
  // });

  stream.end();
  stream.emit('end');

  return stream;
}
