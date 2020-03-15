export const resident = {
  firstName: 'Rajesh',
  lastInitial: 'K',
};

export const home = {
  name: 'Puvar',
  groupId: 'aDummyGroupId1',
};

export const conflictingResidencyWithoutMoveOut = {
  moveIn: '2019-03-13',
};

export const conflictingResidencyWithMoveOut = {
  moveIn: '2019-03-12',
  moveOut: '2019-03-21',
};

export const invalidResidency = {
  moveIn: '2019-03-12',
  moveOut: '2019-03-01',
};

export const validResidency = {
  moveOut: '2019-03-12',
  moveIn: '2019-03-01',
};

export const updateWithInvalidResidency = {
  moveOut: '2019-03-12',
  moveIn: '2020-03-01',
  $set: {},
};
