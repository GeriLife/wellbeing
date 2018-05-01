import moment from 'moment';

import Activities from '/collections/activities';
import Homes from '/collections/homes';
import Residents from './';

Residents.helpers({
  fullName: function () {
    // First name and last initial
    var firstName = this.firstName;
    var lastInitial = this.lastInitial;

    if (firstName && lastInitial) {
      return firstName + " " + lastInitial;
    } else {
      return firstName;
    }

  },
  'activities': function () {
    // Get resident ID
    var residentId = this._id;

    // Get today's date
    var now = moment().toDate();

    // Get all activities involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    return Activities.find({
        'residentIds': residentId,
        activityDate: {$lte: now}
      },
      {sort : {activityDate:  -1}
    });
  },
  'recentActivities': function () {
    // Get resident ID
    var residentId = this._id;

    // Date two weeks ago
    var twoWeeksAgo = moment().subtract(2, "weeks").toDate();

    // Date today
    var now = new Date();

    // Get all activities involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    return Activities.find({'residentIds': residentId, activityDate: {$gte: twoWeeksAgo, $lte: now}}, {sort : {activityDate:  -1} });
  },
  homeName: function () {
    var homeId = this.homeId;
    var home = Homes.findOne(homeId);
    return home.name;
  }
});
