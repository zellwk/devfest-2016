/* globals fetch FormValidator */
require('validate-js')
require('es6-promise').polyfill()
require('isomorphic-fetch')

let fields = [{
  name: 'name',
  rules: 'required',
  display: 'name'
}, {
  name: 'email',
  rules: 'required|valid_email',
  display: 'email'
}, {
  name: 'phone',
  rules: 'required|numeric',
  display: 'phone number'
}]

function validatorCallback (errors, evt) {
  evt.preventDefault()
  let t = evt.target
  let errorNodes = t.querySelectorAll('.jsFormError')
  const hidden = evt.target.querySelector('[name=hidden]')

  // prevent spam bot submission
  if (hidden.value) { return false }

  // reset error nodes
  errorNodes.forEach(el => el.innerHTML = '')
  if (errors.length) {
    Array.from(errors).forEach(err => {
      let parentNode = err.element.parentNode
      let errorNode = parentNode.querySelector('.jsFormError')
      errorNode.innerHTML = err.message
    })
  } else {
    let name = t.querySelector('[name=name]').value
    let email = t.querySelector('[name=email]').value
    let phone = t.querySelector('[name=phone]').value
    let action = t.getAttribute('data-action')
    let buy = t.getAttribute('data-buy')

    fetch(`https://cohort19x-api.herokuapp.com/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: encodeURIComponent(name),
        email: encodeURIComponent(email),
        phone: encodeURIComponent(phone),
        action: action,
        buy: buy
      })
    })
    .then(r => r.json)
    .then(d => {
      console.log('success')
      t.querySelector('.jsFormSuccess').classList.add('is-shown')
      t.removeChild(t.querySelector('.jsFormContent'))
    })
  }
}

const validator = new FormValidator('form', fields, validatorCallback)

validator.setMessage('required', 'Please fill in your %s.')
validator.setMessage('valid_email', 'Please fill in a valid %s.')
validator.setMessage('phone', 'Please fill in a valid %s., without spaces')
