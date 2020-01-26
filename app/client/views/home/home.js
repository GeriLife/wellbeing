Template.home.onCreated(function() {
  const templateInstance = this;

  // Set current Home ID from router
  templateInstance.homeId = Router.current().params.homeId;

  // Create reactive variables to hold activity metric and period
  templateInstance.activityMetric = new ReactiveVar('count');
  templateInstance.residents = new ReactiveVar([]);
  templateInstance.activityPeriod = new ReactiveVar('7');
  templateInstance.homeDetails = new ReactiveVar(null);

  this.autorun(function() {
    Meteor.call(
      'getHomeCurrentAndActiveResidents',
      templateInstance.homeId,
      function(err, residentsArray) {
        if (residentsArray) {
          templateInstance.residents.set(residentsArray);
        }
      }
    );

    Meteor.call('getHomeDetails', templateInstance.homeId, function(
      err,
      result
    ) {
      if (result) {
        templateInstance.homeDetails.set(result);
      }
    });
  });
});

Template.home.events({
  'click #edit-home': function() {
    const home = Template.instance().homeDetails.get();

    // Open edit home modal
    Modal.show('editHome', home);
  },

  'change input[name="activityMetric"]'(event, templateInstance) {
    const activityMetric = event.currentTarget.value;

    templateInstance.activityMetric.set(activityMetric);
  },

  'change input[name="activityPeriod"]'(event, templateInstance) {
    const activityPeriod = event.currentTarget.value;

    templateInstance.activityPeriod.set(activityPeriod);
  },
});

Template.home.helpers({
  home: function() {
    return Template.instance().homeDetails.get();
  },
  residents: function() {
    // Return all residents for current home, sorting by first name
    //NOTE: these should be filtered by the subscription, as they are dependent on residency status
    return Template.instance().residents.get();
  },
  activityMetric() {
    // get reference to template instance
    const templateInstance = Template.instance();
    return templateInstance.activityMetric.get();
  },
  activityPeriod() {
    // get reference to template instance
    const templateInstance = Template.instance();
    return templateInstance.activityPeriod.get();
  },
});
