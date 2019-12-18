import SimpleSchema from 'simpl-schema';

ActivityReportAggregate = new Mongo.Collection(
  'activityReportAggregate'
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
    type: valuesSchema,
  },
});

/* Collection schema as per the object returned by mongo query.
   Each record contains aggregated data for both time granularities i.e. monthly and weekly
*/
ActivityReportAggregate.Schema = new SimpleSchema({
  Date: {
    type: String,
    regEx: Date,
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

ActivityReportAggregate.attachSchema(ActivityReportAggregate.Schema);
