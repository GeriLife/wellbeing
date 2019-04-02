function _exportDataToConcernedColection(collectionName, data) {
  if (!Array.isArray(data)) throw "Data not in required format";

  let collections = {
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
    let res = collections[collectionName].insert(row);
    return res;
  });
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
      return { error: { message: "Action not allowed" } };

    if (!fileData) return { error: { message: "No Data recieved!!" } };

    let jsonData;
    try {
      jsonData = JSON.parse(fileData);

      if (!typeof jsonData === "object") throw "JSON not in required format";

      let res = Object.keys(jsonData).map(collectionName => {
        try {
          _exportDataToConcernedColection(
            collectionName,
            jsonData[collectionName]
          );

          return {
            message: `Data for ${collectionName} imported successfully!`
          };
        } catch (e) {
          return { error: { message: `${collectionName}: Error displaying data`, data: e } };
        }
      });

      return res;
    } catch (e) {
      return { error: { message: e } };
    }
  }
});
