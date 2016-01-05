import minimist from 'minimist';
var path = require('path');
var webpack = require('webpack');
var BowerWebpackPlugin = require('bower-webpack-plugin');

let processArgs = minimist(process.argv);

let env = 'dev';
let src = './src';
let dev = './dev';
let dist = './dist';
let dest = dev;

// Sets env and dest for production environments
if (processArgs.prod || processArgs.production) {
  env = 'prod';
  dest = dist;
}

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
    // browser: 'google chrome',
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

  webpack: {
    src: src + '/js/main.js',
    dest: dest + '/js',
    options: {
      watch: env === 'prod' ? false : true,
      output: {
        filename: '[name].js',
        pathinfo: true
      },
      resolve: {
        root: './src/bower_components/',
        // alias: {
        //   'TweenLite': 'gsap/src/uncompressed/TweenLite'
        // }
      },

      // TODO: Webpack sourcemaps
      devtool: 'source-map',
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          // Remove babel-runtime for production sites
          query: env !== 'prod' ? {
              optional: ['runtime'],
              stage: 0
            } : {},
        }],
        plugins: [new BowerWebpackPlugin()]
        // TODO: Explore Common Chunks plugin for optimization        
      }
    }
  },

  useref: {
    src: dist + '/**/*.html',
    dest: dist,
    manifest: dist,
    opts: {
      searchPath: env === 'prod' ? dist : src,
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
