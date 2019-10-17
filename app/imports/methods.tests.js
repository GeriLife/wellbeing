import { homeMethods } from '../server/methods/homes';
import { residenciesMethods } from '../server/methods/residencies';

function addAfterWait(ResidencyObj) {
  return new Promise(function(resolve, reject) {
    setTimeout(async () => {
      try {
        const insertId2 = await Residencies.insert(ResidencyObj);
        resolve(insertId2);
      } catch (e) {
        reject(e);
      }
    }, 500);
  });
}

Meteor.methods({
  createTestUser(user) {
    const existingUser = Accounts.findUserByEmail(user.email);
    if (!existingUser) return Accounts.createUser(user);
    return existingUser;
  },
  removeUser(email) {
    return Meteor.users.remove({
      'emails.0.address': email,
    });
  },
  addActivity(activity) {
    return Activities.insert(activity);
  },
  updateActivity({ id, dataModifier }) {
    return Activities.update({ _id: id }, dataModifier);
  },
  getActivity() {
    return Activities.findOne();
  },
  addGroup(data) {
    return Groups.insert(data);
  },
  updateGroup(_id, data) {
    return Groups.update({ _id }, data);
  },
  removeGroup(id) {
    return Groups.remove(id);
  },
  addAndUpdateResidency({ data, updateObj }) {
    const insertId = Residencies.insert(data);
    try {
      return {
        updateResp: Residencies.update({ _id: insertId }, updateObj),
        insertId,
      };
    } catch (e) {
      return { error: e.sanitizedError.message, insertId };
    }
  },
  removeResidency(query) {
    return Residencies.remove(query);
  },

  async insertConsecutiveResidencies({ residency1, residency2 }) {
    try {
      const insertId1 = await Residencies.insert(residency1);
      const insertId2 = await addAfterWait(residency2);

      return {
        insertId1,
        insertId2,
      };
    } catch (e) {
      return { error: e.toString() };
    }
  },
  insertAndUpdateResident(validResident) {
    let insertId;
    try {
      insertId = Residents.insert(validResident);
      return {
        insertId,
        data: Residents.update(
          { _id: insertId },
          { $set: { firstName: 'new name' } }
        ),
      };
    } catch (e) {
      return { error: e.toString(), insertId };
    }
  }
});
