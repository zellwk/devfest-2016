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
	__webpack_require__(/*! ./jobsroll */ 10);
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
	
	  $clone.css({
	    display: 'none',
	    position: 'absolute',
	    top: '0',
	    left: '0',
	    right: '0',
	    zIndex: '9999'
	  });
	
	  $el.after($clone);
	
	  $(window).resize(toggleClone);
	  $(window).scroll(toggleClone);
	
	  function toggleClone(event) {
	    var $container = $(window);
	    var activationPos = $el.position().top;
	    if ($container.scrollTop() > activationPos) {
	      activateFixed();
	    } else {
	      deactivateFixed();
	    }
	  }
	
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
	
	      this.$container.on('touchmove.' + o.namespace, function (event) {
	        SS.scrollEvent();
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
	        this.direction = this.curPosition.top >= this.oldPosition.top ? 'down' : 'up';
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
	      var match = /#.*-hash/;
	      if (e.target.hash.match(match)) {
	        e.preventDefault();
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

/***/ },
/* 10 */
/*!****************************!*\
  !*** ./src/js/jobsroll.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var tpl = __webpack_require__(/*! ../templates/partials/events/jobs-placement.nunjucks */ 11);
	var data = __webpack_require__(/*! ../../data/jobs.json */ 14);
	var shuffle = __webpack_require__(/*! shuffle-array */ 15);
	
	var jobPlacement = document.querySelector('.jsJobsPlacement');
	if (jobPlacement) {
	  var companies = data.jobs;
	  var jobs = companies.reduce(function (initial, curr) {
	    var newMap = curr.jobs.map(function (el) {
	      el.employer = curr.employer;
	      el.image = curr.image;
	      return el;
	    });
	    return initial.concat(newMap);
	  }, []);
	
	  var html = tpl.render({
	    jobs: shuffle(jobs)
	  });
	
	  jobPlacement.innerHTML = html;
	}

/***/ },
/* 11 */
/*!***************************************************************!*\
  !*** ./src/templates/partials/events/jobs-placement.nunjucks ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var nunjucks = __webpack_require__(/*! exports?nunjucks!nunjucks/browser/nunjucks-slim */ 12);
	var env;
	if (!nunjucks.currentEnv){
		env = nunjucks.currentEnv = new nunjucks.Environment([], { autoescape: true });
	} else {
		env = nunjucks.currentEnv;
	}
	var dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});
	
	
	
	
	var shim = __webpack_require__(/*! ./~/nunjucks-loader/runtime-shim */ 13);
	
	
	(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})["src/templates/partials/events/jobs-placement.nunjucks"] = (function() {
	function root(env, context, frame, runtime, cb) {
	var lineno = null;
	var colno = null;
	var output = "";
	try {
	var parentTemplate = null;
	frame = frame.push();
	var t_3 = runtime.contextOrFrameLookup(context, frame, "jobs");
	if(t_3) {var t_2 = t_3.length;
	for(var t_1=0; t_1 < t_3.length; t_1++) {
	var t_4 = t_3[t_1];
	frame.set("job", t_4);
	frame.set("loop.index", t_1 + 1);
	frame.set("loop.index0", t_1);
	frame.set("loop.revindex", t_2 - t_1);
	frame.set("loop.revindex0", t_2 - t_1 - 1);
	frame.set("loop.first", t_1 === 0);
	frame.set("loop.last", t_1 === t_2 - 1);
	frame.set("loop.length", t_2);
	output += "\n<div class=\"Interrupt-job l-event\">\n  <a href=\"";
	output += runtime.suppressValue(runtime.memberLookup((t_4),"url"), env.opts.autoescape);
	output += "\"><img src=\"";
	output += runtime.suppressValue(runtime.memberLookup((t_4),"image"), env.opts.autoescape);
	output += "\" alt=\"\"></a>\n  <p><strong>";
	output += runtime.suppressValue(runtime.memberLookup((t_4),"title"), env.opts.autoescape);
	output += "</strong></p>\n  <p>";
	output += runtime.suppressValue(runtime.memberLookup((t_4),"description"), env.opts.autoescape);
	output += "</p>\n</div>\n";
	;
	}
	}
	frame = frame.pop();
	if(parentTemplate) {
	parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
	} else {
	cb(null, output);
	}
	;
	} catch (e) {
	  cb(runtime.handleError(e, lineno, colno));
	}
	}
	return {
	root: root
	};
	
	})();
	})();
	
	
	
	module.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled["src/templates/partials/events/jobs-placement.nunjucks"] , dependencies)

/***/ },
/* 12 */
/*!*************************************************************************!*\
  !*** ./~/exports-loader?nunjucks!./~/nunjucks/browser/nunjucks-slim.js ***!
  \*************************************************************************/
