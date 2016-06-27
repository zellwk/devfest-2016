// Form submission
let $ = require('jquery')
require('./jqueryform')

$(document).ready(function () {
  $('.subscribeForm').ajaxForm({
    url: 'https://2014.cssconf.asia/addsubscriber.php',
    dataType: 'html',
    beforeSubmit: function (fields, $form) {
      let $spinner = $form.find('.spinner')
      let $msg = $form.siblings('.msg')
      let $text = $msg.find('span')
      let $btn = $form.find('.btn')
      let $padding = $btn.width() - $text.width()

      // Resets text before submitting
      let $btnHeight = $btn.outerHeight()
      $btn.css('height', $btnHeight)
      $btn.animate({
        width: $padding
      }, 400, 'swing')
      $btn.find('.button-text').text('')
      $spinner.show().addClass('play')
    },
    success: function (r, status, response, context) {
      let $form = $(context[0])
      let $spinner = $form.find('.spinner')
      let $msg = $form.siblings('.msg')
      let $text = $msg.find('span')

      if (r.substr(0, 6) !== 'Thanks') {
        console.log('No Thanks')
        $text.text(r.substr(0, r.indexOf('<br/>')))
      } else {
        console.log('Thanks')
        $spinner.removeClass('play')
        $form.siblings('p').fadeOut(300)
        $form.fadeOut('300', () => {
          $text.text('Thanks. We\'ll keep you updated!')
          $msg.fadeIn('300')
        })

        setTimeout(function () {
          window.location.href = 'http://facebook.com/devfestasia'
        }, 2000)
      }
    },
    error: function (r, status, response, context) {
      let $form = $(context[0])
      let $spinner = $form.find('.spinner')
      let $msg = $form.siblings('.msg')
      let $text = $msg.find('span')

      $spinner.removeClass('play')
      $form.siblings('p').fadeOut(300)
      $form.fadeOut('300', () => {
        $text.text('Something went utterly wrong...')
        $msg.fadeIn('300')
      })
    },
    complete: function () {
      console.log('complete')
    }
  })
})
