import { isCurrentUserAdmin } from '../utils/user';

function addOrUpdateAGroup(formData) {
  if (!isCurrentUserAdmin()) {
    throw new Meteor.Error(500, 'Operation not allowed');
  }

  if (formData._id) {
    const { _id, modifier } = formData;
    return Groups.update({ _id }, modifier);
  }
  return Groups.insert(formData);
}
Meteor.methods({
  addOrUpdateAGroup,
});
