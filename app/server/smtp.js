Meteor.startup(function () {
  smtp = {
    username: 'mehtashailee21@gmail.com',   // eg: server@gentlenode.com
    password: '23january2@14',   // eg: 3eeP1gtizk5eziohfervU
    server: 'smtp.gmail.com',  // eg: mail.gandi.net
    port: 587
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  process.env.FROM_EMAIL = 'mehtashailee21@gmail.com';
});

// Set up Accounts email fields
Accounts.emailTemplates.from = 'Site Name <postmaster@example.com>';
Accounts.emailTemplates.siteName = 'Site Name';
