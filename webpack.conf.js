import environment from './env';
import BowerWebpackPlugin from 'bower-webpack-plugin';

let env = environment.env;

module.exports = {
  options: {
    watch: env === 'prod' ? false : true,
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
