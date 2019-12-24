import { CronJob } from 'cron';

new CronJob(
  '0 0 12 * * *',
  Meteor.bindEnvironment(function(err, data) {
    /* Get monthly data */
    Meteor.call('getAggregatedActivities', 'month', function(
      errorForMonthlyData,
      monthlyData
    ) {
      /* Exit if error fetching data */
      if (errorForMonthlyData) {
        console.error(errorForMonthlyData);
        return;
      }

      /* Get weekly data */
      Meteor.call('getAggregatedActivities', 'week', function(
        errorForWeeklyData,
        weeklyData
      ) {
        if (errorForWeeklyData) {
          console.error(errorForWeeklyData);
          return;
        }

        /* Remove previous entries, if any so that after the following insert
        there is always only one entry in the collection */
        AllHomesActivityReportAggregate.remove({
          aggregateBy: 'type',
        });

        AllHomesActivityReportAggregate.insert(
          {
            lastUpdatedDate: new Date(),
            weeklyData: weeklyData,
            aggregateBy:'type',
            monthlyData: monthlyData,
          },
          function(error) {
            if (error) console.error(error);
          }
        );
      });
    });
  }),
  null,
  true
);
