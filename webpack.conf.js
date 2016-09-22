const environment = require('./env')
const BowerWebpackPlugin = require('bower-webpack-plugin')
const env = environment.env
const webpack = require('webpack')

module.exports = {
  options: {
    watch: env !== 'prod',
    output: {
      filename: '[name].js',
      pathinfo: true
    },
    resolve: {
      root: [
        './src/bower_components/',
        ''
      ],
      alias: {
        'jquery': 'jquery/dist/jquery'
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
      }, {
        test: /\.(json)$/,
        loader: 'json-loader'
      }],
      plugins: [
        new BowerWebpackPlugin(),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        })
      ]
    },
    externals: {
      jquery: 'jQuery'
    }
  }
}
