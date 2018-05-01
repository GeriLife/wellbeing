import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export default ActivitiesSchema = new SimpleSchema({
  residentIds: {
    type: Array,
  },
  'residentIds.$': {
    type: String,
  },
  activityTypeId: {
    type: String,
  },
  activityDate: {
    type: Date,
    min: function () {
      // Only allow activities to be recorded for the past seven days
      // based on end of current day
      return new moment().endOf('day').subtract(7, 'days').toDate();

    },
    max: function () {
      // Do not allow activity dates in the future
      return new Date();
    },
  },
  duration: {
    type: Number,
  },
  facilitatorRoleId: {
    type: String,
  }
});
