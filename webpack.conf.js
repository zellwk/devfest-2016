const environment = require('./env')
const BowerWebpackPlugin = require('bower-webpack-plugin')
const env = environment.env

module.exports = {
  options: {
    watch: env !== 'prod',
    output: {
      filename: '[name].js',
      pathinfo: true
    },
    resolve: {
      root: [
        './src/bower_components/'
      ],
      // Using aliases (if needed)
      alias: {
        'TweenLite': 'gsap/src/uncompressed/TweenLite' ,
        // 'TweenMax': 'gsap/src/minified/TweenMax',
        'ScrollTo': 'gsap/src/uncompressed/plugins/ScrollToPlugin'
      }
    },
    devtool: '#source-map',
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }, {
        test: /\.(nunj|nunjucks)$/,
        loader: 'nunjucks-loader'
      }],
      plugins: [new BowerWebpackPlugin()]
    }
  }
}
