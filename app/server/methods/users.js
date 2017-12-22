Meteor.methods({
  addUser (user) {
    // Add new user
    var userId = Accounts.createUser(user);

    return userId;
  },
  addUsersAndSendEnrollmentEmails (enrollmentDocument) {
    // original example: https://stackoverflow.com/a/16098693/1191545

    // Make sure mail configuration is present
    if (!process.env.MAIL_URL) {
      throw new Meteor.Error('MailConfigurationError', 'No mail settings available.')
    }

    // Make sure 'from email' address was provied by environmental variable
    if (!process.env.FROM_EMAIL) {
      throw new Meteor.Error('MailConfigurationError', 'No from email address available.')
    }

    // Set the from email address
    Accounts.emailTemplates.from = process.env.FROM_EMAIL;

    // Set enrollment subject from document
    Accounts.emailTemplates.enrollAccount.subject = (user) => {
      return enrollmentDocument.subject;
    }

    // Set enrollment message from document
    Accounts.emailTemplates.enrollAccount.text = (user, url) => {
      return `${ enrollmentDocument.message } \n\n ${ url }`;
    }

    // Get emails from enrollment document
    const emailAddresses = enrollmentDocument.emailAddresses;

    // Create user and send enrollment email for each email address
    emailAddresses.forEach((emailAddress) => {
      // Create a user with current email address
      const userId = Accounts.createUser({
        email: emailAddress
      });

      // Send enrollment email to newly created user
      Accounts.sendEnrollmentEmail(userId);
    });
  },
  addUserToAdminRole (userId) {
    // Add user to admin role
    Roles.addUsersToRoles(userId, "admin");
  },
  deleteUser (user) {
    console.log(user);
    // Make sure user object provided with '_id' property
    check(user, Object);
    check(user._id, String);

    // Get current user id, for security check
    const currentUserId = this.userId;

    // Make sure current user has 'admin' role
    if (Roles.userIsInRole(currentUserId, 'admin')) {
      // Make sure user can't delete own Account
      if (currentUserId !== user._id) {
        // If safe, delete provided user Object
        Meteor.users.remove(user);
      }
    }
  },
  editUserFormSubmit (user) {
    // Get user email
    var userEmail = user.email;

    var userId = user._id;

    // Edit user, setting first email
    Meteor.users.update(userId, {$set: {"emails.0.address": userEmail}});

    return userId;
  },
  removeUserFromAdminRole (userId) {
    // Add user to admin role
    Roles.removeUsersFromRoles(userId, "admin");
  }
});
