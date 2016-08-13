/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _svg4everybody = __webpack_require__(/*! svg4everybody */ 1);
	
	var _svg4everybody2 = _interopRequireDefault(_svg4everybody);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(/*! ./mobile-menu */ 2); /* globals $ */
	
	__webpack_require__(/*! ./desktop-menu */ 4);
	__webpack_require__(/*! ./nav-fixer */ 5);
	__webpack_require__(/*! ./scrollspy-devfest */ 6);
	__webpack_require__(/*! ./hash-scroll */ 7);
	__webpack_require__(/*! ./form */ 8);
	// Polyfill for external SVG spritesheets
	(0, _svg4everybody2.default)();
	
	// $(window).resize(function (event) {
	// console.log($(window).width())
	// })
	
	if ($('.jsShowMore').length) {
	  (function () {
	    var showFullText = function showFullText(e) {
	      e.preventDefault();
	      var $target = $(e.target);
	      var $container = $(e.target).closest('.jsShowMore');
	      var fullText = $container.attr('full-text');
	      $container.html(fullText);
	      $target.off('click', showFullText);
	    };
	
	    var $showMore = $('.jsShowMore');
	    $showMore.each(function (index, el) {
	      var $el = $(el);
	      var fullText = $el.html();
	      var shortenedText = void 0;
	      var maxLength = 400;
	      $el.attr('full-text', fullText);
	
	      if (fullText.length > 400) {
	        shortenedText = fullText.substr(0, maxLength);
	        shortenedText = shortenedText.substr(0, Math.min(shortenedText.length, shortenedText.lastIndexOf(' ')));
	        shortenedText += '... <a href="#" class="jsSeeMoreLink"> See More </a>';
	        $el.html(shortenedText);
	      }
	    });
	
	    $('.jsSeeMoreLink').on('click', showFullText);
	  })();
	}
	
	if ($('.jsFilterSearchBox').length && $('.jsFilteredItems').length) {
	  (function () {
	    var $allItems = $('.jsFilteredItem');
	
	    $('.jsFilterSearchBox').on('keyup', function (e) {
	      var searchTerm = e.target.value.toLowerCase();
	
	      $allItems.each(function (index, val) {
	        var filterAttribute = val.querySelector('.jsFilterAttribute').innerHTML.toLowerCase();
	
	        if (filterAttribute.indexOf(searchTerm) > -1) {
	          $(val).removeClass('is-hidden');
	        } else {
	          $(val).addClass('is-hidden');
	        }
	      });
	    });
	  })();
	}

/***/ },
/* 1 */
/*!***********************************************!*\
  !*** ./~/svg4everybody/dist/svg4everybody.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(root, factory) {
	     true ? // AMD. Register as an anonymous module unless amdModuleId is set
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        return root.svg4everybody = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == typeof exports ? module.exports = factory() : root.svg4everybody = factory();
	}(this, function() {
	    /*! svg4everybody v2.0.3 | github.com/jonathantneal/svg4everybody */
	    function embed(svg, target) {
	        // if the target exists
	        if (target) {
	            // create a document fragment to hold the contents of the target
	            var fragment = document.createDocumentFragment(), viewBox = !svg.getAttribute("viewBox") && target.getAttribute("viewBox");
	            // conditionally set the viewBox on the svg
	            viewBox && svg.setAttribute("viewBox", viewBox);
	            // copy the contents of the clone into the fragment
	            for (// clone the target
	            var clone = target.cloneNode(!0); clone.childNodes.length; ) {
	                fragment.appendChild(clone.firstChild);
	            }
	            // append the fragment into the svg
	            svg.appendChild(fragment);
	        }
	    }
	    function loadreadystatechange(xhr) {
	        // listen to changes in the request
	        xhr.onreadystatechange = function() {
	            // if the request is ready
	            if (4 === xhr.readyState) {
	                // get the cached html document
	                var cachedDocument = xhr._cachedDocument;
	                // ensure the cached html document based on the xhr response
	                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
	                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
	                xhr._embeds.splice(0).map(function(item) {
	                    // get the cached target
	                    var target = xhr._cachedTarget[item.id];
	                    // ensure the cached target
	                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
	                    // embed the target into the svg
	                    embed(item.svg, target);
	                });
	            }
	        }, // test the ready state change immediately
	        xhr.onreadystatechange();
	    }
	    function svg4everybody(rawopts) {
	        function oninterval() {
	            // while the index exists in the live <use> collection
	            for (// get the cached <use> index
	            var index = 0; index < uses.length; ) {
	                // get the current <use>
	                var use = uses[index], svg = use.parentNode;
	                if (svg && /svg/i.test(svg.nodeName)) {
	                    var src = use.getAttribute("xlink:href");
	                    if (polyfill && (!opts.validate || opts.validate(src, svg, use))) {
	                        // remove the <use> element
	                        svg.removeChild(use);
	                        // parse the src and get the url and id
	                        var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
	                        // if the link is external
	                        if (url.length) {
	                            // get the cached xhr request
	                            var xhr = requests[url];
	                            // ensure the xhr request exists
	                            xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
	                            xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
	                            xhr._embeds.push({
	                                svg: svg,
	                                id: id
	                            }), // prepare the xhr ready state change event
	                            loadreadystatechange(xhr);
	                        } else {
	                            // embed the local id into the svg
	                            embed(svg, document.getElementById(id));
	                        }
	                    }
	                } else {
	                    // increase the index when the previous value was not "valid"
	                    ++index;
	                }
	            }
	            // continue the interval
	            requestAnimationFrame(oninterval, 67);
	        }
	        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
	        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
	        // create xhr requests object
	        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use");
	        // conditionally start the interval if the polyfill is active
	        polyfill && oninterval();
	    }
	    return svg4everybody;
	});

