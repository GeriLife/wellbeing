Template.resident.onCreated(function() {
  const templateInstance = this;

  // used to pass all resident activities into some charts
  templateInstance.activities = new ReactiveVar();

  templateInstance.activitiesWithTypes = new ReactiveVar();
  templateInstance.residentDetails = new ReactiveVar();

  // Get Resident ID from router
  templateInstance.residentId = Router.current().params.residentId;

  templateInstance.canCurrentUserEdit = new ReactiveVar(false);

  Meteor.call(
    'isResidentManagedByCurrentUser',
    templateInstance.residentId,
    function(err, isResidentManagedByCurrentUser) {
      if (!err) {
        templateInstance.canCurrentUserEdit.set(
          isResidentManagedByCurrentUser
        );
      }
    }
  );

  Meteor.call(
    'getResidentActvitiesWithActivityAndFaciltatorName',
    templateInstance.residentId,
    function(error, activities) {
      if (!error) {
        templateInstance.activitiesWithTypes.set(activities);
      }
    }
  );

  Meteor.call(
    'getResidentDetails',
    templateInstance.residentId,
    function(error, resident) {
      if (!error) {
        templateInstance.residentDetails.set(resident);
      }
    }
  );

  // Subscribe to all roles except admin
  templateInstance.subscribe('allRolesExceptAdmin');
});

Template.resident.events({
  'click #edit-resident'() {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Show the edit home modal
    Modal.show('residentForm', {
      residentId: templateInstance.residentId,
    });
  },
  'click #add-activity'(event, templateInstance) {
    // Show the Add Activity Modal
    // Pass in resident ID (to be automatically selected on form)
    // note: form field is 'residentIds' (plural)
    Modal.show('activityFormModal', {
      residentIds: templateInstance.residentId,
    });
  },
  'click #add-feeling'(event, templateInstance) {
    // Show the New Feeling modal
    // Pass in resident ID (to be automatically selected on form)
    Modal.show('newFeeling', {
      residentId: templateInstance.residentId,
    });
  },
});

Template.resident.helpers({
  resident() {
    // Get reference to template instance
    const templateInstance = Template.instance();
    return templateInstance.residentDetails.get();
  },

  activities() {
    // Get reference to template instance
    const templateInstance = Template.instance();
    return templateInstance.activitiesWithTypes.get();
  },

  canCurrentUserEdit() {
    return Template.instance().canCurrentUserEdit.get();
  },
});
