function _exportDataToConcernedColection(collectionName, data) {
  if (!Array.isArray(data)) throw "Data not in required format";

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
    const currentUserId = this.userId || Meteor.userId();

    // Check if current user is Admin
    const currentUserIsAdmin = Roles.userIsInRole(
      currentUserId,
      'admin'
    );

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
        users: Meteor.users.find().fetch(),
      };

      return exportData;
    }
  },

  JSONFileImportApi({ fileData }) {
    return Meteor.call('JSONFileImport', fileData, this.userId);
  },
  JSONFileImport(fileData, userId) {
    // Get current user ID
    const currentUserId = userId || Meteor.userId();

    // Check if current user is Admin
    const currentUserIsAdmin = Roles.userIsInRole(
      currentUserId,
      'admin'
    );
    if (!currentUserIsAdmin)
      return { error: { message: 'Action not allowed' } };

    if (!fileData)
      return { error: { message: 'No Data recieved!!' } };

    let jsonData;
    try {
      jsonData = JSON.parse(fileData);

      if (!typeof jsonData === 'object' || Array.isArray(jsonData))
        throw 'JSON not in required format';

      let res = Object.keys(jsonData).map((collectionName) => {
        try {
          _exportDataToConcernedColection(
            collectionName,
            jsonData[collectionName]
          );

          return {
            collectionName,
            message: `Data for ${collectionName} imported successfully!`,
          };
        } catch (e) {
          return {
            collectionName,
            error: {
              message: `${collectionName}: Error displaying data`,
              data: getMessage(e),
            },
          };
        }
      });

      return res;
    } catch (e) {
      return { error: { message: 'Invalid File' } };
    }
  },
});
