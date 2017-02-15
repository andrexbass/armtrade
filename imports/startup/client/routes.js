import {Meteor} from 'meteor/meteor';

import '../../ui/layouts/app-body';
import '../../ui/layouts/app-login';
import '../../ui/layouts/app-not-found.html';

import '../../ui/pages/main/main';

import '../../ui/globals/app.init';
import '../../ui/globals/custom';
import '../../ui/globals/sidebars';
import '../../ui/globals/topnavbar';
import '../../ui/globals/auth/login';
import '../../ui/globals/auth/logout';
import '../../ui/globals/auth/loginForm';
import '../../ui/globals/auth/signInWithEmail';

var titleSocial = 'ArmTrade - Analysis of information for trade operations';

// Configure routes
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

// Autenticate routes
Router.plugin('auth', {
    except: [
        'login',
        'signInWithEmail',
        'recoverPassword',
        'main'
    ]
});

// Maping of routes
Router.map(function () {

    this.route('main', {
        path: '/'
    });

    this.route('signInWithEmail', {
        path: '/signInWithEmail',
        layoutTemplate: 'loginLayout'
    });

    this.route('recoverPassword', {
        path: '/recoverPassword',
        layoutTemplate: 'loginLayout'
    });

    this.route('login', {
        path: '/login',
        layoutTemplate: 'loginLayout',
        onRun: function () {
            var currentUser = Meteor.userId();
            if (currentUser) {
                Router.go('dashboard');
            } else {
                this.render("login");
            }
        }
    });

    this.route('logout', function () {
        path: '/logout'
    });

    this.route('profile', {
        path: '/profile'
    });
});