/***/ },
/* 2 */
/*!*******************************!*\
  !*** ./src/js/mobile-menu.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(/*! jquery */ 3);
	
	if ($('.jsNavTrigger').length) {
	  (function () {
	    var $jsCanvas = $('.jsCanvas');
	    $('.jsNavTrigger').click(function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      $jsCanvas.toggleClass('show-off-canvas');
	      $jsCanvas.on('click', closeOffCanvas);
	    });
	
	    // Prevents bubbling. Ensures off canvas doesn't close when anything within is clicked on
	    $('.jsOffCanvas').click(function (e) {
	      e.stopPropagation();
	    });
	  })();
	}
	
	function closeOffCanvas(e) {
	  var $jsCanvas = $('.jsCanvas');
	  $jsCanvas.click(function (e) {
	    $(e.currentTarget).removeClass('show-off-canvas');
	  });
	  $jsCanvas.off('click', closeOffCanvas);
	}

/***/ },
/* 3 */
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 4 */
/*!********************************!*\
  !*** ./src/js/desktop-menu.js ***!
  \********************************/
/***/ function(module, exports) {

	// let $jsDesktopNav = $('.jsDesktopNav')
	// if ($jsDesktopNav.length) {

	//   let eventsHeader
	//   let activationPos = $('.jsDesktopNav').offset().top
	//   $(window).on('scroll', e => {
	//     var $container = $(window)
	//     if ($container.scrollTop() > activationPos) {
	//       activateFixed($jsDesktopNav)
	//     } else {
	//       deactivateFixed($jsDesktopNav)
	//     }
	//   })
	// }

	// function activateFixed ($elem) {
	//   console.log('activating');
	//   $elem.addClass('is-fixed')
	// }

	// function deactivateFixed ($elem) {
	//   console.log('deactivating');
	//   $elem.removeClass('is-fixed')
	// }
	"use strict";

/***/ },
/* 5 */
/*!*****************************!*\
  !*** ./src/js/nav-fixer.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(/*! jquery */ 3);
	
	// Header
	$(window).ready(function () {
	  var $el = $('.jsFixedHeader');
	  var $clone = $('.jsFixedHeader').clone(true, true).removeClass('jsFixedHeader').addClass('jsFixedHeaderClone');
	
	  if (!$el.length) {
	    return;
	  }
	
	  var activationPos = $el.position().top;
	
	  $clone.css({
	    display: 'none',
	    position: 'absolute',
	    top: '0',
	    left: '0',
	    right: '0',
	    zIndex: '9999'
	  });
	
	  $el.after($clone);
	
	  function activateFixed() {
	    $clone.css({
	      'display': 'block',
	      'position': 'fixed'
	    });
	
	    if ($('.jsDesktopNav').length) {
	      $('.jsDesktopNav').addClass('is-fixed');
	    }
	  }
	
	  function deactivateFixed() {
	    $clone.css({
	      'display': 'none',
	      'position': 'absolute'
	    });
	
	    if ($('.jsDesktopNav').length) {
	      $('.jsDesktopNav').removeClass('is-fixed');
	    }
	  }
	
	  $(window).scroll(function (event) {
	    var $container = $(window);
	    if ($container.scrollTop() > activationPos) {
	      activateFixed();
	    } else {
	      deactivateFixed();
	    }
	  });
	});

