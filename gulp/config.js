import minimist from 'minimist';

let processArgs = minimist(process.argv);

let env = 'dev';
let src = './src';
let dev = './dev';
let dist = './dev';

// Sets env and dist for production environments
if (processArgs.prod || processArgs.production) {
  env = 'prod';
  dist = './dist';
}

var config = {
  env: env,
  src: src,
  dest: dist,

  autoprefixer: {
    browsers: ['last 2 versions'],
  },

  blog: {
    articlesPerPage: 5,
    blogDir: 'blog',
    globalData: './data/_data.json',
    markdownOptions: {
      smartypants: true,
      gfm: true,
      // Highlights code with highlight.js
      highlight: function(code) {
        return require('highlight.js').highlightAuto(code).value;
      }
    },
    postSrc: src + '/posts/*.{md,nj,nunjucks}',
    postDest: dist + '/blog',
    summaryMarker: '<!--more-->',
    pageSrc: src + '/pages/**/*.{nj,nunjucks}',
    pageDest: dist,
    watch: [
      src + '/templates/**/*',
      'data/_data.json'
    ]
  },

  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dist
    },
    // proxy: "yourlocal.dev"
    // browser: 'google chrome',
    open: false
  },

  fonts: {
    src: src + '/fonts/**/*',
    dest: dist + '/fonts'
  },

  images: {
    src: [
    src + '/images/**/*.{png,jpeg,jpg,gif}',
    '!' + src + '/images/sprites/*'
    ],
    dest: dist + '/images',
    opts: {
      interlaced: true,
      optimizationLevel: 5,
      progressive: true
    }
  },

  jspm: {
    src: src + '/js/main',
    dest: dist + '/js/main.min.js',
    watch: src + '/js/**/*.js',
    jspmConfigPath: './jspm.config.js'
  },

  sass: {
    src: src + '/scss/**/*.{scss,sass}',
    dest: dist + '/css',
    opts: {
      includePaths: [
        src + '/bower_components',
        './node_modules'
      ],
    }
  },

  scsslint: {
    src: [src + '/scss/**/*.scss',
    '!' + src + '/scss/_sprites.scss'
    ]
  },

  sprites: {
    src: src + '/images/sprites/*',
    dest: src + '/scss',
    opts: {
      padding: 2,
      imgName: 'sprites.png',
      retinaSrcFilter: src + '/images/sprites/*@2x.{png,jpg,jpeg}',
      retinaImgName: 'sprites@2x.png',
      cssName: '_sprites.scss',
      cssVarMap: function(sprite) {
        sprite.name = 'sprite-' + sprite.name;
      },
    }
  }
}

module.exports = config;
