import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './profile.html';

Template.profile.onRendered(function() {
	this.find('#profile-name').value = Meteor.user().profile.name;
	this.find('#profile-email').value = Meteor.user().emails[0].address;
});

Template.profile.events({

	"submit #profile-form": function (event, template) {
		event.preventDefault();

		var name = template.find('#profile-name').value;
		var email = template.find('#profile-email').value;

		Meteor.users.update(Meteor.userId(), {
			$set: {'profile.name': name, 'emails.0.address': email }
		},function (error) {
			if (error) {
				Bert.alert( TAPi18n.__('auth.'+error.reason), 'danger');
			}else{
				Bert.alert( 'Perfil atualizado com sucesso', 'success');
			}
		});
	},

	"submit #profile-update-password": function (event, template) {
		event.preventDefault();

		var oldPassword 		= template.find('#profile-old-password').value;
		var password 			= template.find('#profile-password').value;
		var passwordRepeated 	= template.find('#profile-confirm-password').value;

		var digest = Package.sha.SHA256( oldPassword );

Meteor.call('notHavePassword', function(err, result) {
	console.log(result);

})
		Meteor.call('checkPassword', digest, function(err, result) {
			if (result) {
				
				if (password !== passwordRepeated) {
					Bert.alert({
						title: TAPi18n.__('auth.PASSWORD_DOES_NOT_MATCH'),
						type: 'danger',
					});
				}else{
					Accounts.changePassword(oldPassword,password , function (error) {
						if (error) {
							Bert.alert( TAPi18n.__('auth.ERROR_LOGGING_IN'), 'danger');
						} else {
							Bert.alert( TAPi18n.__('Senha alterada com sucesso!'), 'success');
							template.find('#profile-old-password').value = '';
							template.find('#profile-password').value = '';
							template.find('#profile-confirm-password').value = '';
						}
					});
				}
			}else{
				Bert.alert({
					title: 'Senha atual não confere!',
					type: 'danger',
				});

			}
		});

	}

});