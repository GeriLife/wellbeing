import _ from 'lodash';
import d3 from 'd3';
import moment from 'moment';

export const getActivityWithHomes = () => {
  /* Get all activities with their corresponding homeIds */
  return Activities.find()
    .fetch()
    .map((activity) => {
      const residents = activity.residentIds;
      const activityDate = activity.activityDate;

      /* Get the homeIds of residents based on the date of the activity */

      /* Condition to check whether resident was active in that period */
      const condition = {
        $or: [
          {
            $and: [
              { moveOut: { $exists: false } },
              { moveIn: { $lte: activityDate } },
            ],
          },
          {
            $and: [
              { moveIn: { $lte: activityDate } },
              { moveOut: { $gte: activityDate } },
            ],
          },
        ],
      };
      const residencyMap = Residencies.find({
        $and: [{ residentId: { $in: residents } }, condition],
      })
        .fetch()
        .reduce(
          (map, current) => ({
            ...map,
            [current.residentId]: current.homeId,
          }),
          {}
        );

      return residents.map((resident) => ({
        ...activity,
        homeId: residencyMap[resident],
      }));
    })
    .flat();
};

/**
 * @memberof Activities
 * @name aggregateActivities
 * @description Aggregate activities get activity count and sum of minutes of the activities
 *
 * @param {Array} annotatedActivities array of activities
 * @param {String} timePeriod time aggregation granularity. (week or monthly)
 * @param {string} [aggregateBy='activityTypeName'] aggregate parameter
 * @returns {Array} nested array of activities with total count of activities and sum of minutes of activities,
 * aggregated by time and either activity type or facilitator name
 */
export const aggregateActivitiesWithHome = (
  annotatedActivities,
  timePeriod,
  aggregateBy = 'activityTypeName'
) => {
  // aggregate activities into daily bins grouped by type
  //  - activity count
  //  - activity minutes
  const grouped = d3.groups(
    annotatedActivities,
    function (activity) {
      return activity[aggregateBy];
    },
    function (activity) {
      return activity.homeId;
    },
    function (activity) {
      return moment(activity.activityDate)
        .startOf(timePeriod)
        .toDate();
    }
  );
  return grouped.map(function (dailyActivities) {
    return {
      key: dailyActivities[0],
      values: dailyActivities[1].map((homes) => ({
        key: homes[0] || 'null',
        values: homes[1].map((activities) => ({
          key: new Date(activities[0]),
          value: {
            activity_count: activities[1].length,
            activity_minutes: d3.sum(activities[1], function (
              activity
            ) {
              return parseFloat(activity.duration);
            }),
          },
        })),
      })),
    };
  });
};

export const mergeHomes = (dataRows, homeIds) => {
  return dataRows.map((homeRows) => ({
    key: homeRows.key,
    values: Object.entries(
      homeRows.values
        .map((r) => (homeIds.includes(r.key) ? r.values : []))
        .flat()
        .reduce((map, current) => {
          if (!map[current.key]) {
            map[current.key] = {
              activity_count: 0,
              activity_minutes: 0,
            };
          }

          /* This sum will total count of each resident of each activity.
          Which was not previously the case so there may be difference in counts */
          map[current.key].activity_count +=
            current.value.activity_count;
          map[current.key].activity_minutes +=
            current.value.activity_minutes;
          return map;
        }, {})
    ).map((val) => ({ key: val[0], value: val[1] })),
  }));
};
