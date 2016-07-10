/* globals $ */
import svg4everybody from 'svg4everybody'
require('./mobile-menu')
require('./desktop-menu')
require('./nav-fixer')
require('./scrollspy-devfest')
require('./hash-scroll')
require('./form')
// Polyfill for external SVG spritesheets
svg4everybody()

$(window).resize(function (event) {
  console.log($(window).width())
})
