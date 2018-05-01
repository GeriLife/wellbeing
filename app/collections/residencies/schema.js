import SimpleSchema from 'simpl-schema';

export default ResidenciesSchema = new SimpleSchema({
  residentId: {
    type: String,
  },
  homeId: {
    type: String,
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
  moveOut: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isSet) {
        // Get move out date from form
        const moveOutDate = new Date(this.value);

        if (moveOutDate) {
          // set move out to midnight UTC
          moveOutDate.setUTCHours(0,0,0,0);

          return moveOutDate;
        }
      }
    },
  },
});
