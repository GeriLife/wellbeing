Template.singleHomeActivityStatus.onCreated(function () {
    var instance = this;

    // Get ID of current home
    var homeId = instance.data.home._id;

    // Add variable to hold activity counts
    instance.activityLevelCounts = new ReactiveVar();

    instance.autorun(function () {
      // Retrieve home resident activity level counts from server
      const activityLevelCounts = ReactiveMethod.call("getHomeActivityLevelCounts", homeId);

      // Update the reactive variable, to trigger the graph to render
      instance.activityLevelCounts.set(activityLevelCounts);
    });
  });