/***/ },
/* 6 */
/*!*************************************!*\
  !*** ./src/js/scrollspy-devfest.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(/*! jquery */ 3);
	
	var ScrollSpy = function () {
	  'use strict';
	
	  function ScrollSpy(options) {
	    // enforces new
	    if (!(this instanceof ScrollSpy)) {
	      return new ScrollSpy(options);
	    }
	
	    var defaults = {
	      min: 0,
	      max: 0,
	      buffer: 0,
	      props: {
	        min: 0,
	        max: 0,
	        buffer: 0
	      },
	      mode: 'vertical',
	      namespace: 'scrollSpy',
	      container: window
	    };
	
	    this.options = $.extend({}, defaults, options);
	
	    // initializes other variables
	
	    this.oldPosition = {
	      top: 0,
	      left: 0
	    };
	
	    this.curPosition = {
	      top: 0,
	      left: 0
	    };
	
	    this.direction = 'down';
	    this.transition = 'none';
	
	    // constructor body
	    this.init();
	  }
	
	  ScrollSpy.prototype = {
	    constructor: ScrollSpy,
	
	    init: function init() {
	      var SS = this;
	      var o = this.options;
	
	      this.$el = o.$el;
	      this.$container = $(o.container);
	      this.mode = o.mode;
	      this.buffer = o.buffer;
	      this.leaves = 0;
	      this.enters = 0;
	      this.inside = false;
	
	      this.$container.on('scroll.' + o.namespace, function (event) {
	        event.preventDefault();
	        SS.scrollEvent();
	      });
	
	      // Hack for momentum scroll
	      // Problem: Scroll event fires only on end when momentum scrolling
	      // Possible solution: Timeout to check for page Offset
	      // (when between scroll start and scroll end). If Pos change, update.
	
	      this.$container.on('touchstart.' + o.namespace, function (event) {
	        // Cannot prevent default, otherwise cannot scroll
	        // event.preventDefault();
	
	        SS.intervalId = setInterval(function () {
	          SS.scrollEvent();
	        }, 3);
	      });
	
	      this.$container.on('touchend.' + o.namespace, function (event) {
	        if (SS.intervalId) {
	          console.log('TOUCHEND + clearing interval');
	          clearInterval(SS.intervalId);
	        }
	      });
	    },
	
	    scrollEvent: function scrollEvent() {
	      // Updates old position
	      var o = this.options;
	      var $el = this.$el;
	
	      this.oldPosition = this.curPosition;
	
	      var position = {
	        top: this.$container.scrollTop(),
	        left: this.$container.scrollLeft()
	      };
	
	      var xy = this.mode == 'vertical' ? position.top + this.buffer : position.left + this.buffer;
	
	      var max = o.max;
	      var min = o.min;
	      var oldDirection = this.direction;
	
	      // Updates new position
	      this.curPosition = position;
	
	      // Updates Direction
	      if (this.mode === 'vertical') {
	        this.direction = this.curPosition.top > this.oldPosition.top ? 'down' : 'up';
	      }
	
	      if (oldDirection != this.direction) {
	        this.onScrollDirectionChange();
	      }
	
	      if (max === 0) {
	        max = this.mode == 'vertical' ? $container.height() : $container.outerWidth() + $(element).outerWidth();
	      }
	
	      // if we have reached the minimum bound but are below the max ...
	      if (xy >= min && xy <= max) {
	        // Trigger enter event
	        if (!this.inside) {
	          this.inside = true;
	          this.enters++;
	
	          this.onEnter($el, position);
	        }
	
	        // Trigger Tick
	        $el.trigger('scrollTick', {
	          position: position,
	          inside: this.inside,
	          enters: this.enters,
	          leaves: this.leaves
	        });
	
	        this.onTick($el, position, this.inside, this.enters, this.leaves);
	      } else {
	        if (this.inside) {
	          this.inside = false;
	          this.leaves++;
	
	          this.onLeave($el, position);
	        }
	      }
	    },
	
	    onEnter: function onEnter($el, pos) {
	      this.status = 'enter';
	      this.options.$item.addClass('is-active');
	      this.removeTransition();
	      this.options.props.highlightComponent.addClass('is-active');
	    },
	
	    onLeave: function onLeave($el, pos) {
	      this.status = 'leave';
	      this.options.$item.removeClass('is-active');
	      this.removeTransition();
	      this.options.props.highlightComponent.removeClass('is-active');
	
	      if (this.direction === 'down') {
	        this.options.$item.css({
	          position: 'absolute',
	          top: 'auto',
	          bottom: '0'
	        });
	      } else {
	        this.options.$item.css({
	          position: 'absolute',
	          top: '0',
	          bottom: 'auto'
	        });
	      }
	    },
	
	    onTick: function onTick($el, pos, inside, enters, leaves) {
	      if (this.direction === 'down') {
	        this.options.$item.css({
	          position: 'fixed',
	          top: this.options.props.fixedTop,
	          bottom: 'auto'
	        });
	      } else {
	        this.options.$item.css({
	          position: 'fixed',
	          // top: this.options.props.fixedTop + this.options.props.buffer,
	          top: this.options.props.fixedTop
	        });
	      }
	    },
	
	    setTransition: function setTransition() {
	      var transition = 'top 0.25s ease-out';
	      if (this.transition === 'none') {
	        this.transition = transition;
	        this.options.$item.css({
	          'webkit-transition': transition,
	          'transition': transition
	        });
	      }
	    },
	
	    removeTransition: function removeTransition() {
	      var transition = 'none';
	      if (this.transition !== 'none') {
	        this.transition = 'none';
	        this.options.$item.css({
	          'webkit-transition': transition,
	          'transition': transition
	        });
	      }
	    },
	
	    onScrollDirectionChange: function onScrollDirectionChange() {
	      // this.setTransition();
	      // this.changeMinMax();
	    },
	
	    changeMinMax: function changeMinMax() {
	      var o = this.options;
	      o.min = o.props.min;
	      o.max = o.props.max;
	
	      this.options = o;
	    },
	
	    update: function update(props) {
	      this.options.props = $.extend({}, this.options.props, props);
	      this.changeMinMax();
	    }
	  };
	
	  return ScrollSpy;
	}();
	
	$(window).load(function () {
	  'use-strict';
	
	  var globalProps = getProps();
	
	  $('.jsScrollSpyContainer').each(function (index, el) {
	    var $el = $(el);
	    var props = calcScrollSpyProps(globalProps, $el);
	    var scrollSpyHighlight = $el.find('.jsScrollSpy').attr('data-scrollSpyHighlight');
	
	    props.highlightComponent = $('.jsScrollSpyHighlight').filter(function () {
	      return $(this).attr('data-scrollSpyHighlight') === scrollSpyHighlight;
	    });
	
	    el.scrollSpy = new ScrollSpy({
	      $el: $(el),
	      $item: $(el).find('.jsScrollSpy'),
	      container: window,
	      props: props,
	      min: props.min,
	      max: props.max
	    });
	  });
	
	  $(window).on('resize', function (event) {
	    var globalProps = getProps();
	
	    $('.jsScrollSpyContainer').each(function (index, el) {
	      var $el = $(el);
	      var props = calcScrollSpyProps(globalProps, $el);
	
	      el.scrollSpy.update(props);
	    });
	  });
	
	  function getProps() {
	    var o = {};
	    o.hiddenHeader = $('.c-site-header').outerHeight();
	    o.stickyHeadHeight = $('.jsEventsHeader').outerHeight();
	    o.extraPadding = parseInt($('.jsEventsHeader').css('margin-bottom')) || 0;
	    o.circleSize = $('.jsScrollSpy').outerHeight();
	    o.fixedTop = o.stickyHeadHeight + o.extraPadding;
	
	    return o;
	  }
	
	  function calcScrollSpyProps(globalProps, $el) {
	    var props = {};
	    props.height = parseInt($el.siblings('.l-events-container').outerHeight());
	    props.min = parseInt($el.offset().top) - globalProps.stickyHeadHeight - globalProps.extraPadding;
	    props.max = props.min + props.height - globalProps.circleSize;
	    props.buffer = globalProps.hiddenHeader;
	    props.fixedTop = globalProps.fixedTop;
	
	    return props;
	  }
	
	  function debounce(func, wait, immediate) {
	    var timeout;
	
	    return function () {
	      var context = this,
	          args = arguments;
	      var later = function later() {
	        timeout = null;
	        if (!immediate) func.apply(context, args);
	      };
	
	      var callNow = immediate && !timeout;
	      clearTimeout(timeout);
	      timeout = setTimeout(later, wait);
	      if (callNow) func.apply(context, args);
	    };
	  }
	});

