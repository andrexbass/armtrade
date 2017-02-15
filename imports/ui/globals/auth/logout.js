import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './logout.html';

Template.logout.events({
    'click .logout': function(event){
        event.preventDefault();

        Meteor.logout(function(error) {
            if(error) {

            }else{
                Router.go('login');
            }
        });
    }
});