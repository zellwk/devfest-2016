/* globals $ */
import svg4everybody from 'svg4everybody'
require('./nav-fixer')
require('./scrollspy-devfest')
require('./hash-scroll')
require('./form')
// Polyfill for external SVG spritesheets
svg4everybody()

let $ = require('jquery')

$(window).resize(function (event) {
  console.log($(window).width())
})
