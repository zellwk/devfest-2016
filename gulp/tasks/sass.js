import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import spritesmith from 'gulp.spritesmith';
import browserSync from 'browser-sync';
import merge from 'merge-stream';

// Import configs
import config from '../config';

let $ = plugins();

// CSS Sprites 
gulp.task('sprites', () => {
  let spriteData = gulp.src(config.sprites.src)
    .pipe($.spritesmith(config.sprites.opts))

  // Runs images through imagemin for production 
  let imgStream = spriteData.img
    .pipe($.if(config.env === 'prod', $.imagemin(config.images.opts)))
    .pipe(gulp.dest(config.images.dest));
 
  // Creates sprites CSS in the same location as Sass dest
  let cssStream = spriteData.css
    .pipe(gulp.dest(config.sprites.dest));
 
  // Return a merged stream to handle both `end` events 
  return merge(imgStream, cssStream);
})

gulp.task('sass', ['sprites'], () => {
  return gulp.src(config.sass.src)
    .pipe($.sourcemaps.init())
    .pipe($.sass(config.sass.opts).on('error', $.sass.logError))
    .pipe($.autoprefixer(config.autoprefixer))
    .pipe($.sourcemaps.write())
    .pipe($.size({'title': 'styles'}))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
})
