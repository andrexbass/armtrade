import { Match } from 'meteor/check'
import './template/email-templates'

Meteor.methods({
	'accounts.updateEmail'(email){
		Meteor.users.update(Meteor.userId(), {
			$set: {'emails.0.address': email}
		})
	},
	'checkPassword'(digest) {
		check(digest, String);

		if (this.userId) {
			var user = Meteor.user();
			var password = {digest: digest, algorithm: 'sha-256'};
			var result = Accounts._checkPassword(user, password);
			return result.error == null;
		} else {
			return false;
		}
	},
	'notHavePassword'() {
		if (this.userId) {
			return Match.test(Meteor.user().services.password, undefined);  
		} else {
			return false;
		}
	}
});

var _setBrowserPolicies = () => {

};