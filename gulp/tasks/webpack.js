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
    .pipe(webpackStream(config.webpack.options, webpack, (err, stats) => {
      if (stats.compilation.errors.length) {
        
        // Notifies if there are any errors
        notifier.notify({
          title: 'Webpack error',
          message: stats.compilation.errors[0].error,
          sound: 'Frog',
        });

        var errMsg = stats.compilation.errors[0];
        // Removes extra logs (because I was unable to get error message only)
        delete errMsg['name'];
        delete errMsg['dependencies'];
        delete errMsg['module'];
        delete errMsg['origin'];
        delete errMsg['DependenciesBlock'];
        delete errMsg['error'];

        // Logs Errors
        gutil.log(errMsg);
      }
    }))

    .pipe(gulp.dest(config.webpack.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});
