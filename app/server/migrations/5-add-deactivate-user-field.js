Migrations.add({
  version: 5,
  name: 'Add deactivateOn fiels in Meteor.users collection',
  up: function() {
    // Get all users
    var users = Meteor.users.find().fetch();

    _.each(users, function(user) {
      // Add new field deactivate date
      Meteor.users.update(user, {
        $set: { deactivateOn: new Date(0), isActive: true },
      });
    });
  },
  down() {
    // Get all users
    var users = Meteor.users.find().fetch();

    _.each(users, function(user) {
      // Add new field deactivate date
      Meteor.users.update(user, {
        $unset: { deactivateOn: true, isActive: true },
      });
    });
  },
});
