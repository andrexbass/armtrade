const emailConf = Meteor.settings.private.emailConf;
const login = emailConf.login;
const password = emailConf.password;
const smtpdomain = emailConf.smtpdomain;

process.env.MAIL_URL = `smtp://${login}:${password}@${smtpdomain}:587/`; //465