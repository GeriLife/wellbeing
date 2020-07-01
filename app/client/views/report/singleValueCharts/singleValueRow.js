Template.singleValueRow.onCreated(function () {
  const templateInstance = this;
  templateInstance.homeStatsList = new ReactiveVar([]);
  templateInstance.homeBottomStatsList = new ReactiveVar([]);
  templateInstance.autorun(function () {
    const timePeriod = Template.currentData().timePeriod;

    Meteor.call(
      'calculatePercentageActivityPerHomePerDay',
      {
        endDate: new Date(),
        periodInDays: timePeriod === 'month' ? 30 : 7,
      },
      function (err, results) {
        if (err) {
          console.error(err);
        } else {
          templateInstance.homeStatsList.set(
            results.top5.map((home) => home.homeName)
          );

          templateInstance.homeBottomStatsList.set(
            results.bottom5.map((home) => home.homeName)
          );
        }
      }
    );
  });
});

Template.singleValueRow.helpers({
  homeTitle() {
    return 'report-mostActiveHomes';
  },

  homeInfo() {
    return 'report-mostActiveHomes-info';
  },

  homeLeastActiveTitle() {
    return 'report-leastActiveHomes';
  },

  homeLeastActiveInfo() {
    return 'report-leastActiveHomes-info';
  },

  homeTopStatsList() {
    return Template.instance().homeStatsList.get();
  },

  homeBottomStatsList() {
    return Template.instance().homeBottomStatsList.get();
  },
});
