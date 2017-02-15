import { Template } from 'meteor/templating';
import '../globals/app.init';
import '../globals/auth/socialLogin';
import '../globals/auth/login';
import '../globals/auth/recoverPassword';
import './app-login.html';

Template.loginLayout.rendered = function () {
    setTimeout(function () {
        App.run();
    }, 100)
}