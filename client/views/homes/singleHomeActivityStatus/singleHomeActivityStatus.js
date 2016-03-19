Template.singleHomeActivityStatus.onCreated(function () {
    var instance = this;

    // Get ID of current home
    instance.homeId = instance.data.home._id;

    // Add variable to hold activity counts
    instance.activityLevelCounts = new ReactiveVar();

    instance.autorun(function () {
      // Retrieve home resident activity level counts from server
      const activityLevelCounts = ReactiveMethod.call("getHomeActivityLevelCounts", instance.homeId);

      // Make sure activity level counts exist
      if (activityLevelCounts) {
        /*
        Re-structure activity level counts data to an object containing
        level and count attributes
        */
        const activityLevelTypes = _.keys(activityLevelCounts);

        const activityLevelData = _.map(activityLevelTypes, function (type) {
          // Construct an object with the type and count keys
          const activityLevelCount = {
            type: type,
            count: activityLevelCounts[type]
          };

          return activityLevelCount;
        });

        // Update the reactive variable, to trigger the graph to render
        instance.activityLevelCounts.set(activityLevelCounts);
      }
    });
  });
