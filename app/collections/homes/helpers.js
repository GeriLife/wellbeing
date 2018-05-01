import Groups from '/collections/groups';
import Homes from './';

Homes.helpers({
  groupName: function () {
    // Get the Group ID;
    var groupId = this.groupId;

    // Get Group from Groups collection, by ID(s)
    var group = Groups.findOne(groupId);

    // Return the Group name
    return group.name;
  }
});
