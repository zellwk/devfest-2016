const minimist = require('minimist')
const processArgs = minimist(process.argv)

var src = './src'
var dest = './dev'
var env = 'dev'

if (processArgs.prod || processArgs.production) {
  dest = './dist'
  env = 'prod'
}

module.exports = {
  env: env,
  src: src,
  dest: dest
}
