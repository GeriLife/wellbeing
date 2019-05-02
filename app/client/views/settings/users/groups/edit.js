Template.editUserGroups.onCreated(function() {
  const templateInstance = this;
  const userId = templateInstance.data.user._id;

  templateInstance.subscribe("allGroups");
  templateInstance.subscribe("userPermissions", userId);
});

Template.editUserGroups.onRendered(function() {
  const templateInstance = this;
  const userId = templateInstance.data.user._id;
});

Template.editUserGroups.helpers({
  groupSelectOptions() {
    const templateInstance = Template.instance();

    if (!templateInstance.subscriptionsReady()) {
      return false;
    } else {
      const allGroups = Groups.find().fetch();

      const userId = templateInstance.data.user._id;

      // Check for existing permissions
      const existingUserPermissionGroupIds = Permissions.find({ userId }).map(
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
  }
});

Template.editUserGroups.events({
  "click #saveGroups"(event, templateInstance) {
    // get selected group IDs
    const groupIds = $("[name=editUserGroups]").val();

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
