import SimpleSchema from 'simpl-schema';

export default ResidentsSchema = new SimpleSchema({
  firstName: {
    type: String
  },
  lastInitial: {
    type: String,
    max: 1,
  },
  homeId: {
    type: String,
  },
  interestsDescription: {
    type: String,
    optional: true,
  },
  onHiatus: {
    type: Boolean,
    defaultValue: false
  },
  departed: {
    type: Boolean,
    optional: true,
    defaultValue: false
  }
});
