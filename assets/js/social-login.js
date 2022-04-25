/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/social-login/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/social-login/main.js":
/*!****************************************!*\
  !*** ./assets/js/social-login/main.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _social_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./social-login */ "./assets/js/social-login/social-login.js");

const selectors = {
  name: '#first-name',
  lastName: '#last-name',
  email: '#email'
};
_social_login__WEBPACK_IMPORTED_MODULE_0__["SocialLogin"].init(selectors);

/***/ }),

/***/ "./assets/js/social-login/social-login.js":
/*!************************************************!*\
  !*** ./assets/js/social-login/social-login.js ***!
  \************************************************/
/*! exports provided: SocialLogin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialLogin", function() { return SocialLogin; });
/* harmony import */ var _utils_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/validator */ "./assets/js/utils/validator.js");
/* harmony import */ var _utils_pubsub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/pubsub */ "./assets/js/utils/pubsub.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/events */ "./assets/js/utils/events.js");



/**
 * assign jQuery class to $ symbol
 *
 * @type {Object}
 */

const $ = window.jQuery;
const credentials = typeof socialCredentials === 'undefined' ? {} : socialCredentials;
const FB_APP_ID = credentials.facebook_app_id || '174469693108497';
const FB_PERMISSIONS = 'email';
const FB_CHANNEL_URL = 'http://www.example.it/channel.html';
const GOOGLE_API_KEY = credentials.google_app_secret || 'QEd84F_oFZiry9qKQGjhLxaB';
const GOOGLE_CLIENT_ID = credentials.google_app_id || '1025555425580-k054fjh3adrc62k5sfvlacqt0s9ggdg1.apps.googleusercontent.com';
const GOOGLE_PERMISSIONS = 'profile';
/**
 * Facebook API uses language codes in ll_CC format.
 */

const LANG = document.documentElement.lang.replace('-', '_') || 'en_US';
const {
  hasSize
} = _utils_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"];
let initialState = true;
/**
 * @const CSS_NS Define the namespace used in CSS to identify the block
 * @type {string}
 */

const CSS_NS = 'js-social-login';
const defaultSelectors = {
  name: '#first-name',
  lastName: '#last-name',
  email: '#email'
};
/**
 * @class SocialLogin
 * @desc Manage automatic fetching data if you are logged in with a social account
 * @type {object}
 */

