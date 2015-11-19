import gulp from 'gulp';
import critical from 'critical';
import fs from 'fs';

import config from '../config';

import plugins from 'gulp-load-plugins';
let $ = plugins();

// TODO: no need to critical if CSS hasn't changed.
gulp.task('critical', function() {
  return gulp.src(config.useref.src)
    .pipe(critical.stream({
      base: config.useref.dest,
      inline: true,
      minify: true,
      css: 'dist/' + JSON.parse(fs.readFileSync(config.useref.manifest + '/rev-manifest.json').toString())['css/styles.min.css'],
      dimensions: [{
        height: 480,
        width: 320
      }, {
        height: 760,
        width: 1024,
      }]
    }))
    .pipe($.debug({
      "title": "Critical"
    }))
    .pipe(gulp.dest(config.useref.dest));
});