/***/ },
/* 7 */
/*!*******************************!*\
  !*** ./src/js/hash-scroll.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Need to check this
	var $ = __webpack_require__(/*! jquery */ 3);
	
	$(document).ready(function () {
	  if (location.hash) {
	    setTimeout(function () {
	      hashChangeScroll();
	    }, 800);
	  }
	
	  var links = document.querySelectorAll('a');
	  Array.from(links).forEach(function (node) {
	    node.addEventListener('click', function (e) {
	      e.preventDefault();
	      var match = /#.*-hash/;
	      if (e.target.hash.match(match)) {
	        replaceHashAndScroll($(e.target));
	      }
	    });
	  });
	
	  function replaceHashAndScroll($this) {
	    var hash = $this.attr('href');
	    var targetHash = hash.replace('-hash', '');
	
	    if (history.pushState) {
	      history.pushState(null, null, targetHash);
	    } else {
	      location.hash = targetHash;
	    }
	    hashChangeScroll();
	  }
	
	  function hashChangeScroll() {
	    var eventsHeaderHeight = $('.jsEventsHeader').outerHeight();
	
	    // scrolls to hash location
	    var curPos = $(window).scrollTop();
	    var currHash = location.hash;
	    var targetHash = location.hash + '-hash';
	    var $target = $(targetHash);
	    var targetTop = parseInt($target.offset().top);
	
	    var scroll = targetTop - eventsHeaderHeight;
	    $('html, body').animate({
	      scrollTop: scroll
	    }, 1500);
	  }
	});

