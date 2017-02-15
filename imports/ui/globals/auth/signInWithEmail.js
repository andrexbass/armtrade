import {Template} from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import './signInWithEmail.html';

Template.signInWithEmail.events({
    "submit #signup-form": function (event, template) {
        event.preventDefault();
        var password = template.find('#signup-password').value;
        passwordRepeated = template.find('#signup-confirm-password').value;

        if (password !== passwordRepeated) {
            Bert.alert({
                title: TAPi18n.__('auth.PASSWORD_DOES_NOT_MATCH'),
                type: 'danger',
            });
        }else{
            Accounts.createUser({
                email: template.find("#signup-email").value,
                password: template.find("#signup-password").value,
                profile: {
                    name: template.find("#signup-name").value,
                }
            }, function (error) {
                if (error) {
                    Bert.alert( TAPi18n.__('auth.ERROR_LOGGING_IN'), 'danger');
                } else {
                    Bert.alert( TAPi18n.__('auth.SUCCESSFUL_REGISTRATION'), 'success');
                    Router.go('login');
                }
            });
        }
    }
});