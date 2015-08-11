import gutil from 'gulp-util';
import plumber from 'gulp-plumber';

function customPlumber() {
  return plumber({
    errorHandler: function(err) {
    gutil.log(gutil.colors.red(err.stack));
    this.emit('end');  
  }
  });
}

module.exports = customPlumber;
