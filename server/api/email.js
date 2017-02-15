import {Meteor} from "meteor/meteor";

var options = {
    apiKey: 'key-6994dce77b75d42e240bb4a8956d16d3',
    domain: 'sandbox8d02008c85a54cbfb5f499bb1b7976d1.mailgun.org'
}

Meteor.methods({
  'email.send'(mail) {
    var Dispacher = new Mailgun(options);
    Dispacher.send({
      'to': mail.to,
      'from': 'Mailgun Sandbox <postmaster@sandbox8d02008c85a54cbfb5f499bb1b7976d1.mailgun.org>',
      'html': '<html><head></head><body>'+mail.text+'</body></html>',
      'subject': mail.subject
    });
  }
});