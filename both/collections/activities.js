Activities = new Mongo.Collection('activities');

var ActivitiesSchema = new SimpleSchema({
  residentIds: {
    type: Array,
    label: 'Resident'
  },
  'residentIds.$': {
    type: String,
    autoform: {
      options: function() {
        // Get all activity types from db
        var residents = Residents.find().fetch();

        // Create an options array of activity types with label and value pairs
        var residentsOptions = _.map(residents, function(resident) {
          return {
            label: resident.firstName,
            value: resident._id
          };
        });

        return residentsOptions;
      }
    }
  },
  activityTypeId: {
    type: String,
    label: 'Activity Type',
    autoform: {
      options: function() {
        // Get all activity types from db
        var activityTypes = ActivityTypes.find().fetch();

        // Create an options array of activity types with label and value pairs
        var activityTypesOptions = _.map(activityTypes, function(activityType) {
          return {
            label: activityType.name,
            value: activityType._id
          };
        });

        return activityTypesOptions;
      }
    }
  },
  duration: {
    type: Number,
    label: "Duration (in minutes)"
  }
});

Activities.attachSchema(ActivitiesSchema);

Activities.helpers({
  residentNames: function () {
    // Get the Resident ID;
    var residentIds = this.residentIds;

    // Get Resident(s) from Residents collection, by ID(s)
    var residents = Residents.find({'_id': {$in: residentIds}}).fetch();

    // Create an array of resident names
    var residentNamesArray = _.map(residents, function (resident) {
      return resident.firstName;
    });

    // Return the resident name(s), joining with ", "
    return residentNamesArray.join(", ");
  },
  activityType: function () {
    // Get the Activity Type ID
    var activityTypeId = this.activityTypeId;

    // Get Activity Type from Activity Types collection, by ID
    var activityType = ActivityTypes.findOne(activityTypeId);

    // Return the Activity Type name
    return activityType.name;
  }
});
