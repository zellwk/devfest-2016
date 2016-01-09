import minimist from 'minimist';
import webpackConfig from '../webpack.conf';
import environment from '../env';

let env = environment.env;
let src = environment.src;
let dest = environment.dest;

var config = {
  env: env,
  src: src,
  dest: dest,

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
    postDest: dest + '/blog',
    summaryMarker: '<!--more-->',
    pageSrc: src + '/pages/**/*.{nj,nunjucks}',
    pageDest: dest,
    watch: [
      src + '/templates/**/*',
      'data/**/*.json'
    ]
  },

  browserSync: {
    server: {
      baseDir: dest
    },
    host: 'localhost',
    port: 3000,
    open: false
  },

  deploy: {
    method: 'ghpages', // rsync, aws or ghpages
    // Deploys to anothe rgit repo
    // opts: {
    //   remoteUrl: 'git@github.com:zellwk/test-project.git',
    // }
  },

  fonts: {
    src: src + '/fonts/**/*',
    dest: dest + '/fonts'
  },

  images: {
    src: [
    src + '/images/**/*.{png,jpeg,jpg,gif}',
    '!' + src + '/images/sprites/*'
    ],
    dest: dest + '/images',
    opts: {
      interlaced: true,
      optimizationLevel: 5,
      progressive: true
    }
  },

  sass: {
    src: src + '/scss/**/*.{scss,sass}',
    dest: dest + '/css',
    opts: {
      includePaths: [
      src + '/bower_components',
      './node_modules'
      ],
    }
  },

  scsslint: {
    src: [src + '/scss/**/*.scss',
    // Don't lint SCSS files because it's generated
    '!' + src + '/scss/_sprites.scss'
    ]
  },

  sprites: {
    src: src + '/images/sprites/*',
    dest: src + '/scss',
    opts: {
      padding: 2,
      cssName: '_sprites.scss',
      imgName: 'sprites.png',
      imgPath: '../images/sprites.png',
      retinaSrcFilter: src + '/images/sprites/*@2x.{png,jpg,jpeg}',
      retinaImgName: 'sprites@2x.png',
      retinaImgPath: '../images/sprites@2x.png'
    }
  },

  webpack: Object.assign(webpackConfig, {
    src: src + '/js/main.js',
    dest: dest + '/js',
  }),

  useref: {
    src: dest + '/**/*.html',
    dest: dest,
    manifest: dest,
    opts: {
      searchPath: env === 'prod' ? dest : src,
    }
  },

  uncss: {
    ignore: [
      /.is-/,
      /.has-/,
      /.hljs-/
    ]
  }
};

module.exports = config;