/***/ },
/* 8 */
/*!************************!*\
  !*** ./src/js/form.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Form submission
	var $ = __webpack_require__(/*! jquery */ 3);
	__webpack_require__(/*! ./jqueryform */ 9);
	
	$(document).ready(function () {
	  $('.subscribeForm').ajaxForm({
	    url: 'https://2014.cssconf.asia/addsubscriber.php',
	    dataType: 'html',
	    beforeSubmit: function beforeSubmit(fields, $form) {
	      var $spinner = $form.find('.spinner');
	      var $msg = $form.siblings('.msg');
	      var $text = $msg.find('span');
	      var $btn = $form.find('.btn');
	      var $padding = $btn.width() - $text.width();
	
	      // Resets text before submitting
	      var $btnHeight = $btn.outerHeight();
	      $btn.css('height', $btnHeight);
	      $btn.animate({
	        width: $padding
	      }, 400, 'swing');
	      $btn.find('.button-text').text('');
	      $spinner.show().addClass('play');
	    },
	    success: function success(r, status, response, context) {
	      var $form = $(context[0]);
	      var $spinner = $form.find('.spinner');
	      var $msg = $form.siblings('.msg');
	      var $text = $msg.find('span');
	
	      if (r.substr(0, 6) !== 'Thanks') {
	        console.log('No Thanks');
	        $text.text(r.substr(0, r.indexOf('<br/>')));
	      } else {
	        console.log('Thanks');
	        $spinner.removeClass('play');
	        $form.siblings('p').fadeOut(300);
	        $form.fadeOut('300', function () {
	          $text.text('Thanks. We\'ll keep you updated!');
	          $msg.fadeIn('300');
	        });
	
	        setTimeout(function () {
	          window.location.href = 'http://facebook.com/devfestasia';
	        }, 2000);
	      }
	    },
	    error: function error(r, status, response, context) {
	      var $form = $(context[0]);
	      var $spinner = $form.find('.spinner');
	      var $msg = $form.siblings('.msg');
	      var $text = $msg.find('span');
	
	      $spinner.removeClass('play');
	      $form.siblings('p').fadeOut(300);
	      $form.fadeOut('300', function () {
	        $text.text('Something went utterly wrong...');
	        $msg.fadeIn('300');
	      });
	    },
	    complete: function complete() {
	      console.log('complete');
	    }
	  });
	});

