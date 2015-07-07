Template.group.helpers({
  'homes': function () {
    // Get homes for this group
    var groupId = this._id;
    return Homes.find({ "groupId": groupId });
  }
});
