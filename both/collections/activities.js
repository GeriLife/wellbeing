Activities = new Mongo.Collection('activities');

var ActivitiesSchema = new SimpleSchema({
  residentId: {
    type: Array,
    label: 'Resident'
  },
  'residentId.$': {
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
  residentName: function () {
    // Get the Resident ID
    var residentId = this.residentId;
    console.log(residentId);
    // Get Resident from Residents collection, by ID
    var resident = Residents.findOne(residentId);
    console.log(resident);
    // Return the Activity Type name
    return resident.firstName;
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
