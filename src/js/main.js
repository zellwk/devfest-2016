import _ from 'lodash';
import win from '../js/win';
import svg4everybody from 'svg4everybody';

// Polyfill for external SVG spritesheets
svg4everybody();

function add(num1, num2){
  return num1 + num2;
}

win();

module.exports = add;
