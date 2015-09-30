import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import critical from 'critical';
import config from '../config';
import lazypipe from 'lazypipe';
import through from 'through2';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

let $ = plugins();

let cssPipe = lazypipe()
.pipe($.uncss, {
  html: ['./dist/**/*.html'],
  ignore: [/.is-/, /.has-/, /.hljs-/],
})
.pipe($.minifyCss)

let jsPipe = lazypipe()
  .pipe($.uglify);

gulp.task('useref', () => {
  var assets = $.useref.assets();

  return gulp.src('./dist/**/*.html')
  .pipe(assets)
  .pipe($.cached('useref'))
  .pipe($.if('*.css', cssPipe()))
  .pipe($.if('*.js', jsPipe()))
  .pipe($.rev())
  .pipe(assets.restore())
  .pipe($.useref())
  .pipe($.revReplace())
  .pipe(gulp.dest('./dist'))
});

// gulp.task('critical', function() {
//   return gulp.src('./dist/**/*.html')
//   .pipe(crit())
// });

// function crit (options) {
//   return through.obj((file, enc, cb) => {

//     let filename = path.basename(file.path);
//     let dir = path.dirname(file.path);

//     let css = JSON.parse(fs.readFileSync('./dist/rev-manifest.json').toString())['css/styles.min.css'];

//     console.log(css);

//     critical.generate({
//       inline: true,
//       base: dir,
//       src: filename,
//       css: path.resolve(dir, css),
//       dest: path.resolve(dir, filename),
//       width: 320,
//       height: 480,
//       minify: true
//     });

//     cb(null, file);
//   });
// }
