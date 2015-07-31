import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import critical from 'critical';
import config from '../config';

let $ = plugins();

// Optimizes with the help of useref. Not completed yet
gulp.task('useref', function() {
  var assets = $.useref.assets();

  return gulp.src()
  .pipe(assets)
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.css', $.uncss({
    html: [],
    ignore: [/.globals/, /.is-/, /.has-/],
  })))
  .pipe($.if('*.css', $.minifyCss()))
  .pipe($.if('*.css', $.csso()))
  // .pipe($.rev())
  .pipe(assets.restore())
  .pipe($.useref())
  // .pipe($.revReplace())
  .pipe($.size({
    title: 'html'
  }))
  .pipe(gulp.dest(config.dest))
});

gulp.task('copystyles', ['useref'], () => {
  return gulp.src(['dist/styles/main.css'])
  .pipe($.rename({
    basename: 'site' // site.css
  }))
  .pipe(gulp.dest('dist/styles'));
})

gulp.task('critical', ['build', 'copystyles'], function() {
  critical.generateInline({
    base: 'dist/',
    src: 'index.html',
    styleTarget: 'styles/main.css',
    htmlTarget: 'index.html',
    width: 320,
    height: 480,
    minify: true
  });
});
