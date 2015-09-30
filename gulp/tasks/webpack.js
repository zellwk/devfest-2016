import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import browserSync from 'browser-sync';

// Import configs
import config from '../config';
import plumber from '../custom_modules/plumber';

// Load gulp plugins
import plugins from 'gulp-load-plugins';
let $ = plugins();

// TODO: Webpack Sourcemaps 
// TODO: Setup React Hot Loader with Browsersync + webpack
gulp.task('webpack', function() {
  return gulp.src(config.webpack.src)
    .pipe(webpackStream(config.webpack.options, webpack))
    .pipe(gulp.dest(config.webpack.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
})
