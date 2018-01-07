Meteor.publishComposite('residentsHomesComposite', {
  find: function () {
    return Residents.find();
  },
  children: [
    {
      find: function (resident) {
        return Homes.find({'_id': resident.homeId});
      }
    }
  ]
});
