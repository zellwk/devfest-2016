const gulp = require('gulp')
const critical = require('critical')
const fs = require('fs')
const config = require('../config')
const plugins = require('gulp-load-plugins')
const $ = plugins()

// TODO: no need to critical if CSS hasn't changed.
gulp.task('critical', function () {
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
        width: 1024
      }]
    }))
    .pipe($.debug({
      'title': 'Critical'
    }))
    .pipe(gulp.dest(config.useref.dest))
})
