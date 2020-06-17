import SimpleSchema from 'simpl-schema';

AllHomesActivityReportAggregate = new Mongo.Collection(
  'allHomesActivityReportAggregate'
);

/* The activity count and minute data */
const countsSchema = new SimpleSchema({
  activity_count: {
    type: Number,
  },

  activity_minutes: { type: Number },
});

/* Schema of object inside the array */
const valuesSchema = new SimpleSchema({
  key: {
    type: Date,
  },
  value: {
    type: countsSchema,
  },
});

/* Schema of the monthly/weekly data array */
const aggregateSchema = new SimpleSchema({
  key: {
    type: String,
  },
  values: {
    type: Array,
  },
  'values.$': {
    type: new SimpleSchema({
      key: {
        type: String,
      },
      values: {
        type: Array,
      },
      'values.$': {
        type: valuesSchema,
      },
    }),
  },
});

/* Collection schema as per the object returned by mongo query.
   Each record contains aggregated data for both time granularities i.e. monthly and weekly
*/
AllHomesActivityReportAggregate.Schema = new SimpleSchema({
  lastUpdatedDate: {
    type: String,
    regEx: Date,
  },
  aggregateBy: {
    type: String,
    allowedValues: ['type', 'facilitator'],
  },
  weeklyData: {
    type: Array,
  },
  'weeklyData.$': {
    type: aggregateSchema,
  },

  monthlyData: {
    type: Array,
  },
  'monthlyData.$': {
    type: aggregateSchema,
  },
});

AllHomesActivityReportAggregate.attachSchema(
  AllHomesActivityReportAggregate.Schema
);

module.exports = AllHomesActivityReportAggregate;
