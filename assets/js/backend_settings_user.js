/* ----------------------------------------------------------------------------
 * Easy!Appointments - Qulph Shop (https://qulph.com)
 *

 * ---------------------------------------------------------------------------- */

(function () {

    'use strict';

    /**
     * "User Settings" Tab Helper Class
     *
     * @class UserSettings
     */
    var UserSettings = function () {
    };

    /**
     * Get the settings data for the user settings.
     *
     * @returns {Object} Returns the user settings array.
     */
    UserSettings.prototype.get = function () {
        var user = {
            id: $('#user-id').val(),
            first_name: $('#first-name').val(),
            last_name: $('#last-name').val(),
            email: $('#email').val(),
            mobile_number: $('#mobile-number').val(),
            phone_number: $('#phone-number').val(),
            address: $('#address').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            zip_code: $('#zip-code').val(),
            notes: $('#notes').val(),
            settings: {
                username: $('#username').val(),
                notifications: $('#user-notifications').hasClass('active'),
                calendar_view: $('#calendar-view').val(),
                address_show: $('#address_show').prop('checked'),
                whatsapp_click_to_chat_link: $('#whatsapp_click_to_chat_link').val(),
                provider_logo_url: $('#provider_logo_url').val(),
                max_people_in_appointment: $('#max_people_in_appointment').val(),
                enable_social_login: $('#enable_social_login').prop('checked'),
            }
        };

        if ($('#password').val() != '') {
            user.settings.password = $('#password').val();
        }

        return user;
    };

    /**
     * Store the user settings into the database.
     *
     * @param {Array} settings Contains the user settings.
     */
    UserSettings.prototype.save = function (settings) {
        if (!this.validate(settings)) {
            Backend.displayNotification(EALang.user_settings_are_invalid);
            return; // Validation failed, do not proceed.
        }

        var postUrl = GlobalVariables.baseUrl + '/backend_api/ajax_save_settings';
        var postData = {
            csrfToken: GlobalVariables.csrfToken,
            type: BackendSettings.SETTINGS_USER,
            settings: JSON.stringify(settings)
        };

        $.post(postUrl, postData, function (response) {
            if (!GeneralFunctions.handleAjaxExceptions(response)) {
                return;
            }

            Backend.displayNotification(EALang.settings_saved);

            // Update footer greetings.
            $('#footer-user-display-name').text('Hello, ' + $('#first-name').val() + ' ' + $('#last-name').val() + '!');

        }, 'json').fail(GeneralFunctions.ajaxFailureHandler);
    };

    /**
     * Validate the settings data.
     *
     * If the validation fails then display a message to the user.
     *
     * @return {Boolean} Returns the validation result.
     */
    UserSettings.prototype.validate = function () {
        $('#user .has-error').removeClass('has-error');

        try {
            // Validate required fields.
            var missingRequired = false;
            $('#user .required').each(function () {
                if ($(this).val() === '' || $(this).val() === undefined) {
                    $(this).closest('.form-group').addClass('has-error');
                    missingRequired = true;
                }
            });

            if (missingRequired) {
                throw EALang.fields_are_required;
            }

            // Validate passwords (if provided).
            if ($('#password').val() != $('#retype-password').val()) {
                $('#password, #retype-password').closest('.form-group').addClass('has-error');
                throw EALang.passwords_mismatch;
            }

            // Validate user email.
            if (!GeneralFunctions.validateEmail($('#email').val())) {
                $('#email').closest('.form-group').addClass('has-error');
                throw EALang.invalid_email;
            }

            if ($('#username').attr('already-exists') === 'true') {
                $('#username').closest('.form-group').addClass('has-error');
                throw EALang.username_already_exists;
            }

            return true;
        } catch (exc) {
            Backend.displayNotification(exc);
            return false;
        }
    };

    window.UserSettings = UserSettings;

})();
