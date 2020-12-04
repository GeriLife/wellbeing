import moment from "moment";
import {
  checkUserPermissions,
  getActiveResidency,
} from '../../both/utils';

function updateResidentInfo(residentInfo) {
  const userId = this.userId || Meteor.userId();
  const doc = {
    _id: residentInfo._id,
    ...residentInfo.modifier.$set,
  };

  const schemaType = 'resident';
  const action = 'update';
  const residentId = doc._id;

  /* Get an active residency for a given resident */
  const activeResidency = getActiveResidency(residentId);
  doc.homeId = activeResidency ? activeResidency.homeId : '';

  const isOperationAllow = checkUserPermissions({
    schemaType,
    action,
    userId,
    doc,
  });

  if (!isOperationAllow) {
    throw new Meteor.Error(500, 'Operation not allowed');
  }

  const { _id, modifier } = residentInfo;
  return Residents.update({ _id }, modifier);
}

Meteor.methods({
  getAllResidentIds() {
    // TODO: determine how to secure this method to prevent client abuse

    // Get all residents
    const residents = Residents.find().fetch();

    return _.map(residents, function(resident) {
      return resident._id;
    });

  },
  getResidentActivitiesByType({ residentId, activityTypeId, period }) {
    // Date period ago
    const activityPeriodStart = moment()
      .subtract(period, "days")
      .toDate();

    // Date today
    const now = new Date();

    // Get all activities of a specific type involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    return Activities.find(
      {
        residentIds: residentId,
        activityTypeId: activityTypeId,
        activityDate: { $gte: activityPeriodStart, $lte: now }
      },
      { sort: { activityDate: -1 } }
    ).fetch();
  },
  getCountOfResidentActivitiesByType({ residentId, activityTypeId, period }) {
    return Meteor.call("getResidentActivitiesByType", {
      residentId,
      activityTypeId,
      period
    }).length;
  },
  getAllResidentSelectOptions() {
    /*
    return an array of resident objects in the form of:
       label: firstName lastInitial
       value: residentId
   */

    // Get all residents
    const residents = Residents.find().fetch();

    return _.map(residents, resident => {
      return {
        label: `${resident.firstName} ${resident.lastInitial}`,
        value: resident._id,
      };
    });

  },
  getMinutesOfResidentActivitiesByType({
    residentId,
    activityTypeId,
    period,
  }) {
    const residentActivities = Meteor.call(
      'getResidentActivitiesByType',
      {
        residentId,
        activityTypeId,
        period,
      }
    );

    // Sum of duration for particular resident & activity
    return residentActivities.reduce(
      (prevResult, document) => prevResult + document.duration,
      0
    );
  },
  getUserVisibleResidentIds(userId, departed) {
    const visibleResidencyIds = Meteor.call(
      "getUserVisibleResidencyIds",
      userId,
      departed
    );

    return Residencies.find({
      _id: { $in: visibleResidencyIds }
    }).map(residency => residency.residentId);
  },
  userVisibleResidentNamesGroupedtByHomes() {
    const userId = this.userId;

    // Get list of homes, sorted alphabetically
    const homeIds = Meteor.call("getUserVisibleHomeIds", userId);

    const homes = Homes.find(
      { _id: { $in: homeIds } },
      { sort: { name: 1 } }
    ).fetch();

    // Create an array residents grouped by home
   return _.map(homes, function(home) {
      // do not show departed residents
      const notDeparted = {
        moveOut: {
          $exists: false
        }
      };

      // Get a list of residents for current home
      const homeResidents = Residencies.find({
        homeId: home._id,
        ...notDeparted
      })
        .fetch()
        .map(function(residence) {
          const residentId = residence.residentId;
          const resident = Residents.findOne(residentId);

          const fullName = resident.fullName();
          return { ...residence, fullName };
        });
      // Create an object containing a home and its residents
      return {
        optgroup: home.name,
        options: _.chain(homeResidents)
          .map(function(resident) {
            // Create an object containing the resident name and ID
            return {
              value: resident.residentId,
              label: resident.fullName,
            };

          })
          .sortBy('label')
          .value(),
      };
    });
  },

  getResidentsWithoutActiveResidencies() {
    const activeResidencies = Meteor.call("getCurrentResidencies");
    const activeResidents = activeResidencies.map(residency => residency.residentId);

    return Residents.find({
      _id: {
        $nin: activeResidents
      }
    }, {
        sort: {
          firstName: 1,
          lastInitial: 1
        }
      }).fetch();
  },

  getResidentDetailsApi({ residentId }) {
    return Meteor.call('getResidentDetails', residentId);
  },

  getResidentDetails(residentId) {
    let fields = {
      _id: 1,
      firstName: 1,
    };

    // Some fields should only be published to authenticated users
    if (Meteor.user) {
      fields.lastInitial = 1;
      fields.onHiatus = 1;
      fields.departed = 1;
    }

    return Residents.findOne(residentId, { fields });
  },

  updateResidentInfo,

  getSelectedResidentDetails(residentIds) {
    const condition = residentIds && residentIds.length > 0 ? { _id: { $in: residentIds } } : {};
    const residents = Residents.find(condition).fetch();
    return residents.map((resident) => ({
      ...resident,
      residentFullName: resident.lastInitial
        ? `${resident.firstName} ${resident.lastInitial}`
        : resident.firstName,
    }));
  },
});
