import SimpleSchema from "simpl-schema";

Invitations = new Mongo.Collection("invitations");

const InvitationsSchema = new SimpleSchema({
  userId: {
    type: String,
    optional: false,
    regEx: SimpleSchema.RegEx.Id
  }
});

// Attach schema to collection
Invitations.attachSchema(InvitationsSchema);

Invitations.helpers({
  user() {
    return Meteor.users.findOne({ _id: this.userId });
  }
});

Invitations.allow({
  insert() {
    // Get user ID
    let userId = Meteor.userId();

    // Placeholder for administrator check
    let userIsAdministrator;

    // Placeholder for insert privilege check
    let userCanInsert;

    if (userId) {
      // Check if user is administrator
      userIsAdministrator = Roles.userIsInRole(userId, ["admin"]);
    }

    // Only allow adminstator users insert
    userCanInsert = userId && userIsAdministrator;

    return userCanInsert;
  }
});
