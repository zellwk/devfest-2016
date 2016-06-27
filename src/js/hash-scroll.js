// Need to check this
let $ = require('jquery')

$(document).ready(function () {
  if (location.hash) {
    setTimeout(function () {
      hashChangeScroll()
    }, 800)
  }

  $('.jsEventsNav').on('click', 'a', function (event) {
    event.preventDefault()
    replaceHashAndScroll($(this))
  })

  function replaceHashAndScroll ($this) {
    var hash = $this.attr('href')
    var targetHash = hash.replace('-hash', '')

    if (history.pushState) {
      history.pushState(null, null, targetHash)
    } else {
      location.hash = targetHash
    }
    hashChangeScroll()
  }

  function hashChangeScroll () {
    var eventsHeaderHeight = $('.jsEventsHeader').outerHeight()

    // scrolls to hash location
    var curPos = $(window).scrollTop()
    var currHash = location.hash
    var targetHash = location.hash + '-hash'
    var $target = $(targetHash)
    var targetTop = parseInt($target.offset().top)

    console.log(targetTop - eventsHeaderHeight);
    var scroll = targetTop - eventsHeaderHeight
    $('html').animate({
      scrollTop: scroll
    }, 1500)
  }
})
