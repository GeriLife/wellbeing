Template.dataSettings.events({
  'click #generate-demo-data' () {
    // Create demo data via server method
    Meteor.call('createMockData');
  }
});
