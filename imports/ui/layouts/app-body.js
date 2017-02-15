import { Template } from "meteor/templating";
import "../globals/app.init.js";
import "../globals/custom.js";
import "../components/angle/modules/bootstrap-start.js";
import "../components/angle/modules/clear-storage.js";
import "../components/angle/modules/constants.js";
import "../components/angle/modules/localize.js";
import "../components/angle/modules/navbar-search.js";
import "../components/angle/modules/sidebar.js";
import "../components/angle/modules/toggle-state.js";
import "../components/angle/modules/utils.js";
import "../components/avatar/avatar.js";
import "../globals/footer.html";
import "../globals/sidebar.html";
import "../globals/auth/profile.js";
import "../globals/topnavbar.html";
import "./app-body.html";

Session.setDefault('isFloatingButtonRequired', false); //Cria variável de sessão para habilitar o botão flutuante
/**
 * @desc   regista a variável helper isFloatingButtonRequired com o parâmetro da variável de sessão com o mesmo nome
 * @author Daniel Fiuza <danielfiuza01@gmail.com>
 * @since  06/02/2016
 */
 Template.registerHelper('isFloatingButtonRequired', function(input) {
 	return Session.get("isFloatingButtonRequired");
 });
 /**/
 Template.layout.rendered = function() {
 	setTimeout(function() {
 		App.run();
 	}, 100)
 }

 Template.layout.helpers({
 	hammerInitOptions: {
 		cssProps: { userSelect: 'all' }
 	},
 	templateGestures: {
 		'tap #touchArea': function(event, templateInstance) { console.log('tapped') },
 		'swiperight #touchArea': function(event, templateInstance) {
 			$(".aside-collapsed").addClass('aside-toggled');
 			console.log('swiped right');
 		},
 		'swipeleft #touchArea': function(event, templateInstance) {
 			$(".aside-collapsed").removeClass('aside-toggled');
 			console.log('swiped left');
 		}
 	}
 });
