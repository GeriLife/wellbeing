import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.min.css";

Template.editUserGroups.onCreated(function() {
  const templateInstance = this;
  const userId = templateInstance.data.user._id;

  templateInstance.subscribe("allGroups");
  templateInstance.subscribe("userPermissions", userId);
});

Template.editUserGroups.onRendered(function() {
  const templateInstance = this;
  const userId = templateInstance.data.user._id;

  const placeholder = "Select one or more groups";

  templateInstance.autorun(function() {
    if (templateInstance.subscriptionsReady()) {
      // Render multi-select widget on 'select residents' field
      templateInstance.groupSelect = new SlimSelect({
        select: "[name=editUserGroups]",
        closeOnSelect: false,
        placeholder
      });
    }
  });
});

Template.editUserGroups.helpers({
  groups() {
    const templateInstance = Template.instance();

    const allGroups = Groups.find().fetch();

    const userId = templateInstance.data.user._id;

    // Check for existing permissions
    const existingUserPermissions = Permissions.find({ userId }).fetch();

    const existingUserPermissionGroupIds = existingUserPermissions.map(
      permission => permission.groupId
    );

    // annotate groups with "selected", based on group membership
    // used by select widget
    const annotatedGroups = allGroups.map(function(group) {
      const groupId = group._id;

      const userIsInGroup = existingUserPermissionGroupIds.includes(groupId);

      // mark group as "selected", if user already assigned
      const selected = userIsInGroup ? "selected" : undefined;

      return Object.assign({ selected }, group);
    });

    return annotatedGroups;
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
