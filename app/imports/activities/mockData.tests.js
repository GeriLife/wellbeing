export const mockInsertData = {
  residentIds: ['12333'],
  activityTypeId: '1223',
  activityDate: new Date(),
  duration: 5,
  facilitatorRoleId: '1233456',
};

export const insertWithInvalidActivityDate = {
  residentIds: ['12333'],
  activityTypeId: '1223',
  activityDate: new Date('2018-11-12'),
  facilitatorRoleId: '1233456',
  duration: 5,
};

export const updateActivityObject = {
  $set: {
    residentIds: ['12333', '1', '2', '3', '5'],
    activityTypeId: '1223',
    activityDate: new Date(),
    facilitatorRoleId: '1233456',
    duration: 5,
  },
};
