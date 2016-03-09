Template.residents.created = function () {
  // Get reference to template instance
  var instance = this;

  // Reactive variable to toggle resident subscription based on departed status
  instance.includeDeparted = new ReactiveVar();

  // Subscribe to all homes, for data table
  instance.subscribe("allHomes");

  // Toggle resident subscription based on departed status
  instance.autorun(function () {
    // If include departed is checked
    if (instance.includeDeparted.get() === true) {
      // Show all residents
      instance.subscribe("allResidents");
    } else {
      // Otherwise, show only current residents
      instance.subscribe("allCurrentResidents");
    }
  });
};

Template.residents.helpers({
  'residents': function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Make sure subscriptions are ready
    if (instance.subscriptionsReady()) {
      // Create a placeholder array for resident objects
      var residentsArray = [];

      // Get all residents
      var residents = Residents.find().fetch();

        // Iterate through residents
        // set full name and home name from collection helpers
        residents.forEach(function (resident) {
          var residentObject = {
            fullName: resident.fullName(),
            homeName: resident.homeName(),
            residentId: resident._id
          };

          // Add resident object to residents list
          residentsArray.push(residentObject);

        });

      return residentsArray;
    }

    // return an empty array if no data is available
    return [];
  },
  'tableSettings': function () {
    // Create placeholder object for filter labels
    const tableLabels = {};

    // Get translation strings for filter values
    tableLabels.fullName = TAPi18n.__("residents-tableLabels-fullName");
    tableLabels.homeName = TAPi18n.__("residents-tableLabels-homeName");

    var tableSettings = {
      showFilter: false,
      fields: [
        {
          key: 'fullName',
          label: tableLabels.fullName,
          sortOrder: 0,
          sortDirection: 'ascending'
        },
        {
          key: 'homeName',
          label: tableLabels.homeName,
          sortOrder: 1,
          sortDirection: 'ascending'
        }
      ],
      filters: ['nameFilter', 'homeFilter']
    };

    return tableSettings;
  },
  "nameFilterFields": function () {
    // Return relevant field name(s) for name filter
    return ['fullName'];
  },
  "homeFilterFields": function () {
    // Return relevant field name(s) for home filter
    return ['homeName'];
  },
  "filterLabels": function () {
    // Create placeholder object for filter labels
    const filterLabels = {};

    // Get translation strings for filter values
    filterLabels.fullName = TAPi18n.__("residents-filterLabels-fullName");
    filterLabels.homeName = TAPi18n.__("residents-filterLabels-homeName");

    return filterLabels;
  }
});

Template.residents.events({
  'click .reactive-table tbody tr': function (event) {
    event.preventDefault();

    // Get Resident ID from table
    var residentId = this.residentId;

    // Show view for selected resident
    Router.go('resident', {residentId: residentId})
  },
  'click #new-resident': function () {
    // Show the edit home modal
    Modal.show('newResident');
  },
  'click #include-departed': function (event) {
    var instance = Template.instance();

    var includeDepartedValue = event.target.checked;

    instance.includeDeparted.set(includeDepartedValue);
  }
});