/***/ function(module, exports) {

	/*! Browser bundle of nunjucks 2.4.2 (slim, only works with precompiled templates) */
	var nunjucks =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var lib = __webpack_require__(1);
		var env = __webpack_require__(2);
		var Loader = __webpack_require__(11);
		var loaders = __webpack_require__(3);
		var precompile = __webpack_require__(3);
	
		module.exports = {};
		module.exports.Environment = env.Environment;
		module.exports.Template = env.Template;
	
		module.exports.Loader = Loader;
		module.exports.FileSystemLoader = loaders.FileSystemLoader;
		module.exports.PrecompiledLoader = loaders.PrecompiledLoader;
		module.exports.WebLoader = loaders.WebLoader;
	
		module.exports.compiler = __webpack_require__(3);
		module.exports.parser = __webpack_require__(3);
		module.exports.lexer = __webpack_require__(3);
		module.exports.runtime = __webpack_require__(8);
		module.exports.lib = lib;
		module.exports.nodes = __webpack_require__(3);
	
		module.exports.installJinjaCompat = __webpack_require__(12);
	
		// A single instance of an environment, since this is so commonly used
	
		var e;
		module.exports.configure = function(templatesPath, opts) {
		    opts = opts || {};
		    if(lib.isObject(templatesPath)) {
		        opts = templatesPath;
		        templatesPath = null;
		    }
	
		    var TemplateLoader;
		    if(loaders.FileSystemLoader) {
		        TemplateLoader = new loaders.FileSystemLoader(templatesPath, {
		            watch: opts.watch,
		            noCache: opts.noCache
		        });
		    }
		    else if(loaders.WebLoader) {
		        TemplateLoader = new loaders.WebLoader(templatesPath, {
		            useCache: opts.web && opts.web.useCache,
		            async: opts.web && opts.web.async
		        });
		    }
	
		    e = new env.Environment(TemplateLoader, opts);
	
		    if(opts && opts.express) {
		        e.express(opts.express);
		    }
	
		    return e;
		};
	
		module.exports.compile = function(src, env, path, eagerCompile) {
		    if(!e) {
		        module.exports.configure();
		    }
		    return new module.exports.Template(src, env, path, eagerCompile);
		};
	
		module.exports.render = function(name, ctx, cb) {
		    if(!e) {
		        module.exports.configure();
		    }
	
		    return e.render(name, ctx, cb);
		};
	
		module.exports.renderString = function(src, ctx, cb) {
		    if(!e) {
		        module.exports.configure();
		    }
	
		    return e.renderString(src, ctx, cb);
		};
	
		if(precompile) {
		    module.exports.precompile = precompile.precompile;
		    module.exports.precompileString = precompile.precompileString;
		}
	
	
	/***/ },
	/* 1 */
	/***/ function(module, exports) {
	
		'use strict';
	
		var ArrayProto = Array.prototype;
		var ObjProto = Object.prototype;
	
		var escapeMap = {
		    '&': '&amp;',
		    '"': '&quot;',
		    '\'': '&#39;',
		    '<': '&lt;',
		    '>': '&gt;'
		};
	
		var escapeRegex = /[&"'<>]/g;
	
		var lookupEscape = function(ch) {
		    return escapeMap[ch];
		};
	
		var exports = module.exports = {};
	
		exports.prettifyError = function(path, withInternals, err) {
		    // jshint -W022
		    // http://jslinterrors.com/do-not-assign-to-the-exception-parameter
		    if (!err.Update) {
		        // not one of ours, cast it
		        err = new exports.TemplateError(err);
		    }
		    err.Update(path);
	
		    // Unless they marked the dev flag, show them a trace from here
		    if (!withInternals) {
		        var old = err;
		        err = new Error(old.message);
		        err.name = old.name;
		    }
	
		    return err;
		};
	
		exports.TemplateError = function(message, lineno, colno) {
		    var err = this;
	
		    if (message instanceof Error) { // for casting regular js errors
		        err = message;
		        message = message.name + ': ' + message.message;
	
		        try {
		            if(err.name = '') {}
		        }
		        catch(e) {
		            // If we can't set the name of the error object in this
		            // environment, don't use it
		            err = this;
		        }
		    } else {
		        if(Error.captureStackTrace) {
		            Error.captureStackTrace(err);
		        }
		    }
	
		    err.name = 'Template render error';
		    err.message = message;
		    err.lineno = lineno;
		    err.colno = colno;
		    err.firstUpdate = true;
	
		    err.Update = function(path) {
		        var message = '(' + (path || 'unknown path') + ')';
	
		        // only show lineno + colno next to path of template
		        // where error occurred
		        if (this.firstUpdate) {
		            if(this.lineno && this.colno) {
		                message += ' [Line ' + this.lineno + ', Column ' + this.colno + ']';
		            }
		            else if(this.lineno) {
		                message += ' [Line ' + this.lineno + ']';
		            }
		        }
	
		        message += '\n ';
		        if (this.firstUpdate) {
		            message += ' ';
		        }
	
		        this.message = message + (this.message || '');
		        this.firstUpdate = false;
		        return this;
		    };
	
		    return err;
		};
	
		exports.TemplateError.prototype = Error.prototype;
	
		exports.escape = function(val) {
		  return val.replace(escapeRegex, lookupEscape);
		};
	
		exports.isFunction = function(obj) {
		    return ObjProto.toString.call(obj) === '[object Function]';
		};
	
		exports.isArray = Array.isArray || function(obj) {
		    return ObjProto.toString.call(obj) === '[object Array]';
		};
	
		exports.isString = function(obj) {
		    return ObjProto.toString.call(obj) === '[object String]';
		};
	
		exports.isObject = function(obj) {
		    return ObjProto.toString.call(obj) === '[object Object]';
		};
	
		exports.groupBy = function(obj, val) {
		    var result = {};
		    var iterator = exports.isFunction(val) ? val : function(obj) { return obj[val]; };
		    for(var i=0; i<obj.length; i++) {
		        var value = obj[i];
		        var key = iterator(value, i);
		        (result[key] || (result[key] = [])).push(value);
		    }
		    return result;
		};
	
		exports.toArray = function(obj) {
		    return Array.prototype.slice.call(obj);
		};
	
		exports.without = function(array) {
		    var result = [];
		    if (!array) {
		        return result;
		    }
		    var index = -1,
		    length = array.length,
		    contains = exports.toArray(arguments).slice(1);
	
		    while(++index < length) {
		        if(exports.indexOf(contains, array[index]) === -1) {
		            result.push(array[index]);
		        }
		    }
		    return result;
		};
	
		exports.extend = function(obj, obj2) {
		    for(var k in obj2) {
		        obj[k] = obj2[k];
		    }
		    return obj;
		};
	
		exports.repeat = function(char_, n) {
		    var str = '';
		    for(var i=0; i<n; i++) {
		        str += char_;
		    }
		    return str;
		};
	
		exports.each = function(obj, func, context) {
		    if(obj == null) {
		        return;
		    }
	
		    if(ArrayProto.each && obj.each === ArrayProto.each) {
		        obj.forEach(func, context);
		    }
		    else if(obj.length === +obj.length) {
		        for(var i=0, l=obj.length; i<l; i++) {
		            func.call(context, obj[i], i, obj);
		        }
		    }
		};
	
		exports.map = function(obj, func) {
		    var results = [];
		    if(obj == null) {
		        return results;
		    }
	
		    if(ArrayProto.map && obj.map === ArrayProto.map) {
		        return obj.map(func);
		    }
	
		    for(var i=0; i<obj.length; i++) {
		        results[results.length] = func(obj[i], i);
		    }
	
		    if(obj.length === +obj.length) {
		        results.length = obj.length;
		    }
	
		    return results;
		};
	
		exports.asyncIter = function(arr, iter, cb) {
		    var i = -1;
	
		    function next() {
		        i++;
	
		        if(i < arr.length) {
		            iter(arr[i], i, next, cb);
		        }
		        else {
		            cb();
		        }
		    }
	
		    next();
		};
	
		exports.asyncFor = function(obj, iter, cb) {
		    var keys = exports.keys(obj);
		    var len = keys.length;
		    var i = -1;
	
		    function next() {
		        i++;
		        var k = keys[i];
	
		        if(i < len) {
		            iter(k, obj[k], i, len, next);
		        }
		        else {
		            cb();
		        }
		    }
	
		    next();
		};
	
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
		exports.indexOf = Array.prototype.indexOf ?
		    function (arr, searchElement, fromIndex) {
		        return Array.prototype.indexOf.call(arr, searchElement, fromIndex);
		    } :
		    function (arr, searchElement, fromIndex) {
		        var length = this.length >>> 0; // Hack to convert object.length to a UInt32
	
		        fromIndex = +fromIndex || 0;
	
		        if(Math.abs(fromIndex) === Infinity) {
		            fromIndex = 0;
		        }
	
		        if(fromIndex < 0) {
		            fromIndex += length;
		            if (fromIndex < 0) {
		                fromIndex = 0;
		            }
		        }
	
		        for(;fromIndex < length; fromIndex++) {
		            if (arr[fromIndex] === searchElement) {
		                return fromIndex;
		            }
		        }
	
		        return -1;
		    };
	
		if(!Array.prototype.map) {
		    Array.prototype.map = function() {
		        throw new Error('map is unimplemented for this js engine');
		    };
		}
	
		exports.keys = function(obj) {
		    if(Object.prototype.keys) {
		        return obj.keys();
		    }
		    else {
		        var keys = [];
		        for(var k in obj) {
		            if(obj.hasOwnProperty(k)) {
		                keys.push(k);
		            }
		        }
		        return keys;
		    }
		};
	
		exports.inOperator = function (key, val) {
		    if (exports.isArray(val)) {
		        return exports.indexOf(val, key) !== -1;
		    } else if (exports.isObject(val)) {
		        return key in val;
		    } else if (exports.isString(val)) {
		        return val.indexOf(key) !== -1;
		    } else {
		        throw new Error('Cannot use "in" operator to search for "'
		            + key + '" in unexpected types.');
		    }
		};
	
	
	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var path = __webpack_require__(3);
		var asap = __webpack_require__(4);
		var lib = __webpack_require__(1);
		var Obj = __webpack_require__(6);
		var compiler = __webpack_require__(3);
		var builtin_filters = __webpack_require__(7);
		var builtin_loaders = __webpack_require__(3);
		var runtime = __webpack_require__(8);
		var globals = __webpack_require__(9);
		var Frame = runtime.Frame;
		var Template;
	
		// Unconditionally load in this loader, even if no other ones are
		// included (possible in the slim browser build)
		builtin_loaders.PrecompiledLoader = __webpack_require__(10);
	
		// If the user is using the async API, *always* call it
		// asynchronously even if the template was synchronous.
		function callbackAsap(cb, err, res) {
		    asap(function() { cb(err, res); });
		}
	
		var Environment = Obj.extend({
		    init: function(loaders, opts) {
		        // The dev flag determines the trace that'll be shown on errors.
		        // If set to true, returns the full trace from the error point,
		        // otherwise will return trace starting from Template.render
		        // (the full trace from within nunjucks may confuse developers using
		        //  the library)
		        // defaults to false
		        opts = this.opts = opts || {};
		        this.opts.dev = !!opts.dev;
	
		        // The autoescape flag sets global autoescaping. If true,
		        // every string variable will be escaped by default.
		        // If false, strings can be manually escaped using the `escape` filter.
		        // defaults to true
		        this.opts.autoescape = opts.autoescape != null ? opts.autoescape : true;
	
		        // If true, this will make the system throw errors if trying
		        // to output a null or undefined value
		        this.opts.throwOnUndefined = !!opts.throwOnUndefined;
		        this.opts.trimBlocks = !!opts.trimBlocks;
		        this.opts.lstripBlocks = !!opts.lstripBlocks;
	
		        this.loaders = [];
	
		        if(!loaders) {
		            // The filesystem loader is only available server-side
		            if(builtin_loaders.FileSystemLoader) {
		                this.loaders = [new builtin_loaders.FileSystemLoader('views')];
		            }
		            else if(builtin_loaders.WebLoader) {
		                this.loaders = [new builtin_loaders.WebLoader('/views')];
		            }
		        }
		        else {
		            this.loaders = lib.isArray(loaders) ? loaders : [loaders];
		        }
	
		        // It's easy to use precompiled templates: just include them
		        // before you configure nunjucks and this will automatically
		        // pick it up and use it
		        if((true) && window.nunjucksPrecompiled) {
		            this.loaders.unshift(
		                new builtin_loaders.PrecompiledLoader(window.nunjucksPrecompiled)
		            );
		        }
	
		        this.initCache();
	
		        this.globals = globals();
		        this.filters = {};
		        this.asyncFilters = [];
		        this.extensions = {};
		        this.extensionsList = [];
	
		        for(var name in builtin_filters) {
		            this.addFilter(name, builtin_filters[name]);
		        }
		    },
	
		    initCache: function() {
		        // Caching and cache busting
		        lib.each(this.loaders, function(loader) {
		            loader.cache = {};
	
		            if(typeof loader.on === 'function') {
		                loader.on('update', function(template) {
		                    loader.cache[template] = null;
		                });
		            }
		        });
		    },
	
		    addExtension: function(name, extension) {
		        extension._name = name;
		        this.extensions[name] = extension;
		        this.extensionsList.push(extension);
		        return this;
		    },
	
		    removeExtension: function(name) {
		        var extension = this.getExtension(name);
		        if (!extension) return;
	
		        this.extensionsList = lib.without(this.extensionsList, extension);
		        delete this.extensions[name];
		    },
	
		    getExtension: function(name) {
		        return this.extensions[name];
		    },
	
		    hasExtension: function(name) {
		        return !!this.extensions[name];
		    },
	
		    addGlobal: function(name, value) {
		        this.globals[name] = value;
		        return this;
		    },
	
		    getGlobal: function(name) {
		        if(typeof this.globals[name] === 'undefined') {
		            throw new Error('global not found: ' + name);
		        }
		        return this.globals[name];
		    },
	
		    addFilter: function(name, func, async) {
		        var wrapped = func;
	
		        if(async) {
		            this.asyncFilters.push(name);
		        }
		        this.filters[name] = wrapped;
		        return this;
		    },
	
		    getFilter: function(name) {
		        if(!this.filters[name]) {
		            throw new Error('filter not found: ' + name);
		        }
		        return this.filters[name];
		    },
	
		    resolveTemplate: function(loader, parentName, filename) {
		        var isRelative = (loader.isRelative && parentName)? loader.isRelative(filename) : false;
		        return (isRelative && loader.resolve)? loader.resolve(parentName, filename) : filename;
		    },
	
		    getTemplate: function(name, eagerCompile, parentName, ignoreMissing, cb) {
		        var that = this;
		        var tmpl = null;
		        if(name && name.raw) {
		            // this fixes autoescape for templates referenced in symbols
		            name = name.raw;
		        }
	
		        if(lib.isFunction(parentName)) {
		            cb = parentName;
		            parentName = null;
		            eagerCompile = eagerCompile || false;
		        }
	
		        if(lib.isFunction(eagerCompile)) {
		            cb = eagerCompile;
		            eagerCompile = false;
		        }
	
		        if (name instanceof Template) {
		             tmpl = name;
		        }
		        else if(typeof name !== 'string') {
		            throw new Error('template names must be a string: ' + name);
		        }
		        else {
		            for (var i = 0; i < this.loaders.length; i++) {
		                var _name = this.resolveTemplate(this.loaders[i], parentName, name);
		                tmpl = this.loaders[i].cache[_name];
		                if (tmpl) break;
		            }
		        }
	
		        if(tmpl) {
		            if(eagerCompile) {
		                tmpl.compile();
		            }
	
		            if(cb) {
		                cb(null, tmpl);
		            }
		            else {
		                return tmpl;
		            }
		        } else {
		            var syncResult;
		            var _this = this;
	
		            var createTemplate = function(err, info) {
		                if(!info && !err) {
		                    if(!ignoreMissing) {
		                        err = new Error('template not found: ' + name);
		                    }
		                }
	
		                if (err) {
		                    if(cb) {
		                        cb(err);
		                    }
		                    else {
		                        throw err;
		                    }
		                }
		                else {
		                    var tmpl;
		                    if(info) {
		                        tmpl = new Template(info.src, _this,
		                                            info.path, eagerCompile);
	
		                        if(!info.noCache) {
		                            info.loader.cache[name] = tmpl;
		                        }
		                    }
		                    else {
		                        tmpl = new Template('', _this,
		                                            '', eagerCompile);
		                    }
	
		                    if(cb) {
		                        cb(null, tmpl);
		                    }
		                    else {
		                        syncResult = tmpl;
		                    }
		                }
		            };
	
		            lib.asyncIter(this.loaders, function(loader, i, next, done) {
		                function handle(err, src) {
		                    if(err) {
		                        done(err);
		                    }
		                    else if(src) {
		                        src.loader = loader;
		                        done(null, src);
		                    }
		                    else {
		                        next();
		                    }
		                }
	
		                // Resolve name relative to parentName
		                name = that.resolveTemplate(loader, parentName, name);
	
		                if(loader.async) {
		                    loader.getSource(name, handle);
		                }
		                else {
		                    handle(null, loader.getSource(name));
		                }
		            }, createTemplate);
	
		            return syncResult;
		        }
		    },
	
		    express: function(app) {
		        var env = this;
	
		        function NunjucksView(name, opts) {
		            this.name          = name;
		            this.path          = name;
		            this.defaultEngine = opts.defaultEngine;
		            this.ext           = path.extname(name);
		            if (!this.ext && !this.defaultEngine) throw new Error('No default engine was specified and no extension was provided.');
		            if (!this.ext) this.name += (this.ext = ('.' !== this.defaultEngine[0] ? '.' : '') + this.defaultEngine);
		        }
	
		        NunjucksView.prototype.render = function(opts, cb) {
		          env.render(this.name, opts, cb);
		        };
	
		        app.set('view', NunjucksView);
		        return this;
		    },
	
		    render: function(name, ctx, cb) {
		        if(lib.isFunction(ctx)) {
		            cb = ctx;
		            ctx = null;
		        }
	
		        // We support a synchronous API to make it easier to migrate
		        // existing code to async. This works because if you don't do
		        // anything async work, the whole thing is actually run
		        // synchronously.
		        var syncResult = null;
	
		        this.getTemplate(name, function(err, tmpl) {
		            if(err && cb) {
		                callbackAsap(cb, err);
		            }
		            else if(err) {
		                throw err;
		            }
		            else {
		                syncResult = tmpl.render(ctx, cb);
		            }
		        });
	
		        return syncResult;
		    },
	
		    renderString: function(src, ctx, opts, cb) {
		        if(lib.isFunction(opts)) {
		            cb = opts;
		            opts = {};
		        }
		        opts = opts || {};
	
		        var tmpl = new Template(src, this, opts.path);
		        return tmpl.render(ctx, cb);
		    }
		});
	
		var Context = Obj.extend({
		    init: function(ctx, blocks, env) {
		        // Has to be tied to an environment so we can tap into its globals.
		        this.env = env || new Environment();
	
		        // Make a duplicate of ctx
		        this.ctx = {};
		        for(var k in ctx) {
		            if(ctx.hasOwnProperty(k)) {
		                this.ctx[k] = ctx[k];
		            }
		        }
	
		        this.blocks = {};
		        this.exported = [];
	
		        for(var name in blocks) {
		            this.addBlock(name, blocks[name]);
		        }
		    },
	
		    lookup: function(name) {
		        // This is one of the most called functions, so optimize for
		        // the typical case where the name isn't in the globals
		        if(name in this.env.globals && !(name in this.ctx)) {
		            return this.env.globals[name];
		        }
		        else {
		            return this.ctx[name];
		        }
		    },
	
		    setVariable: function(name, val) {
		        this.ctx[name] = val;
		    },
	
		    getVariables: function() {
		        return this.ctx;
		    },
	
		    addBlock: function(name, block) {
		        this.blocks[name] = this.blocks[name] || [];
		        this.blocks[name].push(block);
		        return this;
		    },
	
		    getBlock: function(name) {
		        if(!this.blocks[name]) {
		            throw new Error('unknown block "' + name + '"');
		        }
	
		        return this.blocks[name][0];
		    },
	
		    getSuper: function(env, name, block, frame, runtime, cb) {
		        var idx = lib.indexOf(this.blocks[name] || [], block);
		        var blk = this.blocks[name][idx + 1];
		        var context = this;
	
		        if(idx === -1 || !blk) {
		            throw new Error('no super block available for "' + name + '"');
		        }
	
		        blk(env, context, frame, runtime, cb);
		    },
	
		    addExport: function(name) {
		        this.exported.push(name);
		    },
	
		    getExported: function() {
		        var exported = {};
		        for(var i=0; i<this.exported.length; i++) {
		            var name = this.exported[i];
		            exported[name] = this.ctx[name];
		        }
		        return exported;
		    }
		});
	
		Template = Obj.extend({
		    init: function (src, env, path, eagerCompile) {
		        this.env = env || new Environment();
	
		        if(lib.isObject(src)) {
		            switch(src.type) {
		            case 'code': this.tmplProps = src.obj; break;
		            case 'string': this.tmplStr = src.obj; break;
		            }
		        }
		        else if(lib.isString(src)) {
		            this.tmplStr = src;
		        }
		        else {
		            throw new Error('src must be a string or an object describing ' +
		                            'the source');
		        }
	
		        this.path = path;
	
		        if(eagerCompile) {
		            var _this = this;
		            try {
		                _this._compile();
		            }
		            catch(err) {
		                throw lib.prettifyError(this.path, this.env.opts.dev, err);
		            }
		        }
		        else {
		            this.compiled = false;
		        }
		    },
	
		    render: function(ctx, parentFrame, cb) {
		        if (typeof ctx === 'function') {
		            cb = ctx;
		            ctx = {};
		        }
		        else if (typeof parentFrame === 'function') {
		            cb = parentFrame;
		            parentFrame = null;
		        }
	
		        var forceAsync = true;
		        if(parentFrame) {
		            // If there is a frame, we are being called from internal
		            // code of another template, and the internal system
		            // depends on the sync/async nature of the parent template
		            // to be inherited, so force an async callback
		            forceAsync = false;
		        }
	
		        var _this = this;
		        // Catch compile errors for async rendering
		        try {
		            _this.compile();
		        } catch (_err) {
		            var err = lib.prettifyError(this.path, this.env.opts.dev, _err);
		            if (cb) return callbackAsap(cb, err);
		            else throw err;
		        }
	
		        var context = new Context(ctx || {}, _this.blocks, _this.env);
		        var frame = parentFrame ? parentFrame.push(true) : new Frame();
		        frame.topLevel = true;
		        var syncResult = null;
	
		        _this.rootRenderFunc(
		            _this.env,
		            context,
		            frame || new Frame(),
		            runtime,
		            function(err, res) {
		                if(err) {
		                    err = lib.prettifyError(_this.path, _this.env.opts.dev, err);
		                }
	
		                if(cb) {
		                    if(forceAsync) {
		                        callbackAsap(cb, err, res);
		                    }
		                    else {
		                        cb(err, res);
		                    }
		                }
		                else {
		                    if(err) { throw err; }
		                    syncResult = res;
		                }
		            }
		        );
	
		        return syncResult;
		    },
	
	
		    getExported: function(ctx, parentFrame, cb) {
		        if (typeof ctx === 'function') {
		            cb = ctx;
		            ctx = {};
		        }
	
		        if (typeof parentFrame === 'function') {
		            cb = parentFrame;
		            parentFrame = null;
		        }
	
		        // Catch compile errors for async rendering
		        try {
		            this.compile();
		        } catch (e) {
		            if (cb) return cb(e);
		            else throw e;
		        }
	
		        var frame = parentFrame ? parentFrame.push() : new Frame();
		        frame.topLevel = true;
	
		        // Run the rootRenderFunc to populate the context with exported vars
		        var context = new Context(ctx || {}, this.blocks, this.env);
		        this.rootRenderFunc(this.env,
		                            context,
		                            frame,
		                            runtime,
		                            function(err) {
		        		        if ( err ) {
		        			    cb(err, null);
		        		        } else {
		        			    cb(null, context.getExported());
		        		        }
		                            });
		    },
	
		    compile: function() {
		        if(!this.compiled) {
		            this._compile();
		        }
		    },
	
		    _compile: function() {
		        var props;
	
		        if(this.tmplProps) {
		            props = this.tmplProps;
		        }
		        else {
		            var source = compiler.compile(this.tmplStr,
		                                          this.env.asyncFilters,
		                                          this.env.extensionsList,
		                                          this.path,
		                                          this.env.opts);
	
		            /* jslint evil: true */
		            var func = new Function(source);
		            props = func();
		        }
	
		        this.blocks = this._getBlocks(props);
		        this.rootRenderFunc = props.root;
		        this.compiled = true;
		    },
	
		    _getBlocks: function(props) {
		        var blocks = {};
	
		        for(var k in props) {
		            if(k.slice(0, 2) === 'b_') {
		                blocks[k.slice(2)] = props[k];
		            }
		        }
	
		        return blocks;
		    }
		});
	
		module.exports = {
		    Environment: Environment,
		    Template: Template
		};
	
	
	/***/ },
	/* 3 */
	/***/ function(module, exports) {
	
		
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		// rawAsap provides everything we need except exception management.
		var rawAsap = __webpack_require__(5);
		// RawTasks are recycled to reduce GC churn.
		var freeTasks = [];
		// We queue errors to ensure they are thrown in right order (FIFO).
		// Array-as-queue is good enough here, since we are just dealing with exceptions.
		var pendingErrors = [];
		var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);
	
		function throwFirstError() {
		    if (pendingErrors.length) {
		        throw pendingErrors.shift();
		    }
		}
	
		/**
		 * Calls a task as soon as possible after returning, in its own event, with priority
		 * over other events like animation, reflow, and repaint. An error thrown from an
		 * event will not interrupt, nor even substantially slow down the processing of
		 * other events, but will be rather postponed to a lower priority event.
		 * @param {{call}} task A callable object, typically a function that takes no
		 * arguments.
		 */
		module.exports = asap;
		function asap(task) {
		    var rawTask;
		    if (freeTasks.length) {
		        rawTask = freeTasks.pop();
		    } else {
		        rawTask = new RawTask();
		    }
		    rawTask.task = task;
		    rawAsap(rawTask);
		}
	
		// We wrap tasks with recyclable task objects.  A task object implements
		// `call`, just like a function.
		function RawTask() {
		    this.task = null;
		}
	
		// The sole purpose of wrapping the task is to catch the exception and recycle
		// the task object after its single use.
		RawTask.prototype.call = function () {
		    try {
		        this.task.call();
		    } catch (error) {
		        if (asap.onerror) {
		            // This hook exists purely for testing purposes.
		            // Its name will be periodically randomized to break any code that
		            // depends on its existence.
		            asap.onerror(error);
		        } else {
		            // In a web browser, exceptions are not fatal. However, to avoid
		            // slowing down the queue of pending tasks, we rethrow the error in a
		            // lower priority turn.
		            pendingErrors.push(error);
		            requestErrorThrow();
		        }
		    } finally {
		        this.task = null;
		        freeTasks[freeTasks.length] = this;
		    }
		};
	
	
	/***/ },
	/* 5 */
	/***/ function(module, exports) {
	
		/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
		// Use the fastest means possible to execute a task in its own turn, with
		// priority over other events including IO, animation, reflow, and redraw
		// events in browsers.
		//
		// An exception thrown by a task will permanently interrupt the processing of
		// subsequent tasks. The higher level `asap` function ensures that if an
		// exception is thrown by a task, that the task queue will continue flushing as
		// soon as possible, but if you use `rawAsap` directly, you are responsible to
		// either ensure that no exceptions are thrown from your task, or to manually
		// call `rawAsap.requestFlush` if an exception is thrown.
		module.exports = rawAsap;
		function rawAsap(task) {
		    if (!queue.length) {
		        requestFlush();
		        flushing = true;
		    }
		    // Equivalent to push, but avoids a function call.
		    queue[queue.length] = task;
		}
	
		var queue = [];
		// Once a flush has been requested, no further calls to `requestFlush` are
		// necessary until the next `flush` completes.
		var flushing = false;
		// `requestFlush` is an implementation-specific method that attempts to kick
		// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
		// the event queue before yielding to the browser's own event loop.
		var requestFlush;
		// The position of the next task to execute in the task queue. This is
		// preserved between calls to `flush` so that it can be resumed if
		// a task throws an exception.
		var index = 0;
		// If a task schedules additional tasks recursively, the task queue can grow
		// unbounded. To prevent memory exhaustion, the task queue will periodically
		// truncate already-completed tasks.
		var capacity = 1024;
	
		// The flush function processes all tasks that have been scheduled with
		// `rawAsap` unless and until one of those tasks throws an exception.
		// If a task throws an exception, `flush` ensures that its state will remain
		// consistent and will resume where it left off when called again.
		// However, `flush` does not make any arrangements to be called again if an
		// exception is thrown.
		function flush() {
		    while (index < queue.length) {
		        var currentIndex = index;
		        // Advance the index before calling the task. This ensures that we will
		        // begin flushing on the next task the task throws an error.
		        index = index + 1;
		        queue[currentIndex].call();
		        // Prevent leaking memory for long chains of recursive calls to `asap`.
		        // If we call `asap` within tasks scheduled by `asap`, the queue will
		        // grow, but to avoid an O(n) walk for every task we execute, we don't
		        // shift tasks off the queue after they have been executed.
		        // Instead, we periodically shift 1024 tasks off the queue.
		        if (index > capacity) {
		            // Manually shift all values starting at the index back to the
		            // beginning of the queue.
		            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
		                queue[scan] = queue[scan + index];
		            }
		            queue.length -= index;
		            index = 0;
		        }
		    }
		    queue.length = 0;
		    index = 0;
		    flushing = false;
		}
	
		// `requestFlush` is implemented using a strategy based on data collected from
		// every available SauceLabs Selenium web driver worker at time of writing.
		// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593
	
		// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
		// have WebKitMutationObserver but not un-prefixed MutationObserver.
		// Must use `global` instead of `window` to work in both frames and web
		// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
		var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;
	
		// MutationObservers are desirable because they have high priority and work
		// reliably everywhere they are implemented.
		// They are implemented in all modern browsers.
		//
		// - Android 4-4.3
		// - Chrome 26-34
		// - Firefox 14-29
		// - Internet Explorer 11
		// - iPad Safari 6-7.1
		// - iPhone Safari 7-7.1
		// - Safari 6-7
		if (typeof BrowserMutationObserver === "function") {
		    requestFlush = makeRequestCallFromMutationObserver(flush);
	
		// MessageChannels are desirable because they give direct access to the HTML
		// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
		// 11-12, and in web workers in many engines.
		// Although message channels yield to any queued rendering and IO tasks, they
		// would be better than imposing the 4ms delay of timers.
		// However, they do not work reliably in Internet Explorer or Safari.
	
		// Internet Explorer 10 is the only browser that has setImmediate but does
		// not have MutationObservers.
		// Although setImmediate yields to the browser's renderer, it would be
		// preferrable to falling back to setTimeout since it does not have
		// the minimum 4ms penalty.
		// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
		// Desktop to a lesser extent) that renders both setImmediate and
		// MessageChannel useless for the purposes of ASAP.
		// https://github.com/kriskowal/q/issues/396
	
		// Timers are implemented universally.
		// We fall back to timers in workers in most engines, and in foreground
		// contexts in the following browsers.
		// However, note that even this simple case requires nuances to operate in a
		// broad spectrum of browsers.
		//
		// - Firefox 3-13
		// - Internet Explorer 6-9
		// - iPad Safari 4.3
		// - Lynx 2.8.7
		} else {
		    requestFlush = makeRequestCallFromTimer(flush);
		}
	
		// `requestFlush` requests that the high priority event queue be flushed as
		// soon as possible.
		// This is useful to prevent an error thrown in a task from stalling the event
		// queue if the exception handled by Node.js’s
		// `process.on("uncaughtException")` or by a domain.
		rawAsap.requestFlush = requestFlush;
	
		// To request a high priority event, we induce a mutation observer by toggling
		// the text of a text node between "1" and "-1".
		function makeRequestCallFromMutationObserver(callback) {
		    var toggle = 1;
		    var observer = new BrowserMutationObserver(callback);
		    var node = document.createTextNode("");
		    observer.observe(node, {characterData: true});
		    return function requestCall() {
		        toggle = -toggle;
		        node.data = toggle;
		    };
		}
	
		// The message channel technique was discovered by Malte Ubl and was the
		// original foundation for this library.
		// http://www.nonblocking.io/2011/06/windownexttick.html
	
		// Safari 6.0.5 (at least) intermittently fails to create message ports on a
		// page's first load. Thankfully, this version of Safari supports
		// MutationObservers, so we don't need to fall back in that case.
	
		// function makeRequestCallFromMessageChannel(callback) {
		//     var channel = new MessageChannel();
		//     channel.port1.onmessage = callback;
		//     return function requestCall() {
		//         channel.port2.postMessage(0);
		//     };
		// }
	
		// For reasons explained above, we are also unable to use `setImmediate`
		// under any circumstances.
		// Even if we were, there is another bug in Internet Explorer 10.
		// It is not sufficient to assign `setImmediate` to `requestFlush` because
		// `setImmediate` must be called *by name* and therefore must be wrapped in a
		// closure.
		// Never forget.
	
		// function makeRequestCallFromSetImmediate(callback) {
		//     return function requestCall() {
		//         setImmediate(callback);
		//     };
		// }
	
		// Safari 6.0 has a problem where timers will get lost while the user is
		// scrolling. This problem does not impact ASAP because Safari 6.0 supports
		// mutation observers, so that implementation is used instead.
		// However, if we ever elect to use timers in Safari, the prevalent work-around
		// is to add a scroll event listener that calls for a flush.
	
		// `setTimeout` does not call the passed callback if the delay is less than
		// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
		// even then.
	
		function makeRequestCallFromTimer(callback) {
		    return function requestCall() {
		        // We dispatch a timeout with a specified delay of 0 for engines that
		        // can reliably accommodate that request. This will usually be snapped
		        // to a 4 milisecond delay, but once we're flushing, there's no delay
		        // between events.
		        var timeoutHandle = setTimeout(handleTimer, 0);
		        // However, since this timer gets frequently dropped in Firefox
		        // workers, we enlist an interval handle that will try to fire
		        // an event 20 times per second until it succeeds.
		        var intervalHandle = setInterval(handleTimer, 50);
	
		        function handleTimer() {
		            // Whichever timer succeeds will cancel both timers and
		            // execute the callback.
		            clearTimeout(timeoutHandle);
		            clearInterval(intervalHandle);
		            callback();
		        }
		    };
		}
	
		// This is for `asap.js` only.
		// Its name will be periodically randomized to break any code that depends on
		// its existence.
		rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;
	
		// ASAP was originally a nextTick shim included in Q. This was factored out
		// into this ASAP package. It was later adapted to RSVP which made further
		// amendments. These decisions, particularly to marginalize MessageChannel and
		// to capture the MutationObserver implementation in a closure, were integrated
		// back into ASAP proper.
		// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js
	
		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
	
	/***/ },
	/* 6 */
	/***/ function(module, exports) {
	
		'use strict';
	
		// A simple class system, more documentation to come
	
		function extend(cls, name, props) {
		    // This does that same thing as Object.create, but with support for IE8
		    var F = function() {};
		    F.prototype = cls.prototype;
		    var prototype = new F();
	
		    // jshint undef: false
		    var fnTest = /xyz/.test(function(){ xyz; }) ? /\bparent\b/ : /.*/;
		    props = props || {};
	
		    for(var k in props) {
		        var src = props[k];
		        var parent = prototype[k];
	
		        if(typeof parent === 'function' &&
		           typeof src === 'function' &&
		           fnTest.test(src)) {
		            /*jshint -W083 */
		            prototype[k] = (function (src, parent) {
		                return function() {
		                    // Save the current parent method
		                    var tmp = this.parent;
	
		                    // Set parent to the previous method, call, and restore
		                    this.parent = parent;
		                    var res = src.apply(this, arguments);
		                    this.parent = tmp;
	
		                    return res;
		                };
		            })(src, parent);
		        }
		        else {
		            prototype[k] = src;
		        }
		    }
	
		    prototype.typename = name;
	
		    var new_cls = function() {
		        if(prototype.init) {
		            prototype.init.apply(this, arguments);
		        }
		    };
	
		    new_cls.prototype = prototype;
		    new_cls.prototype.constructor = new_cls;
	
		    new_cls.extend = function(name, props) {
		        if(typeof name === 'object') {
		            props = name;
		            name = 'anonymous';
		        }
		        return extend(new_cls, name, props);
		    };
	
		    return new_cls;
		}
	
		module.exports = extend(Object, 'Object', {});
	
	
	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var lib = __webpack_require__(1);
		var r = __webpack_require__(8);
	
		function normalize(value, defaultValue) {
		    if(value === null || value === undefined || value === false) {
		        return defaultValue;
		    }
		    return value;
		}
	
		var filters = {
		    abs: function(n) {
		        return Math.abs(n);
		    },
	
		    batch: function(arr, linecount, fill_with) {
		        var i;
		        var res = [];
		        var tmp = [];
	
		        for(i = 0; i < arr.length; i++) {
		            if(i % linecount === 0 && tmp.length) {
		                res.push(tmp);
		                tmp = [];
		            }
	
		            tmp.push(arr[i]);
		        }
	
		        if(tmp.length) {
		            if(fill_with) {
		                for(i = tmp.length; i < linecount; i++) {
		                    tmp.push(fill_with);
		                }
		            }
	
		            res.push(tmp);
		        }
	
		        return res;
		    },
	
		    capitalize: function(str) {
		        str = normalize(str, '');
		        var ret = str.toLowerCase();
		        return r.copySafeness(str, ret.charAt(0).toUpperCase() + ret.slice(1));
		    },
	
		    center: function(str, width) {
		        str = normalize(str, '');
		        width = width || 80;
	
		        if(str.length >= width) {
		            return str;
		        }
	
		        var spaces = width - str.length;
		        var pre = lib.repeat(' ', spaces/2 - spaces % 2);
		        var post = lib.repeat(' ', spaces/2);
		        return r.copySafeness(str, pre + str + post);
		    },
	
		    'default': function(val, def, bool) {
		        if(bool) {
		            return val ? val : def;
		        }
		        else {
		            return (val !== undefined) ? val : def;
		        }
		    },
	
		    dictsort: function(val, case_sensitive, by) {
		        if (!lib.isObject(val)) {
		            throw new lib.TemplateError('dictsort filter: val must be an object');
		        }
	
		        var array = [];
		        for (var k in val) {
		            // deliberately include properties from the object's prototype
		            array.push([k,val[k]]);
		        }
	
		        var si;
		        if (by === undefined || by === 'key') {
		            si = 0;
		        } else if (by === 'value') {
		            si = 1;
		        } else {
		            throw new lib.TemplateError(
		                'dictsort filter: You can only sort by either key or value');
		        }
	
		        array.sort(function(t1, t2) {
		            var a = t1[si];
		            var b = t2[si];
	
		            if (!case_sensitive) {
		                if (lib.isString(a)) {
		                    a = a.toUpperCase();
		                }
		                if (lib.isString(b)) {
		                    b = b.toUpperCase();
		                }
		            }
	
		            return a > b ? 1 : (a === b ? 0 : -1);
		        });
	
		        return array;
		    },
	
		    dump: function(obj) {
		        return JSON.stringify(obj);
		    },
	
		    escape: function(str) {
		        if(typeof str === 'string') {
		            return r.markSafe(lib.escape(str));
		        }
		        return str;
		    },
	
		    safe: function(str) {
		        return r.markSafe(str);
		    },
	
		    first: function(arr) {
		        return arr[0];
		    },
	
		    groupby: function(arr, attr) {
		        return lib.groupBy(arr, attr);
		    },
	
		    indent: function(str, width, indentfirst) {
		        str = normalize(str, '');
	
		        if (str === '') return '';
	
		        width = width || 4;
		        var res = '';
		        var lines = str.split('\n');
		        var sp = lib.repeat(' ', width);
	
		        for(var i=0; i<lines.length; i++) {
		            if(i === 0 && !indentfirst) {
		                res += lines[i] + '\n';
		            }
		            else {
		                res += sp + lines[i] + '\n';
		            }
		        }
	
		        return r.copySafeness(str, res);
		    },
	
		    join: function(arr, del, attr) {
		        del = del || '';
	
		        if(attr) {
		            arr = lib.map(arr, function(v) {
		                return v[attr];
		            });
		        }
	
		        return arr.join(del);
		    },
	
		    last: function(arr) {
		        return arr[arr.length-1];
		    },
	
		    length: function(val) {
		        var value = normalize(val, '');
	
		        if(value !== undefined) {
		            if(
		                (typeof Map === 'function' && value instanceof Map) ||
		                (typeof Set === 'function' && value instanceof Set)
		            ) {
		                // ECMAScript 2015 Maps and Sets
		                return value.size;
		            }
		            return value.length;
		        }
		        return 0;
		    },
	
		    list: function(val) {
		        if(lib.isString(val)) {
		            return val.split('');
		        }
		        else if(lib.isObject(val)) {
		            var keys = [];
	
		            if(Object.keys) {
		                keys = Object.keys(val);
		            }
		            else {
		                for(var k in val) {
		                    keys.push(k);
		                }
		            }
	
		            return lib.map(keys, function(k) {
		                return { key: k,
		                         value: val[k] };
		            });
		        }
		        else if(lib.isArray(val)) {
		          return val;
		        }
		        else {
		            throw new lib.TemplateError('list filter: type not iterable');
		        }
		    },
	
		    lower: function(str) {
		        str = normalize(str, '');
		        return str.toLowerCase();
		    },
	
		    random: function(arr) {
		        return arr[Math.floor(Math.random() * arr.length)];
		    },
	
		    rejectattr: function(arr, attr) {
		      return arr.filter(function (item) {
		        return !item[attr];
		      });
		    },
	
		    selectattr: function(arr, attr) {
		      return arr.filter(function (item) {
		        return !!item[attr];
		      });
		    },
	
		    replace: function(str, old, new_, maxCount) {
		        var originalStr = str;
	
		        if (old instanceof RegExp) {
		            return str.replace(old, new_);
		        }
	
		        if(typeof maxCount === 'undefined'){
		            maxCount = -1;
		        }
	
		        var res = '';  // Output
	
		        // Cast Numbers in the search term to string
		        if(typeof old === 'number'){
		            old = old + '';
		        }
		        else if(typeof old !== 'string') {
		            // If it is something other than number or string,
		            // return the original string
		            return str;
		        }
	
		        // Cast numbers in the replacement to string
		        if(typeof str === 'number'){
		            str = str + '';
		        }
	
		        // If by now, we don't have a string, throw it back
		        if(typeof str !== 'string' && !(str instanceof r.SafeString)){
		            return str;
		        }
	
		        // ShortCircuits
		        if(old === ''){
		            // Mimic the python behaviour: empty string is replaced
		            // by replacement e.g. "abc"|replace("", ".") -> .a.b.c.
		            res = new_ + str.split('').join(new_) + new_;
		            return r.copySafeness(str, res);
		        }
	
		        var nextIndex = str.indexOf(old);
		        // if # of replacements to perform is 0, or the string to does
		        // not contain the old value, return the string
		        if(maxCount === 0 || nextIndex === -1){
		            return str;
		        }
	
		        var pos = 0;
		        var count = 0; // # of replacements made
	
		        while(nextIndex  > -1 && (maxCount === -1 || count < maxCount)){
		            // Grab the next chunk of src string and add it with the
		            // replacement, to the result
		            res += str.substring(pos, nextIndex) + new_;
		            // Increment our pointer in the src string
		            pos = nextIndex + old.length;
		            count++;
		            // See if there are any more replacements to be made
		            nextIndex = str.indexOf(old, pos);
		        }
	
		        // We've either reached the end, or done the max # of
		        // replacements, tack on any remaining string
		        if(pos < str.length) {
		            res += str.substring(pos);
		        }
	
		        return r.copySafeness(originalStr, res);
		    },
	
		    reverse: function(val) {
		        var arr;
		        if(lib.isString(val)) {
		            arr = filters.list(val);
		        }
		        else {
		            // Copy it
		            arr = lib.map(val, function(v) { return v; });
		        }
	
		        arr.reverse();
	
		        if(lib.isString(val)) {
		            return r.copySafeness(val, arr.join(''));
		        }
		        return arr;
		    },
	
		    round: function(val, precision, method) {
		        precision = precision || 0;
		        var factor = Math.pow(10, precision);
		        var rounder;
	
		        if(method === 'ceil') {
		            rounder = Math.ceil;
		        }
		        else if(method === 'floor') {
		            rounder = Math.floor;
		        }
		        else {
		            rounder = Math.round;
		        }
	
		        return rounder(val * factor) / factor;
		    },
	
		    slice: function(arr, slices, fillWith) {
		        var sliceLength = Math.floor(arr.length / slices);
		        var extra = arr.length % slices;
		        var offset = 0;
		        var res = [];
	
		        for(var i=0; i<slices; i++) {
		            var start = offset + i * sliceLength;
		            if(i < extra) {
		                offset++;
		            }
		            var end = offset + (i + 1) * sliceLength;
	
		            var slice = arr.slice(start, end);
		            if(fillWith && i >= extra) {
		                slice.push(fillWith);
		            }
		            res.push(slice);
		        }
	
		        return res;
		    },
	
		    sum: function(arr, attr, start) {
		        var sum = 0;
	
		        if(typeof start === 'number'){
		            sum += start;
		        }
	
		        if(attr) {
		            arr = lib.map(arr, function(v) {
		                return v[attr];
		            });
		        }
	
		        for(var i = 0; i < arr.length; i++) {
		            sum += arr[i];
		        }
	
		        return sum;
		    },
	
		    sort: r.makeMacro(['value', 'reverse', 'case_sensitive', 'attribute'], [], function(arr, reverse, caseSens, attr) {
		         // Copy it
		        arr = lib.map(arr, function(v) { return v; });
	
		        arr.sort(function(a, b) {
		            var x, y;
	
		            if(attr) {
		                x = a[attr];
		                y = b[attr];
		            }
		            else {
		                x = a;
		                y = b;
		            }
	
		            if(!caseSens && lib.isString(x) && lib.isString(y)) {
		                x = x.toLowerCase();
		                y = y.toLowerCase();
		            }
	
		            if(x < y) {
		                return reverse ? 1 : -1;
		            }
		            else if(x > y) {
		                return reverse ? -1: 1;
		            }
		            else {
		                return 0;
		            }
		        });
	
		        return arr;
		    }),
	
		    string: function(obj) {
		        return r.copySafeness(obj, obj);
		    },
	
		    striptags: function(input, preserve_linebreaks) {
		        input = normalize(input, '');
		        preserve_linebreaks = preserve_linebreaks || false;
		        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
		        var trimmedInput = filters.trim(input.replace(tags, ''));
		        var res = '';
		        if (preserve_linebreaks) {
		            res = trimmedInput
		                .replace(/^ +| +$/gm, '')     // remove leading and trailing spaces
		                .replace(/ +/g, ' ')          // squash adjacent spaces
		                .replace(/(\r\n)/g, '\n')     // normalize linebreaks (CRLF -> LF)
		                .replace(/\n\n\n+/g, '\n\n'); // squash abnormal adjacent linebreaks
		        } else {
		            res = trimmedInput.replace(/\s+/gi, ' ');
		        }
		        return r.copySafeness(input, res);
		    },
	
		    title: function(str) {
		        str = normalize(str, '');
		        var words = str.split(' ');
		        for(var i = 0; i < words.length; i++) {
		            words[i] = filters.capitalize(words[i]);
		        }
		        return r.copySafeness(str, words.join(' '));
		    },
	
		    trim: function(str) {
		        return r.copySafeness(str, str.replace(/^\s*|\s*$/g, ''));
		    },
	
		    truncate: function(input, length, killwords, end) {
		        var orig = input;
		        input = normalize(input, '');
		        length = length || 255;
	
		        if (input.length <= length)
		            return input;
	
		        if (killwords) {
		            input = input.substring(0, length);
		        } else {
		            var idx = input.lastIndexOf(' ', length);
		            if(idx === -1) {
		                idx = length;
		            }
	
		            input = input.substring(0, idx);
		        }
	
		        input += (end !== undefined && end !== null) ? end : '...';
		        return r.copySafeness(orig, input);
		    },
	
		    upper: function(str) {
		        str = normalize(str, '');
		        return str.toUpperCase();
		    },
	
		    urlencode: function(obj) {
		        var enc = encodeURIComponent;
		        if (lib.isString(obj)) {
		            return enc(obj);
		        } else {
		            var parts;
		            if (lib.isArray(obj)) {
		                parts = obj.map(function(item) {
		                    return enc(item[0]) + '=' + enc(item[1]);
		                });
		            } else {
		                parts = [];
		                for (var k in obj) {
		                    if (obj.hasOwnProperty(k)) {
		                        parts.push(enc(k) + '=' + enc(obj[k]));
		                    }
		                }
		            }
		            return parts.join('&');
		        }
		    },
	
		    urlize: function(str, length, nofollow) {
		        if (isNaN(length)) length = Infinity;
	
		        var noFollowAttr = (nofollow === true ? ' rel="nofollow"' : '');
	
		        // For the jinja regexp, see
		        // https://github.com/mitsuhiko/jinja2/blob/f15b814dcba6aa12bc74d1f7d0c881d55f7126be/jinja2/utils.py#L20-L23
		        var puncRE = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/;
		        // from http://blog.gerv.net/2011/05/html5_email_address_regexp/
		        var emailRE = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
		        var httpHttpsRE = /^https?:\/\/.*$/;
		        var wwwRE = /^www\./;
		        var tldRE = /\.(?:org|net|com)(?:\:|\/|$)/;
	
		        var words = str.split(/(\s+)/).filter(function(word) {
		          // If the word has no length, bail. This can happen for str with
		          // trailing whitespace.
		          return word && word.length;
		        }).map(function(word) {
		          var matches = word.match(puncRE);
		          var possibleUrl = matches && matches[1] || word;
	
		          // url that starts with http or https
		          if (httpHttpsRE.test(possibleUrl))
		            return '<a href="' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';
	
		          // url that starts with www.
		          if (wwwRE.test(possibleUrl))
		            return '<a href="http://' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';
	
		          // an email address of the form username@domain.tld
		          if (emailRE.test(possibleUrl))
		            return '<a href="mailto:' + possibleUrl + '">' + possibleUrl + '</a>';
	
		          // url that ends in .com, .org or .net that is not an email address
		          if (tldRE.test(possibleUrl))
		            return '<a href="http://' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';
	
		          return word;
	
		        });
	
		        return words.join('');
		    },
	
		    wordcount: function(str) {
		        str = normalize(str, '');
		        var words = (str) ? str.match(/\w+/g) : null;
		        return (words) ? words.length : null;
		    },
	
		    'float': function(val, def) {
		        var res = parseFloat(val);
		        return isNaN(res) ? def : res;
		    },
	
		    'int': function(val, def) {
		        var res = parseInt(val, 10);
		        return isNaN(res) ? def : res;
		    }
		};
	
		// Aliases
		filters.d = filters['default'];
		filters.e = filters.escape;
	
		module.exports = filters;
	
	
	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var lib = __webpack_require__(1);
		var Obj = __webpack_require__(6);
	
		// Frames keep track of scoping both at compile-time and run-time so
		// we know how to access variables. Block tags can introduce special
		// variables, for example.
		var Frame = Obj.extend({
		    init: function(parent, isolateWrites) {
		        this.variables = {};
		        this.parent = parent;
		        this.topLevel = false;
		        // if this is true, writes (set) should never propagate upwards past
		        // this frame to its parent (though reads may).
		        this.isolateWrites = isolateWrites;
		    },
	
		    set: function(name, val, resolveUp) {
		        // Allow variables with dots by automatically creating the
		        // nested structure
		        var parts = name.split('.');
		        var obj = this.variables;
		        var frame = this;
	
		        if(resolveUp) {
		            if((frame = this.resolve(parts[0], true))) {
		                frame.set(name, val);
		                return;
		            }
		        }
	
		        for(var i=0; i<parts.length - 1; i++) {
		            var id = parts[i];
	
		            if(!obj[id]) {
		                obj[id] = {};
		            }
		            obj = obj[id];
		        }
	
		        obj[parts[parts.length - 1]] = val;
		    },
	
		    get: function(name) {
		        var val = this.variables[name];
		        if(val !== undefined && val !== null) {
		            return val;
		        }
		        return null;
		    },
	
		    lookup: function(name) {
		        var p = this.parent;
		        var val = this.variables[name];
		        if(val !== undefined && val !== null) {
		            return val;
		        }
		        return p && p.lookup(name);
		    },
	
		    resolve: function(name, forWrite) {
		        var p = (forWrite && this.isolateWrites) ? undefined : this.parent;
		        var val = this.variables[name];
		        if(val !== undefined && val !== null) {
		            return this;
		        }
		        return p && p.resolve(name);
		    },
	
		    push: function(isolateWrites) {
		        return new Frame(this, isolateWrites);
		    },
	
		    pop: function() {
		        return this.parent;
		    }
		});
	
		function makeMacro(argNames, kwargNames, func) {
		    return function() {
		        var argCount = numArgs(arguments);
		        var args;
		        var kwargs = getKeywordArgs(arguments);
		        var i;
	
		        if(argCount > argNames.length) {
		            args = Array.prototype.slice.call(arguments, 0, argNames.length);
	
		            // Positional arguments that should be passed in as
		            // keyword arguments (essentially default values)
		            var vals = Array.prototype.slice.call(arguments, args.length, argCount);
		            for(i = 0; i < vals.length; i++) {
		                if(i < kwargNames.length) {
		                    kwargs[kwargNames[i]] = vals[i];
		                }
		            }
	
		            args.push(kwargs);
		        }
		        else if(argCount < argNames.length) {
		            args = Array.prototype.slice.call(arguments, 0, argCount);
	
		            for(i = argCount; i < argNames.length; i++) {
		                var arg = argNames[i];
	
		                // Keyword arguments that should be passed as
		                // positional arguments, i.e. the caller explicitly
		                // used the name of a positional arg
		                args.push(kwargs[arg]);
		                delete kwargs[arg];
		            }
	
		            args.push(kwargs);
		        }
		        else {
		            args = arguments;
		        }
	
		        return func.apply(this, args);
		    };
		}
	
		function makeKeywordArgs(obj) {
		    obj.__keywords = true;
		    return obj;
		}
	
		function getKeywordArgs(args) {
		    var len = args.length;
		    if(len) {
		        var lastArg = args[len - 1];
		        if(lastArg && lastArg.hasOwnProperty('__keywords')) {
		            return lastArg;
		        }
		    }
		    return {};
		}
	
		function numArgs(args) {
		    var len = args.length;
		    if(len === 0) {
		        return 0;
		    }
	
		    var lastArg = args[len - 1];
		    if(lastArg && lastArg.hasOwnProperty('__keywords')) {
		        return len - 1;
		    }
		    else {
		        return len;
		    }
		}
	
		// A SafeString object indicates that the string should not be
		// autoescaped. This happens magically because autoescaping only
		// occurs on primitive string objects.
		function SafeString(val) {
		    if(typeof val !== 'string') {
		        return val;
		    }
	
		    this.val = val;
		    this.length = val.length;
		}
	
		SafeString.prototype = Object.create(String.prototype, {
		    length: { writable: true, configurable: true, value: 0 }
		});
		SafeString.prototype.valueOf = function() {
		    return this.val;
		};
		SafeString.prototype.toString = function() {
		    return this.val;
		};
	
		function copySafeness(dest, target) {
		    if(dest instanceof SafeString) {
		        return new SafeString(target);
		    }
		    return target.toString();
		}
	
		function markSafe(val) {
		    var type = typeof val;
	
		    if(type === 'string') {
		        return new SafeString(val);
		    }
		    else if(type !== 'function') {
		        return val;
		    }
		    else {
		        return function() {
		            var ret = val.apply(this, arguments);
	
		            if(typeof ret === 'string') {
		                return new SafeString(ret);
		            }
	
		            return ret;
		        };
		    }
		}
	
		function suppressValue(val, autoescape) {
		    val = (val !== undefined && val !== null) ? val : '';
	
		    if(autoescape && typeof val === 'string') {
		        val = lib.escape(val);
		    }
	
		    return val;
		}
	
		function ensureDefined(val, lineno, colno) {
		    if(val === null || val === undefined) {
		        throw new lib.TemplateError(
		            'attempted to output null or undefined value',
		            lineno + 1,
		            colno + 1
		        );
		    }
		    return val;
		}
	
		function memberLookup(obj, val) {
		    obj = obj || {};
	
		    if(typeof obj[val] === 'function') {
		        return function() {
		            return obj[val].apply(obj, arguments);
		        };
		    }
	
		    return obj[val];
		}
	
		function callWrap(obj, name, context, args) {
		    if(!obj) {
		        throw new Error('Unable to call `' + name + '`, which is undefined or falsey');
		    }
		    else if(typeof obj !== 'function') {
		        throw new Error('Unable to call `' + name + '`, which is not a function');
		    }
	
		    // jshint validthis: true
		    return obj.apply(context, args);
		}
	
		function contextOrFrameLookup(context, frame, name) {
		    var val = frame.lookup(name);
		    return (val !== undefined && val !== null) ?
		        val :
		        context.lookup(name);
		}
	
		function handleError(error, lineno, colno) {
		    if(error.lineno) {
		        return error;
		    }
		    else {
		        return new lib.TemplateError(error, lineno, colno);
		    }
		}
	
		function asyncEach(arr, dimen, iter, cb) {
		    if(lib.isArray(arr)) {
		        var len = arr.length;
	
		        lib.asyncIter(arr, function(item, i, next) {
		            switch(dimen) {
		            case 1: iter(item, i, len, next); break;
		            case 2: iter(item[0], item[1], i, len, next); break;
		            case 3: iter(item[0], item[1], item[2], i, len, next); break;
		            default:
		                item.push(i, next);
		                iter.apply(this, item);
		            }
		        }, cb);
		    }
		    else {
		        lib.asyncFor(arr, function(key, val, i, len, next) {
		            iter(key, val, i, len, next);
		        }, cb);
		    }
		}
	
		function asyncAll(arr, dimen, func, cb) {
		    var finished = 0;
		    var len, i;
		    var outputArr;
	
		    function done(i, output) {
		        finished++;
		        outputArr[i] = output;
	
		        if(finished === len) {
		            cb(null, outputArr.join(''));
		        }
		    }
	
		    if(lib.isArray(arr)) {
		        len = arr.length;
		        outputArr = new Array(len);
	
		        if(len === 0) {
		            cb(null, '');
		        }
		        else {
		            for(i = 0; i < arr.length; i++) {
		                var item = arr[i];
	
		                switch(dimen) {
		                case 1: func(item, i, len, done); break;
		                case 2: func(item[0], item[1], i, len, done); break;
		                case 3: func(item[0], item[1], item[2], i, len, done); break;
		                default:
		                    item.push(i, done);
		                    // jshint validthis: true
		                    func.apply(this, item);
		                }
		            }
		        }
		    }
		    else {
		        var keys = lib.keys(arr);
		        len = keys.length;
		        outputArr = new Array(len);
	
		        if(len === 0) {
		            cb(null, '');
		        }
		        else {
		            for(i = 0; i < keys.length; i++) {
		                var k = keys[i];
		                func(k, arr[k], i, len, done);
		            }
		        }
		    }
		}
	
		module.exports = {
		    Frame: Frame,
		    makeMacro: makeMacro,
		    makeKeywordArgs: makeKeywordArgs,
		    numArgs: numArgs,
		    suppressValue: suppressValue,
		    ensureDefined: ensureDefined,
		    memberLookup: memberLookup,
		    contextOrFrameLookup: contextOrFrameLookup,
		    callWrap: callWrap,
		    handleError: handleError,
		    isArray: lib.isArray,
		    keys: lib.keys,
		    SafeString: SafeString,
		    copySafeness: copySafeness,
		    markSafe: markSafe,
		    asyncEach: asyncEach,
		    asyncAll: asyncAll,
		    inOperator: lib.inOperator
		};
	
	
	/***/ },
	/* 9 */
	/***/ function(module, exports) {
	
		'use strict';
	
		function cycler(items) {
		    var index = -1;
	
		    return {
		        current: null,
		        reset: function() {
		            index = -1;
		            this.current = null;
		        },
	
		        next: function() {
		            index++;
		            if(index >= items.length) {
		                index = 0;
		            }
	
		            this.current = items[index];
		            return this.current;
		        },
		    };
	
		}
	
		function joiner(sep) {
		    sep = sep || ',';
		    var first = true;
	
		    return function() {
		        var val = first ? '' : sep;
		        first = false;
		        return val;
		    };
		}
	
		// Making this a function instead so it returns a new object
		// each time it's called. That way, if something like an environment
		// uses it, they will each have their own copy.
		function globals() {
		    return {
		        range: function(start, stop, step) {
		            if(typeof stop === 'undefined') {
		                stop = start;
		                start = 0;
		                step = 1;
		            }
		            else if(!step) {
		                step = 1;
		            }
	
		            var arr = [];
		            var i;
		            if (step > 0) {
		                for (i=start; i<stop; i+=step) {
		                    arr.push(i);
		                }
		            } else {
		                for (i=start; i>stop; i+=step) {
		                    arr.push(i);
		                }
		            }
		            return arr;
		        },
	
		        // lipsum: function(n, html, min, max) {
		        // },
	
		        cycler: function() {
		            return cycler(Array.prototype.slice.call(arguments));
		        },
	
		        joiner: function(sep) {
		            return joiner(sep);
		        }
		    };
		}
	
		module.exports = globals;
	
	
	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var Loader = __webpack_require__(11);
	
		var PrecompiledLoader = Loader.extend({
		    init: function(compiledTemplates) {
		        this.precompiled = compiledTemplates || {};
		    },
	
		    getSource: function(name) {
		        if (this.precompiled[name]) {
		            return {
		                src: { type: 'code',
		                       obj: this.precompiled[name] },
		                path: name
		            };
		        }
		        return null;
		    }
		});
	
		module.exports = PrecompiledLoader;
	
	
	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var path = __webpack_require__(3);
		var Obj = __webpack_require__(6);
		var lib = __webpack_require__(1);
	
		var Loader = Obj.extend({
		    on: function(name, func) {
		        this.listeners = this.listeners || {};
		        this.listeners[name] = this.listeners[name] || [];
		        this.listeners[name].push(func);
		    },
	
		    emit: function(name /*, arg1, arg2, ...*/) {
		        var args = Array.prototype.slice.call(arguments, 1);
	
		        if(this.listeners && this.listeners[name]) {
		            lib.each(this.listeners[name], function(listener) {
		                listener.apply(null, args);
		            });
		        }
		    },
	
		    resolve: function(from, to) {
		        return path.resolve(path.dirname(from), to);
		    },
	
		    isRelative: function(filename) {
		        return (filename.indexOf('./') === 0 || filename.indexOf('../') === 0);
		    }
		});
	
		module.exports = Loader;
	
	
	/***/ },
	/* 12 */
	/***/ function(module, exports) {
	
		function installCompat() {
		  'use strict';
	
		  // This must be called like `nunjucks.installCompat` so that `this`
		  // references the nunjucks instance
		  var runtime = this.runtime; // jshint ignore:line
		  var lib = this.lib; // jshint ignore:line
	
		  var orig_contextOrFrameLookup = runtime.contextOrFrameLookup;
		  runtime.contextOrFrameLookup = function(context, frame, key) {
		    var val = orig_contextOrFrameLookup.apply(this, arguments);
		    if (val === undefined) {
		      switch (key) {
		      case 'True':
		        return true;
		      case 'False':
		        return false;
		      case 'None':
		        return null;
		      }
		    }
	
		    return val;
		  };
	
		  var orig_memberLookup = runtime.memberLookup;
		  var ARRAY_MEMBERS = {
		    pop: function(index) {
		      if (index === undefined) {
		        return this.pop();
		      }
		      if (index >= this.length || index < 0) {
		        throw new Error('KeyError');
		      }
		      return this.splice(index, 1);
		    },
		    remove: function(element) {
		      for (var i = 0; i < this.length; i++) {
		        if (this[i] === element) {
		          return this.splice(i, 1);
		        }
		      }
		      throw new Error('ValueError');
		    },
		    count: function(element) {
		      var count = 0;
		      for (var i = 0; i < this.length; i++) {
		        if (this[i] === element) {
		          count++;
		        }
		      }
		      return count;
		    },
		    index: function(element) {
		      var i;
		      if ((i = this.indexOf(element)) === -1) {
		        throw new Error('ValueError');
		      }
		      return i;
		    },
		    find: function(element) {
		      return this.indexOf(element);
		    },
		    insert: function(index, elem) {
		      return this.splice(index, 0, elem);
		    }
		  };
		  var OBJECT_MEMBERS = {
		    items: function() {
		      var ret = [];
		      for(var k in this) {
		        ret.push([k, this[k]]);
		      }
		      return ret;
		    },
		    values: function() {
		      var ret = [];
		      for(var k in this) {
		        ret.push(this[k]);
		      }
		      return ret;
		    },
		    keys: function() {
		      var ret = [];
		      for(var k in this) {
		        ret.push(k);
		      }
		      return ret;
		    },
		    get: function(key, def) {
		      var output = this[key];
		      if (output === undefined) {
		        output = def;
		      }
		      return output;
		    },
		    has_key: function(key) {
		      return this.hasOwnProperty(key);
		    },
		    pop: function(key, def) {
		      var output = this[key];
		      if (output === undefined && def !== undefined) {
		        output = def;
		      } else if (output === undefined) {
		        throw new Error('KeyError');
		      } else {
		        delete this[key];
		      }
		      return output;
		    },
		    popitem: function() {
		      for (var k in this) {
		        // Return the first object pair.
		        var val = this[k];
		        delete this[k];
		        return [k, val];
		      }
		      throw new Error('KeyError');
		    },
		    setdefault: function(key, def) {
		      if (key in this) {
		        return this[key];
		      }
		      if (def === undefined) {
		        def = null;
		      }
		      return this[key] = def;
		    },
		    update: function(kwargs) {
		      for (var k in kwargs) {
		        this[k] = kwargs[k];
		      }
		      return null;  // Always returns None
		    }
		  };
		  OBJECT_MEMBERS.iteritems = OBJECT_MEMBERS.items;
		  OBJECT_MEMBERS.itervalues = OBJECT_MEMBERS.values;
		  OBJECT_MEMBERS.iterkeys = OBJECT_MEMBERS.keys;
		  runtime.memberLookup = function(obj, val, autoescape) { // jshint ignore:line
		    obj = obj || {};
	
		    // If the object is an object, return any of the methods that Python would
		    // otherwise provide.
		    if (lib.isArray(obj) && ARRAY_MEMBERS.hasOwnProperty(val)) {
		      return function() {return ARRAY_MEMBERS[val].apply(obj, arguments);};
		    }
	
		    if (lib.isObject(obj) && OBJECT_MEMBERS.hasOwnProperty(val)) {
		      return function() {return OBJECT_MEMBERS[val].apply(obj, arguments);};
		    }
	
		    return orig_memberLookup.apply(this, arguments);
		  };
		}
	
		module.exports = installCompat;
	
	
	/***/ }
	/******/ ]);
	
	/*** EXPORTS FROM exports-loader ***/
	module.exports = nunjucks;

