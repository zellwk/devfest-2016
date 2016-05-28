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
	
	__webpack_require__(/*! ./modal */ 2);
	__webpack_require__(/*! ./canvas */ 3);
	__webpack_require__(/*! ./form */ 4);
	
	// Polyfill for external SVG spritesheets
	(0, _svg4everybody2.default)();

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
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/***/ function(module, exports) {

	'use strict';
	
	var modal = document.querySelector('.jsModal');
	
	if (modal) {
	  var triggers = document.querySelectorAll('.jsModalTrigger');
	  triggers.forEach(function (el) {
	    el.addEventListener('click', function (e) {
	      e.preventDefault();
	      var cta = el.dataset.trigger;
	      var buy = el.dataset.buy;
	      activateModal(el, cta, buy);
	    });
	  });
	}
	
	function activateModal(el, cta, buy) {
	  var buttons = modal.querySelectorAll('.btn');
	  var form = modal.querySelector('form');
	
	  modal.classList.add('is-shown');
	  form.setAttribute('data-action', cta);
	  form.setAttribute('data-buy', buy);
	  buttons.forEach(function (btn) {
	    if (btn.dataset.cta === cta) {
	      btn.style.display = 'block';
	    } else {
	      btn.style.display = 'none';
	    }
	  });
	
	  modal.querySelector('.Modal__content').addEventListener('click', function (e) {
	    return e.stopPropagation();
	  });
	
	  modal.addEventListener('click', closeModal);
	}
	
	function closeModal() {
	  modal.classList.remove('is-shown');
	}

/***/ },
/* 3 */
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/***/ function(module, exports) {

	'use strict';
	
	var canvasTrigger = document.querySelector('.jsCanvasTrigger');
	
	if (canvasTrigger) {
	  (function () {
	    var canvas = document.querySelector('.jsCanvas');
	
	    canvasTrigger.addEventListener('click', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      if (canvas.classList.contains('is-shown')) {
	        deactivateOffCanvas();
	      } else {
	        activateOffCanvas();
	      }
	    });
	  })();
	}
	
	function activateOffCanvas() {
	  var canvas = document.querySelector('.jsCanvas');
	  var offCanvas = document.querySelector('.jsCanvasOff');
	  canvas.classList.add('is-shown');
	  offCanvas.addEventListener('click', function (e) {
	    return e.stopPropagation();
	  });
	  canvas.addEventListener('click', deactivateOffCanvas);
	}
	
	function deactivateOffCanvas() {
	  document.querySelector('.jsCanvas').classList.remove('is-shown');
	}

/***/ },
/* 4 */
/*!************************!*\
  !*** ./src/js/form.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* globals fetch FormValidator */
	__webpack_require__(/*! validate-js */ 5);
	__webpack_require__(/*! es6-promise */ 6).polyfill();
	__webpack_require__(/*! isomorphic-fetch */ 11);
	
	var fields = [{
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
	}];
	
	function validatorCallback(errors, evt) {
	  evt.preventDefault();
	  var t = evt.target;
	  var errorNodes = t.querySelectorAll('.jsFormError');
	  var hidden = evt.target.querySelector('[name=hidden]');
	
	  // prevent spam bot submission
	  if (hidden.value) {
	    return false;
	  }
	
	  // reset error nodes
	  errorNodes.forEach(function (el) {
	    return el.innerHTML = '';
	  });
	  if (errors.length) {
	    Array.from(errors).forEach(function (err) {
	      var parentNode = err.element.parentNode;
	      var errorNode = parentNode.querySelector('.jsFormError');
	      errorNode.innerHTML = err.message;
	    });
	  } else {
	    var name = t.querySelector('[name=name]').value;
	    var email = t.querySelector('[name=email]').value;
	    var phone = t.querySelector('[name=phone]').value;
	    var action = t.getAttribute('data-action');
	    var buy = t.getAttribute('data-buy');
	
	    fetch('https://cohort19x-api.herokuapp.com/', {
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
	    }).then(function (r) {
	      return r.json;
	    }).then(function (d) {
	      console.log('success');
	      t.querySelector('.jsFormSuccess').classList.add('is-shown');
	      t.removeChild(t.querySelector('.jsFormContent'));
	    });
	  }
	}
	
	var validator = new FormValidator('form', fields, validatorCallback);
	
	validator.setMessage('required', 'Please fill in your %s.');
	validator.setMessage('valid_email', 'Please fill in a valid %s.');
	validator.setMessage('phone', 'Please fill in a valid %s., without spaces');

