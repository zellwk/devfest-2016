import minimist from 'minimist';

let processArgs = minimist(process.argv);

let src = './src';
let dest = './dev';
let env = 'dev';

if (processArgs.prod || processArgs.production) {
  dest = './dist';
  env = 'prod'
}

module.exports = {
  env: env,
  src: src,
  dest: dest
}