/***/ },
/* 13 */
/*!*******************************************!*\
  !*** ./~/nunjucks-loader/runtime-shim.js ***!
  \*******************************************/
/***/ function(module, exports) {

	module.exports = function (nunjucks, env, obj, dependencies){
	
	    var oldRoot = obj.root;
	
	    obj.root = function( env, context, frame, runtime, ignoreMissing, cb ) {
	        var oldGetTemplate = env.getTemplate;
	        env.getTemplate = function (name, ec, parentName, ignoreMissing, cb) {
	            if( typeof ec === "function" ) {
	                cb = ec = false;
	            }
	            var _require = function (name) {
	                try {
	                    // add a reference to the already resolved dependency here
	                    return dependencies[name];
	                }
	                catch (e) {
	                    if (frame.get("_require")) {
	                        return frame.get("_require")(name);
	                    }
	                    else {
	                        console.warn('Could not load template "%s"', name);
	                    }
	                }
	            };
	
	            var tmpl = _require(name);
	            frame.set("_require", _require);
	
	            if( ec ) tmpl.compile();
	            cb( null, tmpl );
	        };
	
	        oldRoot(env, context, frame, runtime, ignoreMissing, function (err, res) {
	            env.getTemplate = oldGetTemplate;
	            cb( err, res );
	        });
	    };
	
	    var src = {
	        obj: obj,
	        type: 'code'
	    };
	
	    return new nunjucks.Template(src, env);
	
	};

/***/ },
/* 14 */
/*!************************!*\
  !*** ./data/jobs.json ***!
  \************************/
