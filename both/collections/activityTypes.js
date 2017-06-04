ActivityTypes = new Mongo.Collection('activityTypes');

var ActivityTypesSchema = new SimpleSchema({
  name: {
    type: String
  }
});

ActivityTypes.allow({
  insert () {
    // Get current user ID
    const currentUserId = Meteor.userId();

    // Chack if user is administrator
    const userIsAdmin = Roles.userIsInRole(currentUserId);

    // Only Admin user can insert
    return userIsAdmin;
  },
  remove () {
    // Get current user ID
    const currentUserId = Meteor.userId();

    // Chack if user is administrator
    const userIsAdmin = Roles.userIsInRole(currentUserId);

    // Only Admin user can remove
    return userIsAdmin;
  },
  update () {
    // Get current user ID
    const currentUserId = Meteor.userId();

    // Chack if user is administrator
    const userIsAdmin = Roles.userIsInRole(currentUserId);

    // Only Admin user can update
    return userIsAdmin;
  }
});

// Add i18n tags
ActivityTypesSchema.i18n("activityTypes");

ActivityTypes.attachSchema(ActivityTypesSchema);
