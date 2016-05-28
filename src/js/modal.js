
let modal = document.querySelector('.jsModal')

if (modal) {
  let triggers = document.querySelectorAll('.jsModalTrigger')
  triggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      let cta = el.dataset.trigger
      let buy = el.dataset.buy
      activateModal(el, cta, buy)
    })
  })
}

function activateModal (el, cta, buy) {
  let buttons = modal.querySelectorAll('.btn')
  let form = modal.querySelector('form')

  modal.classList.add('is-shown')
  form.setAttribute('data-action', cta)
  form.setAttribute('data-buy', buy)
  buttons.forEach(btn => {
    if (btn.dataset.cta === cta) {
      btn.style.display = 'block'
    } else {
      btn.style.display = 'none'
    }
  })

  modal.querySelector('.Modal__content')
  .addEventListener('click', e => e.stopPropagation())

  modal.addEventListener('click', closeModal)
}

function closeModal () {
  modal.classList.remove('is-shown')
}
