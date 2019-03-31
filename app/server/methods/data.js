const async = require("async");

async function _exportDataToConcernedColection(collectionName, data) {
  if (!Array.isArray(data)) throw "Data not in required format";

  console.log("Calling data for coll: ", collectionName);

  switch (collectionName) {
    case "activities":
      return await _insert(Activities.insert, data);

    case "activityTypes":
      return await _insert(ActivityTypes.insert, data);

    case "feelings":
      return await _insert(Feelings.insert, data);

    case "groups":
      return await _insert(Groups.insert, data);

    case "homes":
      return await _insert(Homes.insert, data);

    case "residents":
      return await _insert(Residents.insert, data);

    case "roles":
      return await _insert(Meteor.roles.insert, data);

    case "settings":
      return await _insert(Settings.insert, data);

    case "users":
      return await _insert(Meteor.users.insert, data);
  }
  async function _insert(func, data) {
    return new Promise((resolve, reject) => {
      async.each(
        data,
        async (row, cb) => {
          try {
            await func(row);
            cb();
          } catch (e) {
            cb(e);
          }
        },
        err => {
          if (err) return reject(err);

          return resolve("Success");
        }
      );
    });
  }
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

  "file-upload": async function(fileData) {
    if (!fileData) return "No Data recieved!!";

    let jsonData;
    try {
      jsonData = JSON.parse(fileData);

      if (!typeof jsonData === "object") throw "JSON not in required format";

      Object.keys(jsonData).forEach(async collectionName => {
        try {
          let data = await _exportDataToConcernedColection(
            collectionName,
            jsonData[collectionName]
          );
          console.log("Response of insert ", data);
        } catch (e) {
          console.log("in inner catch: ", e);
          return e;
        }
      });
    } catch (e) {
      console.log("outer catch", e);
      return "Data not in required format";
    }
  }
});
