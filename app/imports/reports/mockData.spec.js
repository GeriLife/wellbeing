const moment = require('moment');

export const activityTypes = [
  { name: 'type1', _id: '1' },
  { name: 'type2', _id: '2' },
  { name: 'type3', _id: '3' },
  { name: 'activityTestActId', _id: 'activityTestActId' },
];

export const roles = [
  { name: 'role1', _id: '1' },
  { name: 'role2', _id: '2' },
  { name: 'role3', _id: '3' },
];

export const annotateActivityInput = [
  {
    activityTypeId: '1',
    facilitatorRoleId: '2',
  },
  {
    activityTypeId: '3',
    facilitatorRoleId: '3',
  },
];

export const annotateActivityResult = [
  {
    activityTypeId: '1',
    facilitatorRoleId: '2',
    activityTypeName: 'type1',
    facilitatorName: 'role2',
  },
  {
    activityTypeId: '3',
    facilitatorRoleId: '3',
    activityTypeName: 'type3',
    facilitatorName: 'role3',
  },
];

export const activitesCollection = [
  {
    activityTypeId: '1',
    facilitatorRoleId: '2',
    activityDate: new Date('2020-01-01 12:00:00'),
    residentIds: ['2', '23', '12', '5', '34', '77'],
    duration: 5,
  },
  {
    activityTypeId: '1',
    facilitatorRoleId: '3',
    activityDate: new Date('2020-01-03 12:00:00'),
    residentIds: ['2', '42', '12', '5', '5', '77'],
    duration: 5,
  },

  {
    activityTypeId: '3',
    facilitatorRoleId: '2',
    activityDate: new Date('2020-01-08 12:00:00'),
    residentIds: ['5', '7', '77'],
    duration: 35,
  },

  {
    activityTypeId: '2',
    facilitatorRoleId: '3',
    activityDate: new Date('2019-12-08 12:00:00'),
    residentIds: ['2', '44', '7', '21'],
    duration: 5,
  },

  {
    activityTypeId: '3',
    facilitatorRoleId: '2',
    activityDate: new Date('2019-12-12 12:00:00'),
    residentIds: ['1', '3', '78', '77', '5', '7'],
    duration: 5,
  },

  {
    activityTypeId: '1',
    facilitatorRoleId: '3',
    activityDate: new Date('2019-12-21 12:00:00'),
    residentIds: ['2', '44', '12', '5', '7', '77'],
    duration: 15,
  },
];

export const activitySummaryData = [
  {
    activityTypeId: 'activityTestActId',
    facilitatorRoleId: '1',
    activityDate: moment().toDate(),
    residentIds: ['activityTestResId'],
    duration: 15,
  },
  {
    activityTypeId: 'activityTestActId',
    facilitatorRoleId: '1',
    activityDate: moment()
      .subtract(3, 'days')
      .toDate(),
    residentIds: ['activityTestResId'],
    duration: 15,
  },
  {
    activityTypeId: 'activityTestActId',
    facilitatorRoleId: '1',
    activityDate: moment()
      .subtract(34, 'days')
      .toDate(),
    residentIds: ['activityTestResId'],
    duration: 15,
  },
];

export const annotatedActivites = [
  {
    activityTypeId: '1',
    facilitatorRoleId: '2',
    activityTypeName: 'type1',
    facilitatorName: 'role2',
    activityDate: moment('2020-01-01 12:00:00').toDate(),
    duration: 5,
  },
  {
    activityTypeId: '1',
    facilitatorRoleId: '3',
    activityTypeName: 'type1',
    facilitatorName: 'role3',
    activityDate: moment('2020-01-03 12:00:00').toDate(),
    duration: 5,
  },

  {
    activityTypeId: '3',
    facilitatorRoleId: '2',
    activityTypeName: 'type3',
    facilitatorName: 'role2',
    activityDate: moment('2020-01-08 12:00:00').toDate(),
    duration: 35,
  },

  {
    activityTypeId: '2',
    facilitatorRoleId: '3',
    activityTypeName: 'type2',
    facilitatorName: 'role3',
    activityDate: moment('2019-12-08 12:00:00').toDate(),
    duration: 5,
  },

  {
    activityTypeId: '3',
    facilitatorRoleId: '2',
    activityTypeName: 'type3',
    facilitatorName: 'role2',
    activityDate: moment('2019-12-12 12:00:00').toDate(),
    duration: 5,
  },

  {
    activityTypeId: '1',
    facilitatorRoleId: '3',
    activityTypeName: 'type1',
    facilitatorName: 'role3',
    activityDate: moment('2019-12-21 12:00:00').toDate(),
    duration: 15,
  },
];

