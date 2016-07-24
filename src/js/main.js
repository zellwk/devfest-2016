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

// $(window).resize(function (event) {
// console.log($(window).width())
// })

if ($('.jsShowMore').length) {
  let $showMore = $('.jsShowMore')
  $showMore.each((index, el) => {
    let $el = $(el)
    let fullText = $el.html()
    let shortenedText
    let maxLength = 400
    $el.attr('full-text', fullText)

    if (fullText.length > 400) {
      shortenedText = fullText.substr(0, maxLength)
      shortenedText = shortenedText.substr(0, Math.min(shortenedText.length, shortenedText.lastIndexOf(' ')))
      shortenedText += '... <a href="#" class="jsSeeMoreLink"> See More </a>'
      $el.html(shortenedText)
    }
  })

  function showFullText (e) {
    e.preventDefault()
    let $target = $(e.target)
    let $container = $(e.target).closest('.jsShowMore')
    let fullText = $container.attr('full-text')
    $container.html(fullText)
    $target.off('click', showFullText)
  }

  $('.jsSeeMoreLink').on('click', showFullText)

}

