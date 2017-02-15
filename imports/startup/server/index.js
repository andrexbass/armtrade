import '../../api/lib/modules/_modules';
import '../../api/lib/services-config';
import '../../api/lib/email-smtp-config';
import '../../api/lib/accounts/accounts';
import '../../api/lib/register-api';

Meteor.startup(function () {
    Modules.server.configureServices();
});