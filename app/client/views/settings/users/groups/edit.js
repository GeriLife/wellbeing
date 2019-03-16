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
    console.log("save");

    // get selected group IDs
    const selectedGroups = templateInstance.groupSelect.selected();
    console.log(selectedGroups);

    // Call server method to save user/group permissions

    // in callback, check success and close modal
  }
});
