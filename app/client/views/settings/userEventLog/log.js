import UserEventLog from '/collections/user_event_log';

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