/***/ },
/* 5 */
/*!***********************************!*\
  !*** ./~/validate-js/validate.js ***!
  \***********************************/
/***/ function(module, exports) {

	/*
	 * validate.js 2.0.1
	 * Copyright (c) 2011 - 2015 Rick Harrison, http://rickharrison.me
	 * validate.js is open sourced under the MIT license.
	 * Portions of validate.js are inspired by CodeIgniter.
	 * http://rickharrison.github.com/validate.js
	 */
	
	(function(window, document, undefined) {
	    /*
	     * If you would like an application-wide config, change these defaults.
	     * Otherwise, use the setMessage() function to configure form specific messages.
	     */
	
	    var defaults = {
	        messages: {
	            required: 'The %s field is required.',
	            matches: 'The %s field does not match the %s field.',
	            "default": 'The %s field is still set to default, please change.',
	            valid_email: 'The %s field must contain a valid email address.',
	            valid_emails: 'The %s field must contain all valid email addresses.',
	            min_length: 'The %s field must be at least %s characters in length.',
	            max_length: 'The %s field must not exceed %s characters in length.',
	            exact_length: 'The %s field must be exactly %s characters in length.',
	            greater_than: 'The %s field must contain a number greater than %s.',
	            less_than: 'The %s field must contain a number less than %s.',
	            alpha: 'The %s field must only contain alphabetical characters.',
	            alpha_numeric: 'The %s field must only contain alpha-numeric characters.',
	            alpha_dash: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
	            numeric: 'The %s field must contain only numbers.',
	            integer: 'The %s field must contain an integer.',
	            decimal: 'The %s field must contain a decimal number.',
	            is_natural: 'The %s field must contain only positive numbers.',
	            is_natural_no_zero: 'The %s field must contain a number greater than zero.',
	            valid_ip: 'The %s field must contain a valid IP.',
	            valid_base64: 'The %s field must contain a base64 string.',
	            valid_credit_card: 'The %s field must contain a valid credit card number.',
	            is_file_type: 'The %s field must contain only %s files.',
	            valid_url: 'The %s field must contain a valid URL.',
	            greater_than_date: 'The %s field must contain a more recent date than %s.',
	            less_than_date: 'The %s field must contain an older date than %s.',
	            greater_than_or_equal_date: 'The %s field must contain a date that\'s at least as recent as %s.',
	            less_than_or_equal_date: 'The %s field must contain a date that\'s %s or older.'
	        },
	        callback: function(errors) {
	
	        }
	    };
	
	    /*
	     * Define the regular expressions that will be used
	     */
	
	    var ruleRegex = /^(.+?)\[(.+)\]$/,
	        numericRegex = /^[0-9]+$/,
	        integerRegex = /^\-?[0-9]+$/,
	        decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
	        emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	        alphaRegex = /^[a-z]+$/i,
	        alphaNumericRegex = /^[a-z0-9]+$/i,
	        alphaDashRegex = /^[a-z0-9_\-]+$/i,
	        naturalRegex = /^[0-9]+$/i,
	        naturalNoZeroRegex = /^[1-9][0-9]*$/i,
	        ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
	        base64Regex = /[^a-zA-Z0-9\/\+=]/i,
	        numericDashRegex = /^[\d\-\s]+$/,
	        urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
	        dateRegex = /\d{4}-\d{1,2}-\d{1,2}/;
	
	    /*
	     * The exposed public object to validate a form:
	     *
	     * @param formNameOrNode - String - The name attribute of the form (i.e. <form name="myForm"></form>) or node of the form element
	     * @param fields - Array - [{
	     *     name: The name of the element (i.e. <input name="myField" />)
	     *     display: 'Field Name'
	     *     rules: required|matches[password_confirm]
	     * }]
	     * @param callback - Function - The callback after validation has been performed.
	     *     @argument errors - An array of validation errors
	     *     @argument event - The javascript event
	     */
	
	    var FormValidator = function(formNameOrNode, fields, callback) {
	        this.callback = callback || defaults.callback;
	        this.errors = [];
	        this.fields = {};
	        this.form = this._formByNameOrNode(formNameOrNode) || {};
	        this.messages = {};
	        this.handlers = {};
	        this.conditionals = {};
	
	        for (var i = 0, fieldLength = fields.length; i < fieldLength; i++) {
	            var field = fields[i];
	
	            // If passed in incorrectly, we need to skip the field.
	            if ((!field.name && !field.names) || !field.rules) {
	                console.warn('validate.js: The following field is being skipped due to a misconfiguration:');
	                console.warn(field);
	                console.warn('Check to ensure you have properly configured a name and rules for this field');
	                continue;
	            }
	
	            /*
	             * Build the master fields array that has all the information needed to validate
	             */
	
	            if (field.names) {
	                for (var j = 0, fieldNamesLength = field.names.length; j < fieldNamesLength; j++) {
	                    this._addField(field, field.names[j]);
	                }
	            } else {
	                this._addField(field, field.name);
	            }
	        }
	
	        /*
	         * Attach an event callback for the form submission
	         */
	
	        var _onsubmit = this.form.onsubmit;
	
	        this.form.onsubmit = (function(that) {
	            return function(evt) {
	                try {
	                    return that._validateForm(evt) && (_onsubmit === undefined || _onsubmit());
	                } catch(e) {}
	            };
	        })(this);
	    },
	
	    attributeValue = function (element, attributeName) {
	        var i;
	
	        if ((element.length > 0) && (element[0].type === 'radio' || element[0].type === 'checkbox')) {
	            for (i = 0, elementLength = element.length; i < elementLength; i++) {
	                if (element[i].checked) {
	                    return element[i][attributeName];
	                }
	            }
	
	            return;
	        }
	
	        return element[attributeName];
	    };
	
	    /*
	     * @public
	     * Sets a custom message for one of the rules
	     */
	
	    FormValidator.prototype.setMessage = function(rule, message) {
	        this.messages[rule] = message;
	
	        // return this for chaining
	        return this;
	    };
	
	    /*
	     * @public
	     * Registers a callback for a custom rule (i.e. callback_username_check)
	     */
	
	    FormValidator.prototype.registerCallback = function(name, handler) {
	        if (name && typeof name === 'string' && handler && typeof handler === 'function') {
	            this.handlers[name] = handler;
	        }
	
	        // return this for chaining
	        return this;
	    };
	
	    /*
	     * @public
	     * Registers a conditional for a custom 'depends' rule
	     */
	
	    FormValidator.prototype.registerConditional = function(name, conditional) {
	        if (name && typeof name === 'string' && conditional && typeof conditional === 'function') {
	            this.conditionals[name] = conditional;
	        }
	
	        // return this for chaining
	        return this;
	    };
	
	    /*
	     * @private
	     * Determines if a form dom node was passed in or just a string representing the form name
	     */
	
	    FormValidator.prototype._formByNameOrNode = function(formNameOrNode) {
	        return (typeof formNameOrNode === 'object') ? formNameOrNode : document.forms[formNameOrNode];
	    };
	
	    /*
	     * @private
	     * Adds a file to the master fields array
	     */
	
	    FormValidator.prototype._addField = function(field, nameValue)  {
	        this.fields[nameValue] = {
	            name: nameValue,
	            display: field.display || nameValue,
	            rules: field.rules,
	            depends: field.depends,
	            id: null,
	            element: null,
	            type: null,
	            value: null,
	            checked: null
	        };
	    };
	
	    /*
	     * @private
	     * Runs the validation when the form is submitted.
	     */
	
	    FormValidator.prototype._validateForm = function(evt) {
	        this.errors = [];
	
	        for (var key in this.fields) {
	            if (this.fields.hasOwnProperty(key)) {
	                var field = this.fields[key] || {},
	                    element = this.form[field.name];
	
	                if (element && element !== undefined) {
	                    field.id = attributeValue(element, 'id');
	                    field.element = element;
	                    field.type = (element.length > 0) ? element[0].type : element.type;
	                    field.value = attributeValue(element, 'value');
	                    field.checked = attributeValue(element, 'checked');
	
	                    /*
	                     * Run through the rules for each field.
	                     * If the field has a depends conditional, only validate the field
	                     * if it passes the custom function
	                     */
	
	                    if (field.depends && typeof field.depends === "function") {
	                        if (field.depends.call(this, field)) {
	                            this._validateField(field);
	                        }
	                    } else if (field.depends && typeof field.depends === "string" && this.conditionals[field.depends]) {
	                        if (this.conditionals[field.depends].call(this,field)) {
	                            this._validateField(field);
	                        }
	                    } else {
	                        this._validateField(field);
	                    }
	                }
	            }
	        }
	
	        if (typeof this.callback === 'function') {
	            this.callback(this.errors, evt);
	        }
	
	        if (this.errors.length > 0) {
	            if (evt && evt.preventDefault) {
	                evt.preventDefault();
	            } else if (event) {
	                // IE uses the global event variable
	                event.returnValue = false;
	            }
	        }
	
	        return true;
	    };
	
	    /*
	     * @private
	     * Looks at the fields value and evaluates it against the given rules
	     */
	
	    FormValidator.prototype._validateField = function(field) {
	        var i, j,
	            rules = field.rules.split('|'),
	            indexOfRequired = field.rules.indexOf('required'),
	            isEmpty = (!field.value || field.value === '' || field.value === undefined);
	
	        /*
	         * Run through the rules and execute the validation methods as needed
	         */
	
	        for (i = 0, ruleLength = rules.length; i < ruleLength; i++) {
	            var method = rules[i],
	                param = null,
	                failed = false,
	                parts = ruleRegex.exec(method);
	
	            /*
	             * If this field is not required and the value is empty, continue on to the next rule unless it's a callback.
	             * This ensures that a callback will always be called but other rules will be skipped.
	             */
	
	            if (indexOfRequired === -1 && method.indexOf('!callback_') === -1 && isEmpty) {
	                continue;
	            }
	
	            /*
	             * If the rule has a parameter (i.e. matches[param]) split it out
	             */
	
	            if (parts) {
	                method = parts[1];
	                param = parts[2];
	            }
	
	            if (method.charAt(0) === '!') {
	                method = method.substring(1, method.length);
	            }
	
	            /*
	             * If the hook is defined, run it to find any validation errors
	             */
	
	            if (typeof this._hooks[method] === 'function') {
	                if (!this._hooks[method].apply(this, [field, param])) {
	                    failed = true;
	                }
	            } else if (method.substring(0, 9) === 'callback_') {
	                // Custom method. Execute the handler if it was registered
	                method = method.substring(9, method.length);
	
	                if (typeof this.handlers[method] === 'function') {
	                    if (this.handlers[method].apply(this, [field.value, param, field]) === false) {
	                        failed = true;
	                    }
	                }
	            }
	
	            /*
	             * If the hook failed, add a message to the errors array
	             */
	
	            if (failed) {
	                // Make sure we have a message for this rule
	                var source = this.messages[field.name + '.' + method] || this.messages[method] || defaults.messages[method],
	                    message = 'An error has occurred with the ' + field.display + ' field.';
	
	                if (source) {
	                    message = source.replace('%s', field.display);
	
	                    if (param) {
	                        message = message.replace('%s', (this.fields[param]) ? this.fields[param].display : param);
	                    }
	                }
	
	                var existingError;
	                for (j = 0; j < this.errors.length; j += 1) {
	                    if (field.id === this.errors[j].id) {
	                        existingError = this.errors[j];
	                    }
	                }
	
	                var errorObject = existingError || {
	                    id: field.id,
	                    display: field.display,
	                    element: field.element,
	                    name: field.name,
	                    message: message,
	                    messages: [],
	                    rule: method
	                };
	                errorObject.messages.push(message);
	                if (!existingError) this.errors.push(errorObject);
	            }
	        }
	    };
	
	    /**
	     * private function _getValidDate: helper function to convert a string date to a Date object
	     * @param date (String) must be in format yyyy-mm-dd or use keyword: today
	     * @returns {Date} returns false if invalid
	     */
	    FormValidator.prototype._getValidDate = function(date) {
	        if (!date.match('today') && !date.match(dateRegex)) {
	            return false;
	        }
	
	        var validDate = new Date(),
	            validDateArray;
	
	        if (!date.match('today')) {
	            validDateArray = date.split('-');
	            validDate.setFullYear(validDateArray[0]);
	            validDate.setMonth(validDateArray[1] - 1);
	            validDate.setDate(validDateArray[2]);
	        }
	        return validDate;
	    };
	
	    /*
	     * @private
	     * Object containing all of the validation hooks
	     */
	
	    FormValidator.prototype._hooks = {
	        required: function(field) {
	            var value = field.value;
	
	            if ((field.type === 'checkbox') || (field.type === 'radio')) {
	                return (field.checked === true);
	            }
	
	            return (value !== null && value !== '');
	        },
	
	        "default": function(field, defaultName){
	            return field.value !== defaultName;
	        },
	
	        matches: function(field, matchName) {
	            var el = this.form[matchName];
	
	            if (el) {
	                return field.value === el.value;
	            }
	
	            return false;
	        },
	
	        valid_email: function(field) {
	            return emailRegex.test(field.value);
	        },
	
	        valid_emails: function(field) {
	            var result = field.value.split(/\s*,\s*/g);
	
	            for (var i = 0, resultLength = result.length; i < resultLength; i++) {
	                if (!emailRegex.test(result[i])) {
	                    return false;
	                }
	            }
	
	            return true;
	        },
	
	        min_length: function(field, length) {
	            if (!numericRegex.test(length)) {
	                return false;
	            }
	
	            return (field.value.length >= parseInt(length, 10));
	        },
	
	        max_length: function(field, length) {
	            if (!numericRegex.test(length)) {
	                return false;
	            }
	
	            return (field.value.length <= parseInt(length, 10));
	        },
	
	        exact_length: function(field, length) {
	            if (!numericRegex.test(length)) {
	                return false;
	            }
	
	            return (field.value.length === parseInt(length, 10));
	        },
	
	        greater_than: function(field, param) {
	            if (!decimalRegex.test(field.value)) {
	                return false;
	            }
	
	            return (parseFloat(field.value) > parseFloat(param));
	        },
	
	        less_than: function(field, param) {
	            if (!decimalRegex.test(field.value)) {
	                return false;
	            }
	
	            return (parseFloat(field.value) < parseFloat(param));
	        },
	
	        alpha: function(field) {
	            return (alphaRegex.test(field.value));
	        },
	
	        alpha_numeric: function(field) {
	            return (alphaNumericRegex.test(field.value));
	        },
	
	        alpha_dash: function(field) {
	            return (alphaDashRegex.test(field.value));
	        },
	
	        numeric: function(field) {
	            return (numericRegex.test(field.value));
	        },
	
	        integer: function(field) {
	            return (integerRegex.test(field.value));
	        },
	
	        decimal: function(field) {
	            return (decimalRegex.test(field.value));
	        },
	
	        is_natural: function(field) {
	            return (naturalRegex.test(field.value));
	        },
	
	        is_natural_no_zero: function(field) {
	            return (naturalNoZeroRegex.test(field.value));
	        },
	
	        valid_ip: function(field) {
	            return (ipRegex.test(field.value));
	        },
	
	        valid_base64: function(field) {
	            return (base64Regex.test(field.value));
	        },
	
	        valid_url: function(field) {
	            return (urlRegex.test(field.value));
	        },
	
	        valid_credit_card: function(field){
	            // Luhn Check Code from https://gist.github.com/4075533
	            // accept only digits, dashes or spaces
	            if (!numericDashRegex.test(field.value)) return false;
	
	            // The Luhn Algorithm. It's so pretty.
	            var nCheck = 0, nDigit = 0, bEven = false;
	            var strippedField = field.value.replace(/\D/g, "");
	
	            for (var n = strippedField.length - 1; n >= 0; n--) {
	                var cDigit = strippedField.charAt(n);
	                nDigit = parseInt(cDigit, 10);
	                if (bEven) {
	                    if ((nDigit *= 2) > 9) nDigit -= 9;
	                }
	
	                nCheck += nDigit;
	                bEven = !bEven;
	            }
	
	            return (nCheck % 10) === 0;
	        },
	
	        is_file_type: function(field,type) {
	            if (field.type !== 'file') {
	                return true;
	            }
	
	            var ext = field.value.substr((field.value.lastIndexOf('.') + 1)),
	                typeArray = type.split(','),
	                inArray = false,
	                i = 0,
	                len = typeArray.length;
	
	            for (i; i < len; i++) {
	                if (ext.toUpperCase() == typeArray[i].toUpperCase()) inArray = true;
	            }
	
	            return inArray;
	        },
	
	        greater_than_date: function (field, date) {
	            var enteredDate = this._getValidDate(field.value),
	                validDate = this._getValidDate(date);
	
	            if (!validDate || !enteredDate) {
	                return false;
	            }
	
	            return enteredDate > validDate;
	        },
	
	        less_than_date: function (field, date) {
	            var enteredDate = this._getValidDate(field.value),
	                validDate = this._getValidDate(date);
	
	            if (!validDate || !enteredDate) {
	                return false;
	            }
	
	            return enteredDate < validDate;
	        },
	
	        greater_than_or_equal_date: function (field, date) {
	            var enteredDate = this._getValidDate(field.value),
	                validDate = this._getValidDate(date);
	
	            if (!validDate || !enteredDate) {
	                return false;
	            }
	
	            return enteredDate >= validDate;
	        },
	
	        less_than_or_equal_date: function (field, date) {
	            var enteredDate = this._getValidDate(field.value),
	                validDate = this._getValidDate(date);
	
	            if (!validDate || !enteredDate) {
	                return false;
	            }
	
	            return enteredDate <= validDate;
	        }
	    };
	
	    window.FormValidator = FormValidator;
	})(window, document);
	
	/*
	 * Export as a CommonJS module
	 */
	if (typeof module !== 'undefined' && module.exports) {
	    module.exports = FormValidator;
	}


/***/ },
/* 6 */
/*!*******************************************!*\
  !*** ./~/es6-promise/dist/es6-promise.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */
	
	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }
	
	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }
	
	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }
	
	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }
	
	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;
	
	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }
	
	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }
	
	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }
	
	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';
	
	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });
	
	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }
	
	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }
	
	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }
	
	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];
	
	        callback(arg);
	
	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }
	
	      lib$es6$promise$asap$$len = 0;
	    }
	
	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(/*! vertx */ 9);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }
	
	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;
	
	      var child = new this.constructor(lib$es6$promise$$internal$$noop);
	
	      if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
	        lib$es6$promise$$internal$$makePromise(child);
	      }
	
	      var state = parent._state;
	
	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }
	
	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);
	
	    function lib$es6$promise$$internal$$noop() {}
	
	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;
	
	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }
	
	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }
	
	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;
	
	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }
	
	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }
	
	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }
	
	      lib$es6$promise$$internal$$publish(promise);
	    }
	
	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	
	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;
	
	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }
	
	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;
	
	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }
	
	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;
	
	      parent._onerror = null;
	
	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;
	
	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;
	
	      if (subscribers.length === 0) { return; }
	
	      var child, callback, detail = promise._result;
	
	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];
	
	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }
	
	      promise._subscribers.length = 0;
	    }
	
	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }
	
	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;
	
	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);
	
	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }
	
	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }
	
	      } else {
	        value = detail;
	        succeeded = true;
	      }
	
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }
	
	    var lib$es6$promise$$internal$$id = 0;
	    function lib$es6$promise$$internal$$nextId() {
	      return lib$es6$promise$$internal$$id++;
	    }
	
	    function lib$es6$promise$$internal$$makePromise(promise) {
	      promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
	      promise._state = undefined;
	      promise._result = undefined;
	      promise._subscribers = [];
	    }
	
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        return new Constructor(function(resolve, reject) {
	          reject(new TypeError('You must pass an array to race.'));
	        });
	      } else {
	        return new Constructor(function(resolve, reject) {
	          var length = entries.length;
	          for (var i = 0; i < length; i++) {
	            Constructor.resolve(entries[i]).then(resolve, reject);
	          }
	        });
	      }
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
	
	
	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }
	
	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }
	
	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.
	
	      Terminology
	      -----------
	
	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.
	
	      A promise can be in one of three states: pending, fulfilled, or rejected.
	
	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.
	
	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.
	
	
	      Basic Usage:
	      ------------
	
	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);
	
	        // on failure
	        reject(reason);
	      });
	
	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Advanced Usage:
	      ---------------
	
	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.
	
	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();
	
	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();
	
	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }
	
	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Unlike callbacks, promises are great composable primitives.
	
	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON
	
	        return values;
	      });
	      ```
	
	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
	      this._result = this._state = undefined;
	      this._subscribers = [];
	
	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }
	
	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
	
	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,
	
	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	
	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	
	      Chaining
	      --------
	
	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	
	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	
	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	
	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	
	      Assimilation
	      ------------
	
	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	
	      If the assimliated promise rejects, then the downstream promise will also reject.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	
	      Simple Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var result;
	
	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	
	      Advanced Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var author, books;
	
	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	
	      function foundBooks(books) {
	
	      }
	
	      function failure(reason) {
	
	      }
	
	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,
	
	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	
	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	
	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	
	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
	        lib$es6$promise$$internal$$makePromise(this.promise);
	      }
	
	      if (lib$es6$promise$utils$$isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;
	
	        this._result = new Array(this.length);
	
	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
	      }
	    }
	
	    function lib$es6$promise$enumerator$$validationError() {
	      return new Error('Array Methods must be provided an Array');
	    }
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;
	
	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;
	
	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);
	
	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;
	
	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;
	
	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }
	
	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;
	
	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;
	
	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }
	
	      var P = local.Promise;
	
	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }
	
	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
	
	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };
	
	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(/*! !webpack amd define */ 10)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }
	
	    lib$es6$promise$polyfill$$default();
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 7), (function() { return this; }()), __webpack_require__(/*! ./../../webpack/buildin/module.js */ 8)(module)))

/***/ },
/* 7 */
/*!******************************!*\
  !*** ./~/process/browser.js ***!
  \******************************/
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 8 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 9 */
/*!***********************!*\
  !*** vertx (ignored) ***!
  \***********************/
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 10 */
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 11 */
/*!****************************************************!*\
  !*** ./~/isomorphic-fetch/fetch-npm-browserify.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(/*! whatwg-fetch */ 12);
	module.exports = self.fetch.bind(self);


/***/ },
/* 12 */
/*!*********************************!*\
  !*** ./~/whatwg-fetch/fetch.js ***!
  \*********************************/
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this)
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }
	
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return;
	      }
	
	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map