export const aggregatedActivitiesByTypeAndMonth = [
  {
    key: 'type1',
    values: [
      {
        key:
          'Wed Jan 01 2020 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 2, activity_minutes: 10 },
      },
      {
        key:
          'Sun Dec 01 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 15 },
      },
    ],
  },
  {
    key: 'type3',
    values: [
      {
        key:
          'Wed Jan 01 2020 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 35 },
      },
      {
        key:
          'Sun Dec 01 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 5 },
      },
    ],
  },
  {
    key: 'type2',
    values: [
      {
        key:
          'Sun Dec 01 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 5 },
      },
    ],
  },
];
export const aggregatedActivitiesByTypeAndWeek = [
  {
    key: 'type1',
    values: [
      {
        key:
          'Sun Dec 29 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 2, activity_minutes: 10 },
      },
      {
        key:
          'Sun Dec 15 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 15 },
      },
    ],
  },
  {
    key: 'type3',
    values: [
      {
        key:
          'Sun Jan 05 2020 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 35 },
      },
      {
        key:
          'Sun Dec 08 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 5 },
      },
    ],
  },
  {
    key: 'type2',
    values: [
      {
        key:
          'Sun Dec 08 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 5 },
      },
    ],
  },
];
export const aggregatedActivitiesByFaciliatatorAndWeek = [
  {
    key: 'role2',
    values: [
      {
        key:
          'Sun Dec 29 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 5 },
      },
      {
        key:
          'Sun Jan 05 2020 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 35 },
      },
      {
        key:
          'Sun Dec 08 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 5 },
      },
    ],
  },
  {
    key: 'role3',
    values: [
      {
        key:
          'Sun Dec 29 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 5 },
      },
      {
        key:
          'Sun Dec 08 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 5 },
      },
      {
        key:
          'Sun Dec 15 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 15 },
      },
    ],
  },
];
export const aggregatedActivitiesByFaciliatatorAndMonth = [
  {
    key: 'role2',
    values: [
      {
        key:
          'Wed Jan 01 2020 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 2, activity_minutes: 40 },
      },
      {
        key:
          'Sun Dec 01 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 5 },
      },
    ],
  },
  {
    key: 'role3',
    values: [
      {
        key:
          'Wed Jan 01 2020 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 1, activity_minutes: 5 },
      },
      {
        key:
          'Sun Dec 01 2019 00:00:00 GMT+0530 (India Standard Time)',
        value: { activity_count: 2, activity_minutes: 20 },
      },
    ],
  },
];

export const residencyData = [
  {
    residentId: '1',
    homeId: '1',
    moveIn: new Date('2019-01-30 00:00:00'),
    moveOut: new Date('2019-02-28 00:00:00'),
  },
  {
    residentId: 'BmJdgv6vZQ42MGerG',
    homeId: '1',
    moveIn: new Date('2020-01-10 00:00:00'),
  },
  {
    residentId: 'LmJdgv6vZQ42MFerG',
    homeId: '12',
    moveIn: new Date('2020-01-12 00:00:00'),
  },
  {
    residentId: 'LmJgdv6vZQ42MFerG',
    homeId: '112',
    moveIn: new Date('2020-01-04 00:00:00'),
  },
  {
    residentId: 'DmJdgv6vZQ42MFerG',
    homeId: '112',
    moveIn: new Date('2020-01-04 00:00:00'),
  },
  {
    residentId: 'DJJggv6vZQ42MFerG',
    homeId: '112',
    moveIn: new Date('2020-01-04 00:00:00'),
  },
];

