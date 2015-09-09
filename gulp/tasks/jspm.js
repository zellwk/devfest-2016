import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import merge from 'merge-stream';
import Builder from 'systemjs-builder';
import through from 'through2';
import config from '../config';
import jspm from 'jspm';

let $ = plugins();

let builder = new jspm.Builder();

global.System = Builder.loader;

gulp.task('jspm', () => {
  if (config.env !== 'prod') {
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
    jspmBuild();

    let jsStream = gulp.src('./src/js/**/*.js')
      .pipe($.newer('./dist/js'))
      .pipe(gulp.dest('./dist/js'));

    let packagesStream = gulp.src(['./jspm_packages/**/*', './jspm.config.js'])
      .pipe($.newer('./dist/jspm_packages'))
      .pipe(gulp.dest('./dist/jspm_packages'));

    let configStreama = gulp.src('./jspm.config.js')
      .pipe(gulp.dest('./dist'))
    return merge(jsStream, packagesStream);
  }
});

function jspmBuild() {
  let stream = through.obj((file, enc, cb) => {
    cb(null, file);
  });

  builder.loadConfig('./jspm.config.js')
    .then(() => {
      builder.config({
        baseURL: "./"
      });

      return builder.build(config.jspm.src, config.jspm.dest, {
        // runtime: false,
        // minify: true,
        sourceMaps: true,
      });
    })
    .catch((err) => {
      console.log('build error');
      console.log(err);
    });

  builder.trace('./src/js/main').then(function(trace) {
    // builder.getDepCache(trace.tree);
    console.log(Object.keys.toString());
  }).catch((err)=> {
    console.log(err.stack);
  });

  stream.end();
  stream.emit('end');

  return stream;
}
