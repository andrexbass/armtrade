import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';
import './socialLogin.html';

Template.socialLogin.events({
    'click [data-social-login]' (event) {
        const service = event.target.getAttribute('data-social-login'),
            options = {
                requestPermissions: ['email']
            };
        Meteor[service](options, (error) => {
            if (error) {
                Bert.alert( TAPi18n.__('login.ERROR_LOGGING_IN'), 'danger');
            } else {
                var email = Meteor.user().services.facebook.email;
                Meteor.call('accounts.updateEmail', email);
                Router.go('dashboard');
            }
        });
    }
});