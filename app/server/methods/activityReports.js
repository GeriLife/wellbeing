/**
 * @namespace ActivityReport
 */
import _ from 'lodash';
import d3 from 'd3';
import moment from 'moment';

/**
 * @memberof ActivityReport
 * @name getActivityWithHomes
 *
 * Get a list of activities with the residents and their respective homes at
 * the time the activity was recorded.
 *
 * @param {Date} startDate start date of activities
 * @param {Number} endDate end date of activities
 *
 * @returns {Array}
 */
export const getActivityWithHomes = (startDate, endDate) => {
  /* Get all activities with their corresponding homeIds */
  const activityCondition =
    startDate && endDate
      ? {
          $and: [
            { activityDate: { $gte: new Date(startDate) } },
            { activityDate: { $lte: new Date(endDate) } },
          ],
        }
      : {};
  return Activities.find(activityCondition)
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
 * @memberof ActivityReport
 * @name aggregateActivitiesWithHome
 *
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
  return d3
    .nest()
    .key(function (activity) {
      return activity[aggregateBy];
    })
    .key(function (activity) {
      return activity.homeId;
    })
    .key(function (activity) {
      return moment(activity.activityDate)
        .startOf(timePeriod)
        .toDate();
    })
    .rollup(function (dailyActivities) {
      return {
        activity_count: dailyActivities.length,
        activity_minutes: d3.sum(dailyActivities, function (
          activity
        ) {
          return parseFloat(activity.duration);
        }),
      };
    })
    .entries(annotatedActivities);
};

/**
 * @memberof ActivityReport
 * @name mergeHomes
 *
 * Creates an array with key home name and contains value of activity count for each home
 * @param {Array} dataRows array of activities
 * @param {Array} homeIds array of homes
 *
 * @returns {Array}
 */
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

/**
 * @memberof ActivityReport
 * @name totalResidentsPerHome
 *
 * Get a map of all homes. For each home there is an array of all days between
 * startDate and endDate with percentage of resident activities for each day
 *
 * @param {Date} endDate date up to which data is to be fetched
 * @param {NumberConstructor} periodInDays days before the end date to include
 *
 * @returns {Object}
 */
export const totalResidentsPerHome = (endDate, periodInDays) => {
  const homes = Homes.find().fetch();
  const residents = Residencies.find({
    $and: [
      {
        moveIn: { $lte: new Date(endDate) },
      },
      {
        $or: [
          { moveOut: { $exists: false } },
          { moveOut: { $gte: new Date(endDate) } },
        ],
      },
    ],
  }).fetch();

  return homes.reduce((acc, current) => {
    return {
      ...acc,
      [current._id]: {
        name: current.name,
        residents: getResidentsForEachDay(
          residents,
          endDate,
          periodInDays
        ),
      },
    };
  }, {});
};

/**
 * @memberof ActivityReport
 * @name getResidentsForEachDay
 *
 * Gets start and end date based on input. For each day in the range, get number
 * of residents on that day
 * @param {Array} residents
 * @param {Date} endDate date up to which data is to be fetched
 * @param {NumberConstructor} periodInDays days before the end date to include
 *
 * @returns {Array}
 */
export const getResidentsForEachDay = (
  residents,
  endDate,
  periodInDays
) => {
  const startDate = moment(endDate)
    .clone()
    .subtract(periodInDays, 'days');
  const dates = enumerateDaysBetweenDates(startDate, endDate);
  return dates.map((date) => ({
    date,
    residents: residents.filter(
      (resident) =>
        new Date(resident.moveIn).getTime() <=
          new Date(date).getTime() &&
        (!resident.moveOut
          ? true
          : new Date(resident.moveOut).getTime() >
            new Date(date).getTime())
    ),
  }));
};

/**
 * @memberof ActivityReport
 * @name enumerateDaysBetweenDates
 *
 * Gets all days between  days
 * @param {Date} startDate
 * @param {Date} endDate
 *
 * @returns {Array}
 */
export const enumerateDaysBetweenDates = (startDate, endDate) => {
  const dates = [];

  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  while (currDate.add(1, 'days').diff(lastDate) < 0) {
    dates.push(currDate.clone().toDate());
  }

  return dates;
};

/**
 * @memberof ActivityReport
 * @name totalActiveResidentsPerHome
 *
 * Gets start and end date based on input. For each day in the range, get number
 * of active residents on that day.
 *
 * @param {Date} endDate date up to which data is to be fetched
 * @param {NumberConstructor} periodInDays days before the end date to include
 *
 * @returns {Object}
 */
