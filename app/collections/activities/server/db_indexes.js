import Activities from '../';

Meteor.startup(function () {
  // Make sure activityDate field is indexed for performance
  Activities._ensureIndex({'activityDate': 1});

  // Make sure residentIds field is indexed for performance
  Activities._ensureIndex({'residentIds': 1});
});
