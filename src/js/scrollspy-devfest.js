let $ = require('jquery')

var ScrollSpy = (function () {
  'use strict'

  function ScrollSpy (options) {
    // enforces new
    if (!(this instanceof ScrollSpy)) {
      return new ScrollSpy(options)
    }

    var defaults = {
      min: 0,
      max: 0,
      buffer: 0,
      props: {
        min: 0,
        max: 0,
        buffer: 0,
      },
      mode: 'vertical',
      namespace: 'scrollSpy',
      container: window,
    }

    this.options = $.extend({}, defaults, options)

    // initializes other variables

    this.oldPosition = {
      top: 0,
      left: 0
    }

    this.curPosition = {
      top: 0,
      left: 0
    }

    this.direction = 'down'
    this.transition = 'none'

    // constructor body
    this.init()
  }

  ScrollSpy.prototype = {
    constructor: ScrollSpy,

    init: function () {
      var SS = this
      var o = this.options

      this.$el = o.$el
      this.$container = $(o.container)
      this.mode = o.mode
      this.buffer = o.buffer
      this.leaves = 0
      this.enters = 0
      this.inside = false

      this.$container.on('scroll.' + o.namespace, function (event) {
        event.preventDefault()
        SS.scrollEvent()
      })

      this.$container.on('touchmove.' + o.namespace, function (event) {
        SS.scrollEvent()
      })
    },

    scrollEvent: function () {
      // Updates old position
      var o = this.options
      var $el = this.$el

      this.oldPosition = this.curPosition

      var position = {
        top: this.$container.scrollTop(),
        left: this.$container.scrollLeft()
      }

      var xy = (this.mode == 'vertical') ? position.top + this.buffer : position.left + this.buffer

      var max = o.max
      var min = o.min
      var oldDirection = this.direction

      // Updates new position
      this.curPosition = position

      // Updates Direction
      if (this.mode === 'vertical') {
        this.direction = (this.curPosition.top >= this.oldPosition.top ? 'down' : 'up')
      }

      if (oldDirection != this.direction) {
        this.onScrollDirectionChange()
      }

      if (max === 0) {
        max = (this.mode == 'vertical') ? $container.height() : $container.outerWidth() + $(element).outerWidth()
      }

      // if we have reached the minimum bound but are below the max ...
      if (xy >= min && xy <= max) {
        // Trigger enter event
        if (!this.inside) {
          this.inside = true
          this.enters++

          this.onEnter($el, position)
        }

        // Trigger Tick
        $el.trigger('scrollTick', {
          position: position,
          inside: this.inside,
          enters: this.enters,
          leaves: this.leaves
        })

        this.onTick($el, position, this.inside, this.enters, this.leaves)

      } else {
        if (this.inside) {
          this.inside = false
          this.leaves++

          this.onLeave($el, position)
        }
      }
    },

    onEnter: function ($el, pos) {
      this.status = 'enter'
      this.options.$item.addClass('is-active')
      this.removeTransition()
      this.options.props.highlightComponent.addClass('is-active')
    },

    onLeave: function ($el, pos) {
      this.status = 'leave'
      this.options.$item.removeClass('is-active')
      this.removeTransition()
      this.options.props.highlightComponent.removeClass('is-active')

      if (this.direction === 'down') {
        this.options.$item.css({
          position: 'absolute',
          top: 'auto',
          bottom: '0',
        })
      } else {
        this.options.$item.css({
          position: 'absolute',
          top: '0',
          bottom: 'auto',
        })
      }
    },

    onTick: function ($el, pos, inside, enters, leaves) {
      if (this.direction === 'down') {
        this.options.$item.css({
          position: 'fixed',
          top: this.options.props.fixedTop,
          bottom: 'auto',
        })
      } else {
        this.options.$item.css({
          position: 'fixed',
          // top: this.options.props.fixedTop + this.options.props.buffer,
          top: this.options.props.fixedTop
        })
      }
    },

    setTransition: function () {
      var transition = 'top 0.25s ease-out'
      if (this.transition === 'none') {
        this.transition = transition
        this.options.$item.css({
          'webkit-transition': transition,
          'transition': transition,
        })
      }
    },

    removeTransition: function () {
      var transition = 'none'
      if (this.transition !== 'none') {
        this.transition = 'none'
        this.options.$item.css({
          'webkit-transition': transition,
          'transition': transition,
        })
      }
    },

    onScrollDirectionChange: function () {
      // this.setTransition();
      // this.changeMinMax();
    },

    changeMinMax: function () {
      var o = this.options
      o.min = o.props.min
      o.max = o.props.max

      this.options = o
    },

    update: function (props) {
      this.options.props = $.extend({}, this.options.props, props)
      this.changeMinMax()
    }
  }

  return ScrollSpy
}())

$(window).load(function () {
  'use-strict'
  var globalProps = getProps()

  $('.jsScrollSpyContainer').each(function (index, el) {
    var $el = $(el)
    var props = calcScrollSpyProps(globalProps, $el)
    var scrollSpyHighlight = $el.find('.jsScrollSpy').attr('data-scrollSpyHighlight')

    props.highlightComponent = $('.jsScrollSpyHighlight').filter(function () {
      return $(this).attr('data-scrollSpyHighlight') === scrollSpyHighlight
    })

    el.scrollSpy = new ScrollSpy({
      $el: $(el),
      $item: $(el).find('.jsScrollSpy'),
      container: window,
      props: props,
      min: props.min,
      max: props.max,
    })
  })

  $(window).on('resize', function (event) {
    var globalProps = getProps()

    $('.jsScrollSpyContainer').each(function (index, el) {
      var $el = $(el)
      var props = calcScrollSpyProps(globalProps, $el)

      el.scrollSpy.update(props)
    })

  })

  function getProps () {
    var o = {}
    o.hiddenHeader = $('.c-site-header').outerHeight()
    o.stickyHeadHeight = $('.jsEventsHeader').outerHeight()
    o.extraPadding = parseInt($('.jsEventsHeader').css('margin-bottom')) || 0
    o.circleSize = $('.jsScrollSpy').outerHeight()
    o.fixedTop = o.stickyHeadHeight + o.extraPadding

    return o
  }

  function calcScrollSpyProps (globalProps, $el) {
    var props = {}
    props.height = parseInt($el.siblings('.l-events-container').outerHeight())
    props.min = parseInt($el.offset().top) - globalProps.stickyHeadHeight - globalProps.extraPadding
    props.max = props.min + props.height - globalProps.circleSize
    props.buffer = globalProps.hiddenHeader
    props.fixedTop = globalProps.fixedTop

    return props
  }

  function debounce (func, wait, immediate) {
    var timeout

    return function () {
      var context = this,
      args = arguments
      var later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }

      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }
})

