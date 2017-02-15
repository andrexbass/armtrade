import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import './loginForm.html';

Template.loginForm.events({
    "submit #login-form": function (event, template) {
        event.preventDefault();
        Meteor.loginWithPassword(
            template.find("#login-username").value,
            template.find("#login-password").value,
            function (error) {
                if (error) {
                    Bert.alert( TAPi18n.__('auth.'+error.reason), 'danger');
                } else {
                    Router.go('dashboard');
                }
            }
        );
    },
});