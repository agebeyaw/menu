import {Validator} from '../utils/validator';

import {PubSub} from '../utils/pubsub';

import {EVENTS} from '../utils/events';

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

const {hasSize} = Validator;

let initialState = true;

/**
 * @const CSS_NS Define the namespace used in CSS to identify the block
 * @type {string}
 */
const CSS_NS = 'js-social-login';

const defaultSelectors = {
    name: '#first-name',

    lastName: '#last-name',

    email: '#email',
};

/**
 * @class SocialLogin
 * @desc Manage automatic fetching data if you are logged in with a social account
 * @type {object}
 */

export const SocialLogin = {

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

                FB.login(this.handleFbResponse.bind(this), {scope: FB_PERMISSIONS});
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
            appId: FB_APP_ID, // App ID
            channelUrl: FB_CHANNEL_URL, // Channel File
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
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

                auth2.signIn().then(
                    () => {

                        obj.autoFillForm(auth2.currentUser.get().getBasicProfile());

                    }
                );

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

        return (hasSize(this.$socialNameField) || hasSize(this.$socialLastnameField) || hasSize(this.$socialEmailField));

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

        this.subscribed = [
            PubSub.subscribe(EVENTS.mfp_open, () => {

                this.init(this.selectors);

            }),

            PubSub.subscribe(EVENTS.aida_modal_open, () => {

                this.init(this.selectors);

            }),
        ];

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