/***/ function(module, exports) {

	module.exports = {
		"jobs": [
			{
				"type": "company",
				"employer": "Palo IT Singapore",
				"image": "/images/jobs/palo-it.png",
				"employerlink": "http://sg.palo-it.com",
				"jobs": [
					{
						"title": "Full Stack Developer",
						"description": "Within exciting projects, you will contribute to the creation of innovative solutions and put into practice TDD and XP in an Open Source environment.",
						"url": "https://palo-it.com/job-full-stack-web-developer/"
					}
				]
			}
		]
	};

/***/ },
/* 15 */
/*!**********************************!*\
  !*** ./~/shuffle-array/index.js ***!
  \**********************************/
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Randomize the order of the elements in a given array.
	 * @param {Array} arr - The given array.
	 * @param {Object} [options] - Optional configuration options.
	 * @param {Boolean} [options.copy] - Sets if should return a shuffled copy of the given array. By default it's a falsy value.
	 * @param {Function} [options.rng] - Specifies a custom random number generator.
	 * @returns {Array}
	 */
	function shuffle(arr, options) {
	
	  if (!Array.isArray(arr)) {
	    throw new Error('shuffle expect an array as parameter.');
	  }
	
	  options = options || {};
	
	  var collection = arr,
	      len = arr.length,
	      rng = options.rng || Math.random,
	      random,
	      temp;
	
	  if (options.copy === true) {
	    collection = arr.slice();
	  }
	
	  while (len) {
	    random = Math.floor(rng() * len);
	    len -= 1;
	    temp = collection[len];
	    collection[len] = collection[random];
	    collection[random] = temp;
	  }
	
	  return collection;
	};
	
	/**
	 * Pick one or more random elements from the given array.
	 * @param {Array} arr - The given array.
	 * @param {Object} [options] - Optional configuration options.
	 * @param {Number} [options.picks] - Specifies how many random elements you want to pick. By default it picks 1.
	 * @param {Function} [options.rng] - Specifies a custom random number generator.
	 * @returns {Object}
	 */
	shuffle.pick = function(arr, options) {
	
	  if (!Array.isArray(arr)) {
	    throw new Error('shuffle.pick() expect an array as parameter.');
	  }
	
	  options = options || {};
	
	  var rng = options.rng || Math.random,
	      picks = options.picks || 1;
	
	  if (typeof picks === 'number' && picks !== 1) {
	    var len = arr.length,
	        collection = arr.slice(),
	        random = [],
	        index;
	
	    while (picks && len) {
	      index = Math.floor(rng() * len);
	      random.push(collection[index]);
	      collection.splice(index, 1);
	      len -= 1;
	      picks -= 1;
	    }
	
	    return random;
	  }
	
	  return arr[Math.floor(rng() * arr.length)];
	};
	
	/**
	 * Expose
	 */
	module.exports = shuffle;


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map