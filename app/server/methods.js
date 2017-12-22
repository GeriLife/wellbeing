Meteor.methods({
  'getHomesOptions': function() {
    return _.map(Homes.find().fetch(), function(home) {
      return {
        label: home.name,
        value: home._id
      };
    });
  }
});
