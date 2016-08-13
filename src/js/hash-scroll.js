// Need to check this
let $ = require('jquery')

$(document).ready(function () {
  if (location.hash) {
    setTimeout(function () {
      hashChangeScroll()
    }, 800)
  }

  let links = document.querySelectorAll('a')
  Array.from(links).forEach(node => {
    node.addEventListener('click', e => {
      let match = /#.*-hash/
      if (e.target.hash.match(match)) {
        e.preventDefault()
        replaceHashAndScroll($(e.target))
      }
    })
  })

  function replaceHashAndScroll ($this) {
    let hash = $this.attr('href')
    let targetHash = hash.replace('-hash', '')

    if (history.pushState) {
      history.pushState(null, null, targetHash)
    } else {
      location.hash = targetHash
    }
    hashChangeScroll()
  }

  function hashChangeScroll () {
    let eventsHeaderHeight = $('.jsEventsHeader').outerHeight()

    // scrolls to hash location
    let curPos = $(window).scrollTop()
    let currHash = location.hash
    let targetHash = location.hash + '-hash'
    let $target = $(targetHash)
    let targetTop = parseInt($target.offset().top)

    let scroll = targetTop - eventsHeaderHeight
    $('html, body').animate({
      scrollTop: scroll
    }, 1500)
  }
})
