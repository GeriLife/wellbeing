function updateResidents(templateInstance, includeDeparted) {
  // Get all residents, respecting departed setting
  Meteor.call(
    'getResidentsWithHomeAndResidentDetails',
    includeDeparted,
    function (err, { managesAGroup, residencies }) {
      if (!err) {
        templateInstance.managesAGroup.set(managesAGroup);
        templateInstance.residencies.set(residencies || []);
      }
    }
  );
}

Template.residents.onCreated(function () {
  const templateInstance = this;

  // Reactive variable to toggle resident subscription based on departed status
  templateInstance.includeDeparted = new ReactiveVar();
  templateInstance.managesAGroup = new ReactiveVar(false);
  templateInstance.residencies = new ReactiveVar(null);

  updateResidents(
    templateInstance,
    templateInstance.includeDeparted.get()
  );

  // Toggle resident subscription based on departed status
  templateInstance.autorun(function () {
    const includeDeparted = templateInstance.includeDeparted.get();
    updateResidents(templateInstance, includeDeparted);

    if (Session.get('refresh-residents')) {
      Session.set('refresh-residents', false);
    }
  });
});

Template.residents.helpers({
  residencies() {
    const templateInstance = Template.instance();
    return templateInstance.residencies.get() || [];
  },

  hasResidencies() {
    const templateInstance = Template.instance();
    return templateInstance.residencies.get() !== null;
  },

  tableSettings() {
    // Create placeholder object for filter labels
    const tableLabels = {};
    const templateInstance = Template.instance();

    // Get translation strings for filter values
    tableLabels.viewResident = TAPi18n.__(
      'residents-tableLabels-viewResident'
    );
    tableLabels.fullName = TAPi18n.__(
      'residents-tableLabels-fullName'
    );
    tableLabels.homeName = TAPi18n.__(
      'residents-tableLabels-homeName'
    );
    tableLabels.residency = TAPi18n.__(
      'residents-tableLabels-residency'
    );

    const tableSettings = {
      showFilter: false,
      fields: [
        {
          key: 'homeId',
          label: tableLabels.viewResident,
          tmpl: Template.residentViewButton,
        },
        {
          key: 'residentName',
          label: tableLabels.fullName,
          sortOrder: 0,
          sortDirection: 'ascending',
          tmpl: Template.residentName,
        },
        {
          key: 'homeName',
          label: tableLabels.homeName,
          sortOrder: 1,
          sortDirection: 'ascending',
        },
        {
          key: 'homeId',
          label: tableLabels.residency,
          tmpl: Template.residentCurrentResidency,
          hidden: function () {
            return !templateInstance.managesAGroup.get();
          },
        },
      ],
      filters: ['nameFilter', 'homeFilter'],
    };

    return tableSettings;
  },
  nameFilterFields() {
    // Return relevant field name(s) for name filter
    return ['residentName'];
  },
  homeFilterFields() {
    // Return relevant field name(s) for home filter
    return ['homeName'];
  },
  filterLabels() {
    // Create placeholder object for filter labels
    const filterLabels = {};

    // Get translation strings for filter values
    filterLabels.fullName = TAPi18n.__(
      'residents-filterLabels-fullName'
    );
    filterLabels.homeName = TAPi18n.__(
      'residents-filterLabels-homeName'
    );

    return filterLabels;
  },
  managesAGroup() {
    return Template.instance().managesAGroup.get();
  },
});

Template.residents.events({
  'click #new-resident'() {
    // Show the edit home modal
    Modal.show('addResidencyModal');
  },
  'click #include-departed'(event) {
    const instance = Template.instance();

    const includeDepartedValue = event.target.checked;

    instance.includeDeparted.set(includeDepartedValue);
  },
});
