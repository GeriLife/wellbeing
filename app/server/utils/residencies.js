export function hasOtherActiveResidencies({ _id, modifier }) {
  const residencyId = _id;
  /*
      The data collected from the form is in modifier so,
      If modifier exists:
        -If residency exists i.e. in edit mode:
          The form data is in $set (a mongo modifier)
        -else in create mode:
          the data is in modifier
      else the object must be empty

      Ref: https://github.com/aldeed/meteor-simple-schema/blob/master/DOCS.md#the-object-to-validate
    */
  let currentRecord = modifier || {};
  if (!!residencyId) {
    /* If edit, select the object set for updating. */
    currentRecord = modifier.$set || modifier.$unset;
  }

  let residentId;
  if (!!residencyId) {
    let resident = Residencies.findOne({ _id: residencyId });
    residentId = resident.residentId;
  } else {
    residentId = currentRecord.residentId;
  }

  let { moveOut, moveIn } = currentRecord;

  /*  the current user has other active residencies, then this entry is not allowed */
  return Meteor.call('hasOtherActiveResidencies', {
    residentId,
    residencyId,
    moveOut,
    moveIn,
  });
}
