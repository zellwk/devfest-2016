import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

function customPlumber(errTitle, message) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || "Error running Gulp",
      message: message || "Error: <%= error.message %>",
    })
  });

  // if !ci, return this. Else, return plumber
}

module.exports = customPlumber;
