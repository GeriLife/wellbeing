import { CronJob } from 'cron';

new CronJob(
  '0 0 12 * * *',
  Meteor.bindEnvironment(function(err, data) {
    /* Get monthly data */
    Meteor.call('getAllHomeReportAggregates', function(error, data) {
      if (error || data.error === true) return;

      /* Remove previous entries, if any so that after the following insert
        there is always only one entry in the collection */
      AllHomesActivityReportAggregate.remove({});
      const lastUpdatedDate = new Date();

      /* Prepapre data for insert adding 2 rows as per type bcause 
         retival will be easy
      */
      const activityTypeData = {
        lastUpdatedDate,
        weeklyData: data.weeklyDataByActivityType,
        aggregateBy: 'type',
        monthlyData: data.monthlyDataByActivityType,
      };
      const facilitatorData = {
        lastUpdatedDate,
        weeklyData: data.weeklyDataByActivityFacilitator,
        aggregateBy: 'facilitator',
        monthlyData: data.monthlyDataByActivityFacilitator,
      };

      /* Insert Data */
      AllHomesActivityReportAggregate.insert(
        activityTypeData,
        function(error) {
          if (error) console.error('activityTypeData: ', error);
        }
      );

      AllHomesActivityReportAggregate.insert(
        facilitatorData,
        function(error) {
          if (error) console.error('facilitatorData: ', error);
        }
      );
    });
  }),
  null,
  true
);
