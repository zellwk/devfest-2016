let canvasTrigger = document.querySelector('.jsCanvasTrigger')

if (canvasTrigger) {
  let canvas = document.querySelector('.jsCanvas')

  canvasTrigger.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (canvas.classList.contains('is-shown')) {
      deactivateOffCanvas()
    } else {
      activateOffCanvas()
    }
  })
}

function activateOffCanvas () {
  let canvas = document.querySelector('.jsCanvas')
  let offCanvas = document.querySelector('.jsCanvasOff')
  canvas.classList.add('is-shown')
  offCanvas.addEventListener('click', e => e.stopPropagation())
  canvas.addEventListener('click', deactivateOffCanvas)
}

function deactivateOffCanvas () {
  document.querySelector('.jsCanvas').classList.remove('is-shown')
}
