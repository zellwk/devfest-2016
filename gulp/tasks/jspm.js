import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import merge from 'merge-stream';
import Builder from 'systemjs-builder';
import through from 'through2';
import config from '../config';
import jspm from 'jspm';
import del from 'del';

let $ = plugins();

let jsDest = config.env === 'prod' ? './js' : './dev/js';
let jspmPackageDest = config.env === 'prod' ? './dist/jspm_packages' : './dev/jspm_packages';
let jspmConfigDest = config.env === 'prod' ? './dist' : './dev';

gulp.task('jspm', () => {

  let jsStream = gulp.src('./src/js/**/*.js')
    .pipe($.newer(jsDest))
    .pipe(gulp.dest(jsDest));

  let packagesStream = gulp.src('./jspm_packages/**/*')
    .pipe($.newer(jspmPackageDest))
    .pipe(gulp.dest(jspmPackageDest));

  let configStream = gulp.src('./jspm.config.js')
    .pipe(gulp.dest(jspmConfigDest))

  return merge(jsStream, packagesStream, configStream);
});

gulp.task('jspmBuild', ['jspm'], ()=> {
  jspmBuild();
});

let builder = new Builder();

function jspmBuild() {
  let stream = through.obj((file, enc, cb) => {
    cb(null, file);
  });

  builder.loadConfig('./jspm.config.js')
    .then(() => {
      return builder.build('js/main.js', 'dist/js/main.js', {
        runtime: false,
        minify: true,
        sourceMaps: true,
      });
    })
    .then(()=> {
      jspmClean(jsDest);
    })
    .catch((err) => {
      console.log('build error');
      console.log(err);
    });

  builder.trace('./src/js/main.js').then(function(trace) {
    // builder.getDepCache(trace.tree);
    // console.log(Object.keys.toString());
  }).catch((err) => {
    // console.log(err.stack);
  });

  stream.end();
  stream.emit('end');

  return stream;
}

function jspmClean(path) {
  del([path]);
}
