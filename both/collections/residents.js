Residents = new Mongo.Collection('residents');

var ResidentsSchema = new SimpleSchema({
  firstName: {
    type: String,
    label: 'First Name'
  },
  lastInitial: {
    type: String,
    label: 'Last Initial',
    max: 1,
  },
  homeId: {
    type: String,
    label: 'Home',
    autoform: {
      options: function() {
        return _.map(Homes.find().fetch(), function(home) {
          return {
            label: home.name,
            value: home._id
          };
        });
      }
    }
  }
});

Residents.attachSchema(ResidentsSchema);

Residents.helpers({
  homeName: function () {
    var homeId = this.homeId;
    var home = Homes.findOne(homeId);
    return home.name;
  }
});
