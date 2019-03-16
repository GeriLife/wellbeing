import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.min.css";

Template.editUserGroups.onCreated(function() {
  const templateInstance = this;

  templateInstance.subscribe("allGroups");
});

Template.editUserGroups.onRendered(function() {
  const templateInstance = this;

  const placeholder = "Select one or more groups";

  // Render multi-select widget on 'select residents' field
  templateInstance.groupSelect = new SlimSelect({
    select: "[name=editUserGroups]",
    closeOnSelect: false,
    placeholder
  });
});

Template.editUserGroups.helpers({
  groups() {
    return Groups.find().fetch();
  }
});

Template.editUserGroups.events({
  "click #saveGroups"(event, templateInstance) {
    // get selected group IDs
    const groupIds = templateInstance.groupSelect.selected();
    const userId = templateInstance.data.user._id;

    // Call server method to save user/group permissions
    Meteor.call("addSingleUserPermissions", userId, groupIds, function(
      error,
      response
    ) {
      // check success and close modal
      if (response) {
        Modal.hide("editUserGroups");
      }
    });
  }
});
