import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
  'firstName': {
    type: String,
  },
  'lastInitial': {
    type: String,
    max: 1,
  },
  'homeId': {
    type: String,
    label: TAPi18n.__('newResidentAndResidencySchema-homeId-label'),
  },
  moveIn: {
    type: Date,
    autoValue: function () {
      if (this.isSet) {
        // Get move in date from form
        const moveInDate = new Date(this.value);

        // set move in to midnight UTC
        moveInDate.setUTCHours(0,0,0,0);

        return moveInDate;
      }
    },
  },
})
