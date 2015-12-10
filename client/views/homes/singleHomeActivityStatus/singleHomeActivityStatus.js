Template.singleHomeActivityStatus.helpers({
  "activityLevelCounts": function () {
    var instance = this;

    // Get ID of current home
    var homeId = this._id;

    return ReactiveMethod.call("getHomeActivityLevelCounts", homeId);
  }
});
