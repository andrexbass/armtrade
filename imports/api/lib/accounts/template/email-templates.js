import {Accounts} from 'meteor/accounts-base';

const name = 'Social BoardGame';
const email = '<support@socialboardgame.com>';
const from = `${name} ${email}`;
const emailTemplates = Accounts.emailTemplates;

emailTemplates.siteName = name;
emailTemplates.from = from;

emailTemplates.resetPassword = {
    subject() {
        return TAPi18n.__('auth.Reset Your Password', {
            name: name,
        });
    },
    text(user, url) {
        const userEmail = user.emails[0].address;
        const urlWithoutHash = url.replace('#/', '');

        return TAPi18n.__('auth.Email text forgot password', {
            userEmail: userEmail,
            urlWithoutHash: urlWithoutHash,
            email: email
        });
    },
};

emailTemplates.verifyEmail = {
    subject() {
        return `[${name}] Verify Your Email Address`;
    },
    text(user, url) {
        const userEmail = user.emails[0].address;
        const urlWithoutHash = url.replace('#/', '');
        return `To verify your email address (${userEmail}) visit the following link:\n\n${urlWithoutHash}\n\n 
            If you did not request this verification, please ignore this email. If you feel something is wrong, 
            please contact our support team: ${email}.`;
    }
};