export const residentsData = [
  {
    _id: 'BmJdgv6vZQ42MGerG',
    firstName: 'Shailee',
    lastInitial: 'M',
    onHiatus: false,
  },
];

export const residentsScenario1 = [
  {
    _id: 'LmJgdv6vZQ42MFerG',
    firstName: 'kirti',
    lastInitial: 'K',
    onHiatus: false,
  },
];

export const residentsScenario2 = [
  {
    _id: 'DmJdgv6vZQ42MFerG',
    firstName: 'kirti',
    lastInitial: 'K',
    onHiatus: false,
  },
];

export const residentsScenario3 = [
  {
    _id: 'DJJggv6vZQ42MFerG',
    firstName: 'kirti',
    lastInitial: 'K',
    onHiatus: false,
  },
];

export const activitySummaryResident = [
  {
    _id: 'activityTestResId',
    firstName: 'activityTestResId',
    lastInitial: 'i',
    onHiatus: false,
  },
];

export const activitySummaryResidency = [
  {
    residentId: 'activityTestResId',
    homeId: '1',
    moveIn: new Date('2019-01-30 00:00:00'),
  },
];

const referenceDate = moment().toDate();
export const activitiesForTestingActivityLevelConditions = [
  {
    activityTypeId: '1',
    facilitatorRoleId: '2',
    activityDate: referenceDate,
    residentIds: ['DmJdgv6vZQ42MFerG', 'DJJggv6vZQ42MFerG'],
    duration: 5,
  },

  {
    activityTypeId: '1',
    facilitatorRoleId: '2',
    activityDate: moment(referenceDate)
      .subtract(1, 'days')
      .toDate(),
    residentIds: ['DmJdgv6vZQ42MFerG', 'DJJggv6vZQ42MFerG'],
    duration: 5,
  },

  {
    activityTypeId: '1',
    facilitatorRoleId: '2',
    activityDate: moment(referenceDate)
      .subtract(2, 'days')
      .toDate(),
    residentIds: ['DJJggv6vZQ42MFerG'],
    duration: 5,
  },

  {
    activityTypeId: '1',
    facilitatorRoleId: '2',
    activityDate: moment(referenceDate)
      .subtract(3, 'days')
      .toDate(),
    residentIds: ['DJJggv6vZQ42MFerG'],
    duration: 5,
  },
  {
    activityTypeId: '1',
    facilitatorRoleId: '2',
    activityDate: moment(referenceDate)
      .subtract(4, 'days')
      .toDate(),
    residentIds: ['DJJggv6vZQ42MFerG'],
    duration: 5,
  },
  {
    activityTypeId: '1',
    facilitatorRoleId: '2',
    activityDate: moment(referenceDate)
      .subtract(5, 'days')
      .toDate(),
    residentIds: ['DJJggv6vZQ42MFerG'],
    duration: 5,
  },
];

export const homesData = [
  {
    _id: '1',
    name: 'home-1',
    groupId: 'g1',
  },
];

export const feelingsData = [
  {
    _id: 'QnzqqsWjTeB5J5qJB',
    residentId: 'DJJggv6vZQ42MFerG',
    feeling: 'joy',
    date: moment().toDate(),
  },

  {
    _id: 'QnzqqsWjTeB5J5jbA',
    residentId: 'DJJggv6vZQ42MFerG',
    feeling: 'fear',
    date: moment().toDate(),
  },

  {
    _id: 'QnzqqsWeJtB5J5jbA',
    residentId: 'DJJggv6vZQ42MFerG',
    feeling: 'fear',
    date: moment().toDate(),
  },

  {
    _id: 'AbzqqsWjTeB5J5qJB',
    residentId: 'Cp5BfRj8EA848MS2b',
    feeling: 'fear',
    date: moment().toDate(),
  },

  {
    _id: 'cDzqqsWjTeB5J5qJB',
    residentId: 'Cp5BfRj8EA848MS3c',
    feeling: 'sad',
    date: moment().toDate(),
  },

  {
    _id: '3FzqqsWjTeB5J5qJB',
    residentId: 'Cp5BfRj8EA848MSd4',
    feeling: 'anger',
    date: moment().toDate(),
  },
];
