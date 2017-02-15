import {Template} from 'meteor/templating';
import {Accounts} from 'meteor/accounts-base'
import {Session} from 'meteor/session'
import './recoverPassword.html'

if (Accounts._resetPasswordToken) {
    Session.set('resetPasswordToken', Accounts._resetPasswordToken);
}

Template.RecoverPassword.helpers({
    resetPassword: function () {
        return Session.get('resetPasswordToken');
    }
});

Template.RecoverPassword.events({

    'submit #forgot-password': function (event, template) {
        event.preventDefault();

        var email = template.find('#user-email').value, message;
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

        if (email == '' || !re.test(email)) {
            message = TAPi18n.__('generic.PLEASE_ENTER_VALID_EMAIL_ADDRESS')
            Bert.alert(message, 'danger');
        } else {

            new Accounts.forgotPassword({email},
                function (error) {
                    if (error) {
                        Bert.alert(TAPi18n.__('auth.'+error.reason), 'danger');
                    } else {
                        Bert.alert(TAPi18n.__('auth.Sent a reset pass, word link to ',{email:email}), 'success');
                    }
                }
            );
        }
        return false;
    },

    'submit #set-new-password': function (event, template) {
        event.preventDefault();
        var password = template.find('#new-password').value;

        Accounts.resetPassword(
            Session.get('resetPasswordToken'),
            password,
            function (error) {
                if (err) {
                    Bert.alert(TAPi18n.__('auth.There was a problem resetting your password'), 'danger');
                } else {
                    Session.set('resetPasswordToken', null);
                }
            })
        return false;
    }
});