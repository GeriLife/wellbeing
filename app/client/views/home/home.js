Template.home.onCreated(function () {
  const templateInstance = this;

  // Set current Home ID from router
  templateInstance.homeId = Router.current().params.homeId;

  // Create reactive variables to hold activity metric and period
  templateInstance.activityMetric = new ReactiveVar('count');
  templateInstance.residents = new ReactiveVar(null);
  templateInstance.activityPeriod = new ReactiveVar('7');
  templateInstance.homeDetails = new ReactiveVar(null);

  this.autorun(function () {
    const refreshFlag = Session.get('refresh-data');
    if (refreshFlag) {
      Session.set('refresh-data', false);
    }

    Meteor.call(
      'getHomeCurrentAndActiveResidents',
      templateInstance.homeId,
      function (err, residentsArray) {
        if (residentsArray) {
          templateInstance.residents.set(residentsArray || []);
        } else {
          templateInstance.residents.set([]);
        }
      }
    );

    Meteor.call('getHomeDetails', templateInstance.homeId, function (
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
  'click #edit-home': function () {
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
  home: function () {
    return Template.instance().homeDetails.get();
  },
  residents: function () {
    // Return all residents for current home, sorting by first name
    return Template.instance().residents.get() || [];
  },

  loadingResidents() {
    return Template.instance().residents.get() === null;
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

  isReadyTorender() {
    return (
      Template.instance().residents.get() !== null &&
      Template.instance().homeDetails.get() !== null
    );
  },
});
