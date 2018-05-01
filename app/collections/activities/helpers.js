import moment from 'moment';

import ActivityTypes from '/collections/activity_types';
import Residents from '/collections/residents';

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
  },
  activityDateFormatted: function () {
    // Get activity date
    var activityDate = this.activityDate;

    // Format activity date
    var activityDateFormatted = moment(activityDate).format("D.M.YYYY");

    return activityDateFormatted;
  },
  facilitatorRole: function () {
    // Get the facilitator Role ID
    var facilitatorRoleId = this.facilitatorRoleId;

    // Get Role from Roles collection, by ID
    var facilitatorRole = Meteor.roles.findOne(facilitatorRoleId);

    // Return the Role name
    return facilitatorRole.name;
  },
  timeAgo: function () {
    var activityDate = this.activityDate;

    var timeAgo = moment(activityDate).fromNow();

    return timeAgo;
  }
});
