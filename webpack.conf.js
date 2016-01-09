var BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
  options: {
    watch: true,
    output: {
      filename: '[name].js',
      pathinfo: true
    },
    resolve: {
      root: './src/bower_components/',
      // Using aliases (if needed)
      // alias: { 'TweenLite': 'gsap/src/uncompressed/TweenLite' }
    },
    devtool: 'source-map',
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      }],
      plugins: [new BowerWebpackPlugin()]
    }
  }
};