const SocialLogin = {
  selectors: null,
  activeSocials: {
    'facebook': {
      url: `//connect.facebook.net/${LANG}/all.js#xfbml=1&appId=${FB_APP_ID}`,
      id_tag: 'jssdk'
    },
    'google': {
      url: '//apis.google.com/js/platform.js',
      id_tag: 'jsapi'
    }
  },
  activeSocial: null,
  subscribed: [],

  /**
   * Gather the DOM elements
   * @method gatherDomElements
   *
   */
  gatherDomElements() {
    this.$socialNameField = $(this.selectors.name);
    this.$socialLastnameField = $(this.selectors.lastName);
    this.$socialEmailField = $(this.selectors.email);
  },

  /**
   * Autofill the form login data with the data received from the response
   * @method autoFillForm
   *
   */
  autoFillForm(response) {
    const $social = this.activeSocial,
          $fields = [this.$socialNameField, this.$socialLastnameField, this.$socialEmailField];
    let name, lastName, email;

    switch ($social) {
      case 'facebook':
        name = response.first_name || '';
        lastName = response.last_name || '';
        email = response.email || '';
        break;

      case 'google':
        name = response.getGivenName() || '';
        lastName = response.getFamilyName() || '';
        email = response.getEmail() || '';
        break;
    }

    this.$socialNameField.val(name);
    this.$socialLastnameField.val(lastName);
    this.$socialEmailField.val(email);
    $fields.forEach(el => {
      if (el.val() !== '' && el.hasClass('has-error')) {
        el.removeClass('has-error');
      }
    });
  },

  /**
   * Set the initial state of the social
   * @method setInitialState
   * @return Testimonials
   *
   */
  setInitialState(state) {
    initialState = state;
    return this;
  },

  /**
   * Check if the social is in initial state or not
   * @method isInitialState
   * @return boolean
   *
   */
  isInitialState() {
    return initialState;
  },

  /**
   * Handle the Facebook login status data call the autofill functions with the response
   * @method handleFbResponse
   *
   */
  handleFbResponse(response) {
    if (response.status === 'connected') {
      /**
       * The response object is returned with a status field that lets the app know the current
       * login status of the person. In this case, we're handling the situation where they
       * have logged in to the app.
       * */
      FB.api('/me?fields=first_name,last_name,email,picture', this.autoFillForm.bind(this));
    } else {
      /**
       * In this case, the person is not logged into Facebook, so we call the login()
       * function to prompt them to do so. Note that at this stage there is no indication
       * of whether they are logged into the app. If they aren't then they'll see the Login
       * dialog right after they log in to Facebook.
       */

      /**
       * Open the popup window only if the FB is in initial state (this is the first try to log in)
       * to prevent FB from trying to log you in again when you clicked on the close button
       */
      if (this.isInitialState()) {
        FB.login(this.handleFbResponse.bind(this), {
          scope: FB_PERMISSIONS
        });
        this.setInitialState(false);
      }
    }
  },

  /**
   * Initialize a Facebook object and gets the login status of the user
   * @method initFb
   *
   */
  initFb() {
    FB.init({
      appId: FB_APP_ID,
      // App ID
      channelUrl: FB_CHANNEL_URL,
      // Channel File
      status: true,
      // check login status
      cookie: true,
      // enable cookies to allow the server to access the session
      xfbml: true // parse XFBML

    });
    FB.getLoginStatus(this.handleFbResponse.bind(this), true);
    this.setInitialState(true);
  },

  /**
   * Initialize the auth2 Google API, try to sign in the user and get the data after it
   * @method initGoogle
   * @input object: the object to bind the function (should be always this)
   */
  initGoogle(obj) {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
        apiKey: GOOGLE_API_KEY,
        scopes: GOOGLE_PERMISSIONS
      });

      if (auth2.isSignedIn.get() === true) {
        obj.autoFillForm(auth2.currentUser.get().getBasicProfile());
      } else {
        auth2.signIn().then(() => {
          obj.autoFillForm(auth2.currentUser.get().getBasicProfile());
        });
      }
    });
  },

  /**
   * Initialize the request for the API corresponding to the clicked social media
   * @method initSocial
   * @input social: the name of the social media clicked
   *
   */
  initSocial(social) {
    this.activeSocial = social;

    switch (social) {
      case 'facebook':
        window.fbAsyncInit = this.initFb();
        break;

      case 'google':
        this.initGoogle(this);
        break;
    }
  },

  /**
   * Append the JS scripts for the social login for every social media that ahs a button on the page
   * @method appendScript
   *
   */
  appendScript() {
    const $scripts = $('script'),
          $buttonClass = `.${CSS_NS}__button--`;
    let $script, js;
    $.each(this.activeSocials, (key, value) => {
      const $id = `${key}-${value['id_tag']}`;
      $script = $scripts.find(`#${$id}`);

      if (!hasSize($script) && hasSize($($buttonClass + key))) {
        js = document.createElement('script');
        js.id = $id;
        js.async = true;
        js.src = value.url;
        $(js).appendTo('head');
      }
    });
  },

  /**
   * Return if we have a social login block with first name, last name and e-mail field or not
   * @method canInit
   * @return boolean
   *
   */
  canInit() {
    return hasSize(this.$socialNameField) || hasSize(this.$socialLastnameField) || hasSize(this.$socialEmailField);
  },

  /**
   * Remove all registered subscription.
   * @method removeSubscription
   */
  removeSubscription() {
    this.subscribed.forEach(e => e.remove());
  },

  /**
   * Create a click event listener for all the social buttons inside the testimonials block
   * @method observer
   */
  observer() {
    $.each(this.activeSocials, key => {
      const buttonClass = `.${CSS_NS}__button--${key}`;
      $(buttonClass).on('click', e => {
        e.preventDefault();
        this.initSocial(key);
      });
    });
    this.subscribed = [_utils_pubsub__WEBPACK_IMPORTED_MODULE_1__["PubSub"].subscribe(_utils_events__WEBPACK_IMPORTED_MODULE_2__["EVENTS"].mfp_open, () => {
      this.init(this.selectors);
    }), _utils_pubsub__WEBPACK_IMPORTED_MODULE_1__["PubSub"].subscribe(_utils_events__WEBPACK_IMPORTED_MODULE_2__["EVENTS"].aida_modal_open, () => {
      this.init(this.selectors);
    })];
  },

  init(selectors = {}) {
    this.selectors = Object.assign({}, defaultSelectors, selectors);
    this.gatherDomElements();
    this.removeSubscription();

    if (this.canInit()) {
      this.appendScript(CSS_NS);
      this.observer(CSS_NS);
    }
  }

};

/***/ }),

/***/ "./assets/js/utils/events.js":
/*!***********************************!*\
  !*** ./assets/js/utils/events.js ***!
  \***********************************/
/*! exports provided: default, EVENTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENTS", function() { return EVENTS; });
/**
 * @const EVENT_NS Define a custom namespace as a prefix for all events
 * @type {string}
 */
const EVENT_NS = '__QULHP__';
/* harmony default export */ __webpack_exports__["default"] = (EVENT_NS);
/**
 * @const EVENTS Collect app's custom events and lock down the collection by
 * passing it through `Object.freeze`
 * @type {Object}
 */

