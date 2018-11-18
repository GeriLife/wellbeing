Template.homeResident.onCreated(function () {
  // Get reference to template instance
  const instance = this;

  // Get resident ID as instance variable, for clarity
  const residentId = instance.data.resident._id;

  // Create resident activity count reactive variable
  instance.residentRecentActiveDaysCount = new ReactiveVar();

  // Create resident recent active days reactive variable
  instance.residentRecentActiveDays = new ReactiveVar();

  // Get resident activity count from server, and set reactive variable
  Meteor.call('getResidentRecentActiveDaysAndCount', residentId, function (error, recentActivity) {
    // set the value of the resident activity count reactive variable
    instance.residentRecentActiveDaysCount.set(recentActivity.activeDaysCount);

    instance.residentRecentActiveDays.set(recentActivity.recentActiveDays);
  });
});

Template.homeResident.helpers({
  activityLabelClass () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get resident
    const resident = instance.data.resident;

    // Check if resident is on hiatus
    if (resident.onHiatus) {
      return 'info';
    }

    // Get resident activity count
    const recentActiveDaysCount = instance.residentRecentActiveDaysCount.get();

    // Case for returning Bootstrap class based on activity level
    if (recentActiveDaysCount >= 5) {
      return 'success';
    } else if ( recentActiveDaysCount > 0 && recentActiveDaysCount < 5 ) {
      return 'warning';
    } else if ( recentActiveDaysCount === 0 ) {
      return 'danger';
    }
  },
   activityLabelText () {
    // Get reference to template instance
    const instance = Template.instance();

    // Map the resident activity level to a Bootstrap class

    // Get resident
    const resident = instance.data.resident;

    // Check if resident is on hiatus
    if (resident.onHiatus) {
      // Get localized text for 'on hiatus' status
      const onHiatusText = TAPi18n.__('homeResident-activityLabelText-onHiatus');

      return onHiatusText;
    }

    // Get resident ID from template instance
    const residentId = instance.residentId;

    // Get resident activity count
    const recentActiveDaysCount = instance.residentRecentActiveDaysCount.get();

    // Get activity level translations
    const active = TAPi18n.__("residentActivityLevel-active");
    const semiActive = TAPi18n.__("residentActivityLevel-semiActive");
    const inactive = TAPi18n.__("residentActivityLevel-inactive");

    // Case for returning Bootstrap class based on activity level
    if (recentActiveDaysCount >= 5) {
      return active;
    } else if ( recentActiveDaysCount > 0 && recentActiveDaysCount < 5 ) {
      return semiActive;
    } else if ( recentActiveDaysCount === 0 ) {
      return inactive;
    }
  },
  recentActiveDays () {
    const instance = Template.instance()

    return instance.residentRecentActiveDays.get()
  },
  recentActiveDaysCount () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get resident activity count
    const recentActiveDaysCount = instance.residentRecentActiveDaysCount.get();

    // Return the activity count as a string
    return recentActiveDaysCount;
  }
});

Template.homeResident.events({
  'click .resident': function (event, templateInstance) {
    // Get ID of clicked resident
    const residentId = templateInstance.data.resident._id;

    // Show page for clicked resident
    Router.go('resident', {residentId: residentId});
  }
});
