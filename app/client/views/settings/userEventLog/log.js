import UserEventLog from '/both/collections/userEventLog';

Template.userEventLog.helpers({
  tableSettings() {
    return {
      rowsPerPage: 10,
      showFilter: false,
      fields: [
        {
          key: 'eventDate',
          label: TAPi18n.__('userEventLog.eventDate'),
        },
        {
          key: 'userId',
          label: TAPi18n.__('userEventLog.userId'),
        },
        {
          key: 'action',
          label: TAPi18n.__('userEventLog.action'),
        },
        {
          key: 'entityType',
          label: TAPi18n.__('userEventLog.entityType'),
        },
        {
          key: 'entityId',
          label: TAPi18n.__('userEventLog.entityId'),
        },
      ],
    };
  },
});
