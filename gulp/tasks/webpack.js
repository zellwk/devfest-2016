import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import browserSync from 'browser-sync';
import notifier from 'node-notifier';

// Import configs
import config from '../config';
import plumber from '../custom_modules/plumber';

// Load gulp plugins
import plugins from 'gulp-load-plugins';
let $ = plugins();

gulp.task('webpack', function() {
  return gulp.src(config.webpack.src)
    .pipe(plumber('Error Running Webpack'))
    .pipe(webpackStream(config.webpack.options, webpack))
    .pipe(gulp.dest(config.webpack.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});
