
const fields = [
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
];

Template.userEventLog.onCreated(function () {
  const instance = this;

  instance.logs = new ReactiveVar([]);

  Meteor.call('getUserEventLogs', function (err, logsDetails) {
    if (!err) {
      instance.logs.set(logsDetails);
    }
  });
});

Template.userEventLog.helpers({
  tableSettings() {
    return {
      rowsPerPage: 10,
      showFilter: false,
      fields,
    };
  },

  logs() {
    return Template.instance().logs.get();
  },
});
