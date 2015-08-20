import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

// function customPlumber() {
//   return plumber({
//     errorHandler: function(err) {
//       gutil.log(gutil.colors.red(err.stack));
//       this.emit('end');  
//     }
//   });
// };

function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
      sound: false
    })
  });
}

module.exports = customPlumber;
