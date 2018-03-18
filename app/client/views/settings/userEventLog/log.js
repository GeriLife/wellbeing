import UserEventLog from '/both/collections/userEventLog';

Template.userEventLog.helpers({
  tableSettings () {
        return {
            rowsPerPage: 10,
            showFilter: false,
            fields: [
              'eventDate',
              'userId',
              'action',
              'entityType',
              'entityId',
            ],
        };
    }
})
