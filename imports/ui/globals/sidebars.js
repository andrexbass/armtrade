import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

Template.sidebar.helpers({
    userId: function () {
        var user = Meteor.user();
        if (user && user._id) {
            return user._id;
        } else {
            return "";
        }
    },
    userName: function () {
        return Meteor.user().profile.name;
    },
    userEmail: function () {
        return Meteor.user().emails[0].address;
    }
});

if (Meteor.isClient) {
    Template.sidebar.events({
        'click nav.sidebar li a': function () {
            $('body').removeClass('aside-toggled');
        }
    });
}