const EVENTS = Object.freeze({
  'aida_modal_open': `${EVENT_NS}AIDA:MODAL-OPEN`,
  'mfp_open': `${EVENT_NS}MFP:OPEN`
});

/***/ }),

/***/ "./assets/js/utils/pubsub.js":
/*!***********************************!*\
  !*** ./assets/js/utils/pubsub.js ***!
  \***********************************/
/*! exports provided: PubSub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PubSub", function() { return PubSub; });
/**
 * @class PubSub
 * @classdesc Small pub/sub system
 * @example:
 *
 *      PubSub.subscribe('event', data => {
 *           ...
 *		});
 *
 *	    PubSub.publish('event', {
 *	        ...
 *	    });
 */
const PubSub = {
  /**
   * @property {object} Store all the topics available
   */
  topics: window.globalBus || (window.globalBus = {}),

  /**
   * @method hasProps Check if a topic exists
   * @param {string} topic
   * @return {boolean}
   */
  hasProps(topic) {
    return this.topics.hasOwnProperty(topic);
  },

  /**
   * @method subscribe Subscribe to a specific topic
   * @param {string} topic the topic we're subscribing to
   * @param {function} handler the handler to run
   * @return {object} Utility to remove a topic from the store
   */
  subscribe(topic, handler) {
    // Create the topic's object if not yet created
    if (!this.hasProps(topic)) {
      this.topics[topic] = [];
    } // Add the handler to queue


    const index = this.topics[topic].push(handler) - 1; // Provide handle back for removal of topic

    return {
      remove: () => {
        delete this.topics[topic][index];
      }
    };
  },

  /**
   * @method publish Publish a specific topic
   * @param {string} topic the topic we're publishing
   * @param {object} data data to pass to the handler
   */
  publish(topic, data = {}) {
    if (!this.hasProps(topic)) {
      return;
    } // Cycle through this.topics queue & fire!


    this.topics[topic].forEach(item => item(data));
  }

};

/***/ }),

/***/ "./assets/js/utils/validator.js":
/*!**************************************!*\
  !*** ./assets/js/utils/validator.js ***!
  \**************************************/
/*! exports provided: Validator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validator", function() { return Validator; });
/**
 * @class Validator
 * @classdesc Validation rules to check inputs against
 */
const Validator = {
  /**
   * @method lte Check if a given value is
   * lesser then a comparison rule
   * @param  {String} str     Input value to be checked
   * @param  {Object} options Control options
   * @return {Boolean}
   */
  lte(str, options = {}) {
    return str <= options.min;
  },

  /**
   * @method gte Check if a given value is
   * greater then a comparison rule
   * @param  {String} str     Input value to be checked
   * @param  {Object} options Control options
   * @return {Boolean}
   */
  gte(str, options = {}) {
    return str >= options.min;
  },

  /**
   * @method isEmpty Check if a given string is empty
   * @param {String} str
   * @return {boolean}
   */
  isEmpty(str) {
    return str === '';
  },

  /**
   * @method isEmptyObj Check if a given object is empty
   * @param obj
   * @return {boolean}
   */
  isEmptyObj(obj) {
    return !Object.keys(obj).length;
  },

  /**
   * @method isEqualTo Check if a string is equal to a comparison value
   * @param {String} str
   * @param {Object} options
   * @return {boolean}
   */
  isEqualTo(str, options) {
    return str === options.compare;
  },

  /**
   * @method isUndefined Check if an element is undefined
   * @param {*} el
   * @return {boolean}
   */
  isUndefined(el) {
    return typeof el === 'undefined';
  },

  /**
   * @method isNull Check if an element is null
   * @param {*} el
   * @return {boolean}
   */
  isNull(el) {
    return el === null;
  },

  /**
   * @method hasSize Check if an array is non empty
   * @param {Array} item
   * @return {boolean}
   */
  hasSize(item) {
    return !!item.length;
  },

  /**
   * @method hasOption Detect if a key is present into an object
   * @param {object} options
   * @param {string} key
   * @return {boolean}
   */
  hasOption(options, key) {
    return key in options;
  },

  /**
   * @method isNumber check if an item is a number (returns true even if it is of a string type)
   * @param {string} item
   * @return {boolean}
   */
  isNumber(item) {
    return !isNaN(item);
  },

  /**
   * @method isValidUrl check if a string is a valid URL
   * @param {string} url
   * @return {boolean}
   */
  isValidUrl(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    return pattern.test(url);
  },

  /**
   * @const oneOf
   * @description check if the provided enums includes the provided value. Basically is a wrapper of object that implements
   * include method
   *
   * @param enums array or string to be checked for a value inclusion
   * @param value value used that will searched in the enums
   *
   * @return {boolean} true if the value is included, false otherwise
   */
  oneOf(enums, value) {
    return enums.includes(value);
  }

};

/***/ })

/******/ });
//# sourceMappingURL=social-login.js.map