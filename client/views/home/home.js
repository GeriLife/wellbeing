Template.home.helpers({
  'residents': function () {
    // Get all residents for current home
    var homeId = this._id;
    return Residents.find({'homeId': homeId});
  }
});