export const totalActiveResidentsPerHome = (
  endDate,
  periodInDays
) => {
  const startDate = moment(endDate)
    .clone()
    .subtract(periodInDays, 'days');
  const activities = getActivityWithHomes(startDate, endDate);
  const homeActivityMap = activities.reduce((homeMap, current) => {
    if (!homeMap[current.homeId]) {
      homeMap[current.homeId] = {
        residentActivities: [],
      };
    }

    homeMap[current.homeId].residentActivities.push(current);
    return homeMap;
  }, {});

  Object.keys(homeActivityMap).forEach((home) => {
    const dates = enumerateDaysBetweenDates(startDate, endDate);

    homeActivityMap[home].residents = dates.map((date) => ({
      date,
      residents: homeActivityMap[home].residentActivities.filter(
        (resident) => {
          return (
            moment(resident.activityDate).format('YYYY-MM-DD') ===
            moment(date).format('YYYY-MM-DD')
          );
        }
      ),
    }));
  });
  return homeActivityMap;
};

/**
 * @memberof ActivityReport
 * @name calculatePercentageActivityPerHomePerDay
 *
 * For each home average out the daily activity percentage by the number of days
 *
 * @param {Date} endDate date up to which data is to be fetched
 * @param {NumberConstructor} periodInDays days before the end date to include
 *
 * @returns {Array} homes = [
    {
      activityPercentagePerDay: Array,
      averageTotalResidents: Number,
      averageDailyActivities: Number,
    },
  ]; */
export const calculatePercentageActivityPerHomePerDay = ({
  endDate,
  periodInDays,
}) => {
  const activitiesPerHome = totalActiveResidentsPerHome(
    endDate,
    periodInDays
  );

  const residentsPerHome = totalResidentsPerHome(
    endDate,
    periodInDays
  );

  return Object.keys(residentsPerHome)
    .map((home) => {
      const activityDailyMap = (
        activitiesPerHome[home] || { residents: [] }
      ).residents.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.date]: curr.residents ? curr.residents.length : 0,
        }),
        {}
      );
      const residentMap = residentsPerHome[home].residents.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.date]: curr.residents ? curr.residents.length : 0,
        }),
        {}
      );
      const activityPercentagePerDay = Object.keys(residentMap).map(
        (date) => {
          return !residentMap[date]
            ? 0
            : (activityDailyMap[date] * 100) / residentMap[date];
        }
      );

      const currentHome = residentsPerHome[home];
      return {
        home,
        homeName: currentHome.name,
        activityPercentagePerDay,

        /* Total residents in each home everyday divided by total days */
        averageTotalResidents: !currentHome.residents
          ? 0
          : currentHome.residents.reduce(
              (total, current) => total + current.residents.length,
              0
            ) / currentHome.residents.length,

        /* sum of all activities of a period of days divided by total days */
        averageDailyActivities:
          activityPercentagePerDay.length === 0
            ? 0
            : activityPercentagePerDay.reduce(
                (total, current) => total + (current || 0),
                0
              ) / activityPercentagePerDay.length,
      };
    })
    .sort(
      (prev, curr) =>
        curr.averageDailyActivities - prev.averageDailyActivities
    );
};

/**
 * @memberof ActivityReport
 * @name getEdgeValues
 *
 * Gets top 5 and bottom 5 values by activity levels. Zeros are considered as bottom by default.
 * If there are greater than 5 records then it will only get top values.
 *
 * @param {Array} homes list of homes to filter from
 *
 * @returns {Array}
 */
export const getEdgeValues = (homes) => {
  /* get unique values */
  const uniqueValues = Array.from(
    new Set(homes.map((r) => r.averageDailyActivities))
  ).sort(
    (prev, curr) =>
      curr.averageDailyActivities - prev.averageDailyActivities
  );

  const top5Values = uniqueValues.filter((v) => !!v).slice(0, 5);
  let bottom5Values = [0];

  if (uniqueValues.length > 5) {
    bottom5Values = [
      ...bottom5Values,
      ...uniqueValues
        .filter((value) => !top5Values.includes(value))
        .slice(uniqueValues.length < 5 ? 0 : uniqueValues.length - 5),
    ];
  }

  /* Return top 5 */
  return {
    top5: homes.filter((home) =>
      top5Values.includes(home.averageDailyActivities)
    ),
    bottom5: homes.filter((home) =>
      bottom5Values.includes(home.averageDailyActivities)
    ),
  };
};

/**
 * @memberof ActivityReport
 * @name getEdgeValuesByPeriod
 *
 * Gets top 5 and bottom 5 values by activity levels. It gets values from the selected date
 * range based on endDate and periodInDays
 *
 * @param {Date} endDate date up to which data is to be fetched
 * @param {NumberConstructor} periodInDays days before the end date to include
 *
 * @returns {Array}
 */
export const getEdgeValuesByPeriod = ({ endDate, periodInDays }) => {
  return getEdgeValues(
    calculatePercentageActivityPerHomePerDay({
      endDate,
      periodInDays,
    })
  );
};
