import { isCurrentUserAdmin } from '../utils/user';

function getEligibleManagerList(idsToFilter) {
  if (!isCurrentUserAdmin()) {
    return [];
  }

  return Meteor.users
    .find()
    .fetch()
    .filter((user) => idsToFilter.indexOf(user._id) === -1)
    .map((user) => {
      let address = 'Unknown';
      if (user.emails.length > 0) {
        address = user.emails[0].address || 'Unknown';
      }
      return {
        label: address,
        value: user._id,
      };
    });
}

function sendResetEmail({ toEmail }) {
  try {
    Accounts.sendResetPasswordEmail(
      Accounts.findUserByEmail(toEmail)._id
    );
    return true;
  } catch (err) {
    throw new Meteor.Error(500, err);
  }
}

Meteor.methods({
  sendResetEmail,
  getUserDetails() {
    return {
      details: Meteor.users.findOne(this.userId, {
        fields: { services: 0 },
      }),
      isAdmin: isCurrentUserAdmin(this.userId),
    };
  },
  addUser(user) {
    // Add new user
    var userId = Accounts.createUser(user);

    return userId;
  },
  addUsersAndSendEnrollmentEmails(enrollmentDocument) {
    if (!isCurrentUserAdmin()) {
      throw new Meteor.Error(500, 'Operation not allowed');
    }
    // original example: https://stackoverflow.com/a/16098693/1191545

    // Make sure mail configuration is present
    if (!process.env.MAIL_URL) {
      throw new Meteor.Error(
        'MailConfigurationError',
        'No mail settings available.'
      );
    }

    // Make sure 'from email' address was provied by environmental variable
    if (!process.env.FROM_EMAIL) {
      throw new Meteor.Error(
        'MailConfigurationError',
        'No from email address available.'
      );
    }

    // Set the from email address
    Accounts.emailTemplates.from = process.env.FROM_EMAIL;

    // Set enrollment subject from document
    Accounts.emailTemplates.enrollAccount.subject = (user) => {
      return enrollmentDocument.subject;
    };

    // Set enrollment message from document
    Accounts.emailTemplates.enrollAccount.text = (user, url) => {
      return `${enrollmentDocument.message} \n\n ${url}`;
    };

    // Get emails from enrollment document
    const emailAddresses = enrollmentDocument.emailAddresses;

    // Create user and send enrollment email for each email address
    emailAddresses.forEach((emailAddress) => {
      // Create a user with current email address
      const userId = Accounts.createUser({
        email: emailAddress,
      });

      if (enrollmentDocument.groups) {
        enrollmentDocument.groups.forEach((groupId) => {
          Permissions.insert({ userId, groupId });
        });
      }
      // Send enrollment email to newly created user
      Accounts.sendEnrollmentEmail(userId);
    });
  },
  addUserToAdminRole(userId) {
    // Add user to admin role
    Roles.addUsersToRoles(userId, 'admin');
  },
  deleteUser(user) {
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
        Permissions.remove({ userId: user._id });
      }
    }
  },
  editUserFormSubmit(user) {
    // Get user email
    var userEmail = user.email;
    var deactivateOn = user.deactivateOn
      ? new Date(user.deactivateOn)
      : user.deactivateOn;

    var userId = user._id;

    const objectToSet = {
      $set: {
        'emails.0.address': userEmail,
      },
    };

    /* When the deactive date is set to a date*/
    if (deactivateOn) {
      objectToSet.$set.deactivateOn = deactivateOn;
    } else {
      /* When the deactive date is emptied */
      objectToSet.$unset = { deactivateOn: true };
    }

    try {
      // Edit user, setting first email
      Meteor.users.update(userId, {
        ...objectToSet,
      });
    } catch (e) {
      throw new Meteor.Error(500, e.toString());
    }
    return userId;
  },
  removeUserFromAdminRole(userId) {
    // Add user to admin role
    Roles.removeUsersFromRoles(userId, 'admin');
  },
  getEligibleManagerList,
  getUserList() {
    if (!isCurrentUserAdmin()) {
      return [];
    }

    return Meteor.users.find().fetch();
  },
  userLogout() {
    return Meteor.users.update(
      { _id: this.userId },
      { $set: { 'services.resume.loginTokens': [] } }
    );
  },
});