/***/ },
/* 9 */
/*!******************************!*\
  !*** ./src/js/jqueryform.js ***!
  \******************************/
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/* jshint ignore:start */
	// Hack to remove weird webpack.require error in console
	(function (a) {
	  function b(b) {
	    var c = b.data;if (!b.isDefaultPrevented()) {
	      b.preventDefault();a(this).ajaxSubmit(c);
	    }
	  }function c(b) {
	    var c = b.target,
	        d = a(c);if (!d.is(':submit,input:image')) {
	      var e = d.closest(':submit');if (e.length == 0) return;c = e[0];
	    }var f = this;f.clk = c;if (c.type == 'image') if (b.offsetX != undefined) {
	      f.clk_x = b.offsetX;f.clk_y = b.offsetY;
	    } else if (typeof a.fn.offset == 'function') {
	      var g = d.offset();f.clk_x = b.pageX - g.left;f.clk_y = b.pageY - g.top;
	    } else {
	      f.clk_x = b.pageX - c.offsetLeft;f.clk_y = b.pageY - c.offsetTop;
	    }setTimeout(function () {
	      f.clk = f.clk_x = f.clk_y = null;
	    }, 100);
	  }function d() {
	    if (!a.fn.ajaxSubmit.debug) return;var b = '[jquery.form] ' + Array.prototype.join.call(arguments, '');window.console && window.console.log ? window.console.log(b) : window.opera && window.opera.postError && window.opera.postError(b);
	  }a.fn.ajaxSubmit = function (b) {
	    function w(c) {
	      var d = new FormData();for (var e = 0; e < c.length; e++) {
	        if (c[e].type == 'file') continue;d.append(c[e].name, c[e].value);
	      }g.find('input:file:enabled').each(function () {
	        var b = a(this).attr('name'),
	            c = this.files;if (b) for (var e = 0; e < c.length; e++) {
	          d.append(b, c[e]);
	        }
	      });if (b.extraData) for (var f in b.extraData) {
	        d.append(f, b.extraData[f]);
	      }b.data = null;var h = a.extend(!0, {}, a.ajaxSettings, b, { contentType: !1, processData: !1, cache: !1, type: 'POST' });h.data = null;var i = h.beforeSend;h.beforeSend = function (a, c) {
	        c.data = d;a.upload && (a.upload.onprogress = function (a) {
	          c.progress(a.position, a.total);
	        });i && i.call(c, a, b);
	      };a.ajax(h);
	    }function x(e) {
	      function w(a) {
	        var b = a.contentWindow ? a.contentWindow.document : a.contentDocument ? a.contentDocument : a.document;return b;
	      }function z() {
	        function h() {
	          try {
	            var a = w(n).readyState;d('state = ' + a);a.toLowerCase() == 'uninitialized' && setTimeout(h, 50);
	          } catch (b) {
	            d('Server abort: ', b, ' (', b.name, ')');E(v);s && clearTimeout(s);s = undefined;
	          }
	        }var b = g.attr('target'),
	            e = g.attr('action');f.setAttribute('target', l);c || f.setAttribute('method', 'POST');e != j.url && f.setAttribute('action', j.url);!j.skipEncodingOverride && (!c || /post/i.test(c)) && g.attr({ encoding: 'multipart/form-data', enctype: 'multipart/form-data' });j.timeout && (s = setTimeout(function () {
	          r = !0;E(u);
	        }, j.timeout));var i = [];try {
	          if (j.extraData) for (var k in j.extraData) {
	            i.push(a('<input type="hidden" name="' + k + '">').attr('value', j.extraData[k]).appendTo(f)[0]);
	          }if (!j.iframeTarget) {
	            m.appendTo('body');n.attachEvent ? n.attachEvent('onload', E) : n.addEventListener('load', E, !1);
	          }setTimeout(h, 15);f.submit();
	        } finally {
	          f.setAttribute('action', e);b ? f.setAttribute('target', b) : g.removeAttr('target');a(i).remove();
	        }
	      }function E(b) {
	        if (o.aborted || D) return;try {
	          B = w(n);
	        } catch (c) {
	          d('cannot access response document: ', c);b = v;
	        }if (b === u && o) {
	          o.abort('timeout');return;
	        }if (b == v && o) {
	          o.abort('server abort');return;
	        }if (!B || B.location.href == j.iframeSrc) if (!r) return;n.detachEvent ? n.detachEvent('onload', E) : n.removeEventListener('load', E, !1);var e = 'success',
	            f;try {
	          if (r) throw 'timeout';var g = j.dataType == 'xml' || B.XMLDocument || a.isXMLDoc(B);d('isXml=' + g);if (!g && window.opera && (B.body == null || B.body.innerHTML == '') && --C) {
	            d('requeing onLoad callback, DOM not available');setTimeout(E, 250);return;
	          }var h = B.body ? B.body : B.documentElement;o.responseText = h ? h.innerHTML : null;o.responseXML = B.XMLDocument ? B.XMLDocument : B;g && (j.dataType = 'xml');o.getResponseHeader = function (a) {
	            var b = { 'content-type': j.dataType };return b[a];
	          };if (h) {
	            o.status = Number(h.getAttribute('status')) || o.status;o.statusText = h.getAttribute('statusText') || o.statusText;
	          }var i = (j.dataType || '').toLowerCase(),
	              l = /(json|script|text)/.test(i);if (l || j.textarea) {
	            var p = B.getElementsByTagName('textarea')[0];if (p) {
	              o.responseText = p.value;o.status = Number(p.getAttribute('status')) || o.status;o.statusText = p.getAttribute('statusText') || o.statusText;
	            } else if (l) {
	              var q = B.getElementsByTagName('pre')[0],
	                  t = B.getElementsByTagName('body')[0];q ? o.responseText = q.textContent ? q.textContent : q.innerText : t && (o.responseText = t.textContent ? t.textContent : t.innerText);
	            }
	          } else i == 'xml' && !o.responseXML && o.responseText != null && (o.responseXML = F(o.responseText));try {
	            A = H(o, i, j);
	          } catch (b) {
	            e = 'parsererror';o.error = f = b || e;
	          }
	        } catch (b) {
	          d('error caught: ', b);e = 'error';o.error = f = b || e;
	        }if (o.aborted) {
	          d('upload aborted');e = null;
	        }o.status && (e = o.status >= 200 && o.status < 300 || o.status === 304 ? 'success' : 'error');if (e === 'success') {
	          j.success && j.success.call(j.context, A, 'success', o);k && a.event.trigger('ajaxSuccess', [o, j]);
	        } else if (e) {
	          f == undefined && (f = o.statusText);j.error && j.error.call(j.context, o, e, f);k && a.event.trigger('ajaxError', [o, j, f]);
	        }k && a.event.trigger('ajaxComplete', [o, j]);k && ! --a.active && a.event.trigger('ajaxStop');j.complete && j.complete.call(j.context, o, e);D = !0;j.timeout && clearTimeout(s);setTimeout(function () {
	          j.iframeTarget || m.remove();o.responseXML = null;
	        }, 100);
	      }var f = g[0],
	          h,
	          i,
	          j,
	          k,
	          l,
	          m,
	          n,
	          o,
	          p,
	          q,
	          r,
	          s,
	          t = !!a.fn.prop;if (e) if (t) for (i = 0; i < e.length; i++) {
	        h = a(f[e[i].name]);h.prop('disabled', !1);
	      } else for (i = 0; i < e.length; i++) {
	        h = a(f[e[i].name]);h.removeAttr('disabled');
	      }if (a(':input[name=submit],:input[id=submit]', f).length) {
	        alert('Error: Form elements must not have name or id of "submit".');return;
	      }j = a.extend(!0, {}, a.ajaxSettings, b);j.context = j.context || j;l = 'jqFormIO' + new Date().getTime();if (j.iframeTarget) {
	        m = a(j.iframeTarget);q = m.attr('name');q == null ? m.attr('name', l) : l = q;
	      } else {
	        m = a('<iframe name="' + l + '" src="' + j.iframeSrc + '" />');m.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
	      }n = m[0];o = { aborted: 0, responseText: null, responseXML: null, status: 0, statusText: 'n/a', getAllResponseHeaders: function getAllResponseHeaders() {}, getResponseHeader: function getResponseHeader() {}, setRequestHeader: function setRequestHeader() {}, abort: function abort(b) {
	          var c = b === 'timeout' ? 'timeout' : 'aborted';d('aborting upload... ' + c);this.aborted = 1;m.attr('src', j.iframeSrc);o.error = c;j.error && j.error.call(j.context, o, c, b);k && a.event.trigger('ajaxError', [o, j, c]);j.complete && j.complete.call(j.context, o, c);
	        } };k = j.global;k && ! a.active++ && a.event.trigger('ajaxStart');k && a.event.trigger('ajaxSend', [o, j]);if (j.beforeSend && j.beforeSend.call(j.context, o, j) === !1) {
	        j.global && a.active--;return;
	      }if (o.aborted) return;p = f.clk;if (p) {
	        q = p.name;if (q && !p.disabled) {
	          j.extraData = j.extraData || {};j.extraData[q] = p.value;if (p.type == 'image') {
	            j.extraData[q + '.x'] = f.clk_x;j.extraData[q + '.y'] = f.clk_y;
	          }
	        }
	      }var u = 1,
	          v = 2,
	          x = a('meta[name=csrf-token]').attr('content'),
	          y = a('meta[name=csrf-param]').attr('content');if (y && x) {
	        j.extraData = j.extraData || {};j.extraData[y] = x;
	      }j.forceSync ? z() : setTimeout(z, 10);var A,
	          B,
	          C = 50,
	          D,
	          F = a.parseXML || function (a, b) {
	        if (window.ActiveXObject) {
	          b = new ActiveXObject('Microsoft.XMLDOM');b.async = 'false';b.loadXML(a);
	        } else b = new DOMParser().parseFromString(a, 'text/xml');return b && b.documentElement && b.documentElement.nodeName != 'parsererror' ? b : null;
	      },
	          G = a.parseJSON || function (a) {
	        return window.eval('(' + a + ')');
	      },
	          H = function H(b, c, d) {
	        var e = b.getResponseHeader('content-type') || '',
	            f = c === 'xml' || !c && e.indexOf('xml') >= 0,
	            g = f ? b.responseXML : b.responseText;f && g.documentElement.nodeName === 'parsererror' && a.error && a.error('parsererror');d && d.dataFilter && (g = d.dataFilter(g, c));typeof g == 'string' && (c === 'json' || !c && e.indexOf('json') >= 0 ? g = G(g) : (c === 'script' || !c && e.indexOf('javascript') >= 0) && a.globalEval(g));return g;
	      };
	    }if (!this.length) {
	      d('ajaxSubmit: skipping submit process - no element selected');return this;
	    }var c,
	        e,
	        f,
	        g = this;typeof b == 'function' && (b = { success: b });c = this.attr('method');e = this.attr('action');f = typeof e == 'string' ? a.trim(e) : '';f = f || window.location.href || '';f && (f = (f.match(/^([^#]+)/) || [])[1]);b = a.extend(!0, { url: f, success: a.ajaxSettings.success, type: c || 'GET', iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank' }, b);var h = {};this.trigger('form-pre-serialize', [this, b, h]);if (h.veto) {
	      d('ajaxSubmit: submit vetoed via form-pre-serialize trigger');return this;
	    }if (b.beforeSerialize && b.beforeSerialize(this, b) === !1) {
	      d('ajaxSubmit: submit aborted via beforeSerialize callback');return this;
	    }var i = b.traditional;i === undefined && (i = a.ajaxSettings.traditional);var j,
	        k,
	        l,
	        m = this.formToArray(b.semantic);if (b.data) {
	      b.extraData = b.data;j = a.param(b.data, i);
	    }if (b.beforeSubmit && b.beforeSubmit(m, this, b) === !1) {
	      d('ajaxSubmit: submit aborted via beforeSubmit callback');return this;
	    }this.trigger('form-submit-validate', [m, this, b, h]);if (h.veto) {
	      d('ajaxSubmit: submit vetoed via form-submit-validate trigger');return this;
	    }var n = a.param(m, i);j && (n = n ? n + '&' + j : j);if (b.type.toUpperCase() == 'GET') {
	      b.url += (b.url.indexOf('?') >= 0 ? '&' : '?') + n;b.data = null;
	    } else b.data = n;var o = [];b.resetForm && o.push(function () {
	      g.resetForm();
	    });b.clearForm && o.push(function () {
	      g.clearForm(b.includeHidden);
	    });if (!b.dataType && b.target) {
	      var p = b.success || function () {};o.push(function (c) {
	        var d = b.replaceTarget ? 'replaceWith' : 'html';a(b.target)[d](c).each(p, arguments);
	      });
	    } else b.success && o.push(b.success);b.success = function (a, c, d) {
	      var e = b.context || b;for (var f = 0, h = o.length; f < h; f++) {
	        o[f].apply(e, [a, c, d || g, g]);
	      }
	    };var q = a('input:file:enabled[value]', this),
	        r = q.length > 0,
	        s = 'multipart/form-data',
	        t = g.attr('enctype') == s || g.attr('encoding') == s,
	        u = !!(r && q.get(0).files && window.FormData);d('fileAPI :' + u);var v = (r || t) && !u;if (b.iframe !== !1 && (b.iframe || v)) b.closeKeepAlive ? a.get(b.closeKeepAlive, function () {
	      x(m);
	    }) : x(m);else if ((r || t) && u) {
	      b.progress = b.progress || a.noop;w(m);
	    } else a.ajax(b);this.trigger('form-submit-notify', [this, b]);return this;
	  };a.fn.ajaxForm = function (e) {
	    e = e || {};e.delegation = e.delegation && a.isFunction(a.fn.on);if (!e.delegation && this.length === 0) {
	      var f = { s: this.selector, c: this.context };if (!a.isReady && f.s) {
	        d('DOM not ready, queuing ajaxForm');a(function () {
	          a(f.s, f.c).ajaxForm(e);
	        });return this;
	      }d('terminating; zero elements found by selector' + (a.isReady ? '' : ' (DOM not ready)'));return this;
	    }if (e.delegation) {
	      a(document).off('submit.form-plugin', this.selector, b).off('click.form-plugin', this.selector, c).on('submit.form-plugin', this.selector, e, b).on('click.form-plugin', this.selector, e, c);return this;
	    }return this.ajaxFormUnbind().bind('submit.form-plugin', e, b).bind('click.form-plugin', e, c);
	  };a.fn.ajaxFormUnbind = function () {
	    return this.unbind('submit.form-plugin click.form-plugin');
	  };a.fn.formToArray = function (b) {
	    var c = [];if (this.length === 0) return c;var d = this[0],
	        e = b ? d.getElementsByTagName('*') : d.elements;if (!e) return c;var f, g, h, i, j, k, l;for (f = 0, k = e.length; f < k; f++) {
	      j = e[f];h = j.name;if (!h) continue;if (b && d.clk && j.type == 'image') {
	        if (!j.disabled && d.clk == j) {
	          c.push({ name: h, value: a(j).val(), type: j.type });c.push({ name: h + '.x', value: d.clk_x }, { name: h + '.y', value: d.clk_y });
	        }continue;
	      }i = a.fieldValue(j, !0);if (i && i.constructor == Array) for (g = 0, l = i.length; g < l; g++) {
	        c.push({ name: h, value: i[g] });
	      } else i !== null && typeof i != 'undefined' && c.push({ name: h, value: i, type: j.type });
	    }if (!b && d.clk) {
	      var m = a(d.clk),
	          n = m[0];h = n.name;if (h && !n.disabled && n.type == 'image') {
	        c.push({ name: h, value: m.val() });c.push({ name: h + '.x', value: d.clk_x }, { name: h + '.y', value: d.clk_y });
	      }
	    }return c;
	  };a.fn.formSerialize = function (b) {
	    return a.param(this.formToArray(b));
	  };a.fn.fieldSerialize = function (b) {
	    var c = [];this.each(function () {
	      var d = this.name;if (!d) return;var e = a.fieldValue(this, b);if (e && e.constructor == Array) for (var f = 0, g = e.length; f < g; f++) {
	        c.push({ name: d, value: e[f] });
	      } else e !== null && typeof e != 'undefined' && c.push({ name: this.name, value: e });
	    });return a.param(c);
	  };a.fn.fieldValue = function (b) {
	    for (var c = [], d = 0, e = this.length; d < e; d++) {
	      var f = this[d],
	          g = a.fieldValue(f, b);if (g === null || typeof g == 'undefined' || g.constructor == Array && !g.length) continue;g.constructor == Array ? a.merge(c, g) : c.push(g);
	    }return c;
	  };a.fieldValue = function (b, c) {
	    var d = b.name,
	        e = b.type,
	        f = b.tagName.toLowerCase();c === undefined && (c = !0);if (c && (!d || b.disabled || e == 'reset' || e == 'button' || (e == 'checkbox' || e == 'radio') && !b.checked || (e == 'submit' || e == 'image') && b.form && b.form.clk != b || f == 'select' && b.selectedIndex == -1)) return null;if (f == 'select') {
	      var g = b.selectedIndex;if (g < 0) return null;var h = [],
	          i = b.options,
	          j = e == 'select-one',
	          k = j ? g + 1 : i.length;for (var l = j ? g : 0; l < k; l++) {
	        var m = i[l];if (m.selected) {
	          var n = m.value;n || (n = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value);if (j) return n;h.push(n);
	        }
	      }return h;
	    }return a(b).val();
	  };a.fn.clearForm = function (b) {
	    return this.each(function () {
	      a('input,select,textarea', this).clearFields(b);
	    });
	  };a.fn.clearFields = a.fn.clearInputs = function (a) {
	    var b = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function () {
	      var c = this.type,
	          d = this.tagName.toLowerCase();b.test(c) || d == 'textarea' || a && /hidden/.test(c) ? this.value = '' : c == 'checkbox' || c == 'radio' ? this.checked = !1 : d == 'select' && (this.selectedIndex = -1);
	    });
	  };a.fn.resetForm = function () {
	    return this.each(function () {
	      (typeof this.reset == 'function' || _typeof(this.reset) == 'object' && !this.reset.nodeType) && this.reset();
	    });
	  };a.fn.enable = function (a) {
	    a === undefined && (a = !0);return this.each(function () {
	      this.disabled = !a;
	    });
	  };a.fn.selected = function (b) {
	    b === undefined && (b = !0);return this.each(function () {
	      var c = this.type;if (c == 'checkbox' || c == 'radio') this.checked = b;else if (this.tagName.toLowerCase() == 'option') {
	        var d = a(this).parent('select');b && d[0] && d[0].type == 'select-one' && d.find('option').selected(!1);this.selected = b;
	      }
	    });
	  };a.fn.ajaxSubmit.debug = !1;
	})(jQuery);
	
	/* jshint ignore:end */

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map