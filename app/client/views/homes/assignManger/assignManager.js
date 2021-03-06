import assignManagerSchema from "./schema";

Template.assignManager.onCreated(function() {
  const templateInstance = this;
  const groupId = templateInstance.data.groupId;
  templateInstance.currentManagers = new ReactiveVar(null);
  templateInstance.currentSchema = new ReactiveVar(null);

  UpdateCurrentManagersList(templateInstance, groupId);

  this.autorun(function(){
    const groupId = Template.instance().data.groupId;
    const currentManager = Template.instance().currentManagers.get();
    let currentManagerIds = [];

    /* If any existing users are assigned do not show them in the selection list */
    if (!!currentManager) {
      currentManagerIds = currentManager.map(manager => manager.userId);
    }

    Meteor.call(
      'getEligibleManagerList',
      currentManagerIds,
      function (err, managerList) {
        if (!err) {
          templateInstance.currentSchema.set(
            assignManagerSchema(groupId, managerList)
          );
        }
      }
    );
  })
});

Template.assignManager.helpers({
  assignManagerSchema() {
    return Template.instance().currentSchema.get();
  },

  buttonContent() {
    return TAPi18n.__("assignManager-form-submitButton-text");
  },

  currentManagers() {
    const currentManagers = Template.instance().currentManagers.get();
    return currentManagers;
  },

  tableSettings() {
    const tableLabels = {};
    // Get translation strings for filter values
    tableLabels.managerName = TAPi18n.__("manager-tableLabels-name");
    tableLabels.revokeAccess = TAPi18n.__("manager-tableLabels-revoke");
    const tableSettings = {
      showFilter: false,
      fields: [
        {
          key: "address",
          label: tableLabels.managerName
        },
        {
          key: "userId",
          label: tableLabels.revokeAccess,
          tmpl: Template.managerRevokeRightsButton
        }
      ],
      filters: ["addressFilter"],
      noDataTmpl: Template.noDataToDisplay
    };

    return tableSettings;
  },
  addressFilterFields() {
    return ["address"];
  },
  addressFilterLabel() {
    TAPi18n.__("manager-filterLabels-address");
  }
});

Template.assignManager.events({
  "click #revokeRights"(event, templateInstance) {
    FlashMessages.clear();
    const groupId = templateInstance.data.groupId;
    const userId = this.userId;
    const successMessage = TAPi18n.__("manager-revoke-success");
    Meteor.call("revokeManagerPermission", { groupId, userId }, function(
      err,
      data
    ) {
      /* data = 0 means 0 rows updated, hence access not revoked */
      if (err || data == 0) {
        /* Set error message */
        const message =
          err && err.message
            ? err.message
            : TAPi18n.__('couldNotRevokeAccess');
        FlashMessages.sendError(message, { autoHide: true, hideDelay: 3000 });
      } else {
        FlashMessages.sendSuccess(successMessage, {
          autoHide: true,
          hideDelay: 3000
        });

        /* Refresh the mangers list */
        UpdateCurrentManagersList(templateInstance, groupId);
      }
    });
  },
  "click #closeAssignManagerModal"() {
    Modal.hide("assignManager");
  }
});

function UpdateCurrentManagersList(templateInstance, groupId) {
  Meteor.call("getCurrentManagers", groupId, function(err, users) {
    

    if (!err) {
      templateInstance.currentManagers.set(users || []);
    }
  });
}
