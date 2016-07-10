/* globals $ */
import svg4everybody from 'svg4everybody'
require('./nav-fixer')
require('./scrollspy-devfest')
require('./hash-scroll')
require('./form')
// Polyfill for external SVG spritesheets
svg4everybody()

let $ = require('jquery')

navDesktop()

$(window).resize(function (e) {
  navDesktop()
})

function navDesktop () {
  if ($('.jsNavDesktop').length) {
    let $nav = $('.jsNavDesktop')
    console.log($nav.position.top)
  }
}

$(window).resize(function (event) {
  console.log($(window).width())
})
