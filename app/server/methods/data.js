function _exportDataToConcernedColection(collectionName, data) {
  if (!Array.isArray(data)) throw TAPi18n.__('dataExport-formatIncorrect');

  const collections = {
    activities: Activities,
    activityTypes: ActivityTypes,
    feelings: Feelings,
    groups: Groups,
    homes: Homes,
    residents: Residents,
    residencies: Residencies,
    roles: Meteor.roles,
    settings: Settings,
    users: Meteor.users
  };
  return data.every(function(row) {
    return collections[collectionName].insert(row);
    
  });
}

function getMessage(e) {
  if ("errmsg" in e) return e.errmsg;
  if (!e.sanitizedError) return e.sanitizedError.message;
  return e.toString();
}

Meteor.methods({
  exportAllData() {
    // Get current user ID
    const currentUserId = Meteor.userId();

    // Check if current user is Admin
    const currentUserIsAdmin = Roles.userIsInRole(currentUserId, "admin");

    // If current user is admin, construct and return object with all data
    if (currentUserIsAdmin) {
      const exportData = {
        activities: Activities.find().fetch(),
        activityTypes: ActivityTypes.find().fetch(),
        feelings: Feelings.find().fetch(),
        groups: Groups.find().fetch(),
        homes: Homes.find().fetch(),
        residents: Residents.find().fetch(),
        roles: Meteor.roles.find().fetch(),
        settings: Settings.find().fetch(),
        users: Meteor.users.find().fetch()
      };

      return exportData;
    }
  },

  JSONFileImport(fileData) {
    // Get current user ID
    const currentUserId = Meteor.userId();

    // Check if current user is Admin
    const currentUserIsAdmin = Roles.userIsInRole(currentUserId, "admin");
    if (!currentUserIsAdmin)
      return { error: { message: TAPi18n.__('noAuth') } };

    if (!fileData) return { error: { message: TAPi18n.__("dataExport-noData") } };

    let jsonData;
    try {
      jsonData = JSON.parse(fileData);

      if (!typeof jsonData === "object" || Array.isArray(jsonData))
        throw TAPi18n.__('dataExport-JSONIncorrect');

      let res = Object.keys(jsonData).map(collectionName => {
        try {
          _exportDataToConcernedColection(
            collectionName,
            jsonData[collectionName]
          );

          return {
            collectionName,
            message: TAPi18n.__('dataExport-collectionImportSuccessfull', {
              collectionName,
            }),
          };
        } catch (e) {
          return {
            collectionName,
            error: {
              message: TAPi18n.__('dataExport-genericError'),
              data: getMessage(e)
            }
          };
        }
      });

      return res;
    } catch (e) {
      return { error: { message: TAPi18n.__('dataExport-invalidFile') } };
    }
  }
});
