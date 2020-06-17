Migrations.add({
  version: 6,
  name: 'Update the calculation of reports',
  up: function () {
    Meteor.call('aggregateActivitiesAndPopulateAggregateCollection');
  },
});
