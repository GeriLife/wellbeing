const moment = require('moment');

export const activityTypes = [
  { name: 'type1', _id: '1' },
  { name: 'type2', _id: '2' },
  { name: 'type3', _id: '3' },
];

export const roles = [
  { name: 'role1', _id: '1' },
  { name: 'role2', _id: '2' },
  { name: 'role3', _id: '3' },
];

const referenceDate = moment();
export const activitesCollection = [
  {
    activityTypeId: '1',
    facilitatorRoleId: '2',
    activityDate: moment(referenceDate).toString(),
    residentIds: ['DdJdbd6vZQ42MGerG', 'BmJdbd6vZQ42MGerG'],
    duration: 5,
  },
  {
    activityTypeId: '1',
    facilitatorRoleId: '3',
    activityDate: moment(referenceDate)
      .subtract(1, 'days')
      .toString(),
    residentIds: ['DdJdbd6vZQ42MGerG', 'BmJdbd6vZQ42MGerG'],
    duration: 5,
  },

  {
    activityTypeId: '3',
    facilitatorRoleId: '2',
    activityDate: moment(referenceDate)
      .subtract(2, 'days')
      .toString(),
    residentIds: ['DdJdbd6vZQ42MGerG', 'BmJdbd6vZQ42MGerG'],
    duration: 35,
  },

  {
    activityTypeId: '2',
    facilitatorRoleId: '3',
    activityDate: moment(referenceDate)
      .subtract(3, 'days')
      .toString(),
    residentIds: ['BmJdbd6vZQ42MGerG'],
    duration: 5,
  },

  {
    activityTypeId: '3',
    facilitatorRoleId: '2',
    activityDate: moment(referenceDate)
      .subtract(5, 'days')
      .toString(),
    residentIds: ['BmJdbd6vZQ42MGerG', 'LpJdbd6vZQ42MGeYh'],
    duration: 5,
  },

  {
    activityTypeId: '1',
    facilitatorRoleId: '3',
    activityDate: moment(referenceDate)
      .subtract(6, 'days')
      .toString(),
    residentIds: ['BmJdbd6vZQ42MGerG', 'LpJdbd6vZQ42MGeYh'],
    duration: 15,
  },
];

export const residencyData = [
  {
    residentId: 'DdJdbd6vZQ42MGerG',
    homeId: 'ZQ42bd6vZQ42MGerG',
    moveIn: '2020-01-10 00:00:00',
  },
  {
    residentId: 'BmJdbd6vZQ42MGerG',
    homeId: 'ZQ42bd6vZQ42MGerG',
    moveIn: '2020-01-11 00:00:00',
  },

  {
    residentId: 'LpJdbd6vZQ42MGeYh',
    homeId: 'ZQ42bd6vZQ42MGerG',
    moveIn: '2020-02-11 00:00:00',
  },
  {
    residentId: 'LpJdbd6vZQ42MGerG',
    homeId: 'ZQ42bd6vZQ42MGerG',
    moveIn: '2020-02-11 00:00:00',
  },
];

export const residentsData = [
  {
    _id: 'LpJdbd6vZQ42MGeYh',
    firstName: 'Shailee',
    lastInitial: 'M',
    onHiatus: true,
  },

  {
    _id: 'BmJdbd6vZQ42MGerG',
    firstName: 'Kunjan',
    lastInitial: 'P',
    onHiatus: false,
  },

  {
    _id: 'DdJdbd6vZQ42MGerG',
    firstName: 'Sohum',
    lastInitial: 'S',
    onHiatus: false,
  },
  {
    _id: 'LpJdbd6vZQ42MGerG',
    firstName: 'Vraj',
    lastInitial: 'S',
    onHiatus: false,
  },
];

export const homeData = [
  {
    _id: 'ZQ42bd6vZQ42MGerG',
    name: 'home-1',
    groupId: 'g1',
  },
];
