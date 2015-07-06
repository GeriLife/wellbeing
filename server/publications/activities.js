Meteor.publish({
  allActivities: function () {
    return Activities.find();
  }
});

Meteor.publish({
  // Activities for a given resident
  residentActivities: function (residentId) {
    return Activities.find({'residentId': residentId});
  }
});

Meteor.publish({
  // Activities for a given user
  userActivities: function (userId) {
    return Activities.find({'createdById': userId});
  }
});
