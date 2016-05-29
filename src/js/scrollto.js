require('TweenLite')
require('ScrollTo')

let links = document.querySelectorAll('nav a')

links.forEach(link => {
  let hash = link.hash
  let targetHash = hash.replace('#', '')
  let target = document.getElementById(targetHash)

  if (target) {
    link.addEventListener('click', e => {
      e.preventDefault()
      let targetPos = target.getBoundingClientRect().top
      TweenLite.to(window, 1, {scrollTo: {y: targetPos}, ease: Power2.easeOut})
    })
  }
})

