let $ = require('jquery')

if ($('.jsNavTrigger').length) {
  let $jsCanvas = $('.jsCanvas')
  $('.jsNavTrigger').click(e => {
    e.preventDefault()
    e.stopPropagation()
    $jsCanvas.toggleClass('show-off-canvas')
    $jsCanvas.on('click', closeOffCanvas)
  })

  // Prevents bubbling. Ensures off canvas doesn't close when anything within is clicked on
  $('.jsOffCanvas').click(e => {
    e.stopPropagation()
  })
}

function closeOffCanvas (e) {
  let $jsCanvas = $('.jsCanvas')
  $jsCanvas.click(e => {
    $(e.currentTarget).removeClass('show-off-canvas')
  })
  $jsCanvas.off('click', closeOffCanvas)
}
