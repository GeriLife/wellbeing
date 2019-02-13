Template.residents.onCreated(function () {
  const templateInstance = this;

  // Reactive variable to toggle resident subscription based on departed status
  templateInstance.includeDeparted = new ReactiveVar();

  // Subscribe to all homes, for data table
  templateInstance.subscribe("allHomes");
  templateInstance.subscribe("allResidents")

  // Toggle resident subscription based on departed status
  templateInstance.autorun(function () {
    // If include departed is checked
    if (templateInstance.includeDeparted.get() === true) {
      // Get all residencies
      templateInstance.subscribe("allResidencies");
    } else {
      // Otherwise, get only current residencies
      templateInstance.subscribe("allCurrentResidencies");
    }
  });
});

Template.residents.helpers({
  residencies() {
    const templateInstance = Template.instance();

    // Make sure subscriptions are ready
    if (templateInstance.subscriptionsReady()) {
      // Create a placeholder array for residency details objects
      const residencyDetailsArray = [];

      const residencies = Residencies.find().fetch();

      // Iterate through residents
      // set full name and home name from collection helpers
      residencies.forEach(function (residency) {
        let residentName, homeName;

        const resident = Residents.findOne(residency.residentId);
        const home = Homes.findOne(residency.homeId);

        if (resident) {
          residentName = resident.fullName();
        } else {
          residentName = 'unknown';
        }

        if (home) {
          homeName = home.name;
        } else {
          homeName = 'unknown';
        }

        const residencyDetails = {
          ...residency,
          residentName,
          homeName,
        };

        // Add resident object to residents list
        residencyDetailsArray.push(residencyDetails);
      });

      return residencyDetailsArray;
    }

    // return an empty array if no data is available
    return [];
  },
  tableSettings() {
    // Create placeholder object for filter labels
    const tableLabels = {};

    // Get translation strings for filter values
    tableLabels.viewResident = TAPi18n.__("residents-tableLabels-viewResident");
    tableLabels.fullName = TAPi18n.__("residents-tableLabels-fullName");
    tableLabels.homeName = TAPi18n.__("residents-tableLabels-homeName");
    tableLabels.residency = TAPi18n.__("residents-tableLabels-residency");

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
          sortDirection: 'ascending'
        },
        {
          key: 'homeName',
          label: tableLabels.homeName,
          sortOrder: 1,
          sortDirection: 'ascending'
        },
        {
          key: 'homeId',
          label: tableLabels.residency,
          tmpl: Template.residentCurrentResidency,
          hidden: function () {
            var currentUserId = Meteor.userId();

            // Check if current user has Admin role
            var currentUserIsAdmin = Roles.userIsInRole(currentUserId, ["admin"]);

            // Only show edit column for users with Admin role
            if (currentUserIsAdmin) {
              return false;
            } else {
              return true;
            }
          },
        }
      ],
      filters: ['nameFilter', 'homeFilter']
    };

    return tableSettings;
  },
  nameFilterFields () {
    // Return relevant field name(s) for name filter
    return ['residentName'];
  },
  homeFilterFields() {
    // Return relevant field name(s) for home filter
    return ['homeName'];
  },
  filterLabels () {
    // Create placeholder object for filter labels
    const filterLabels = {};

    // Get translation strings for filter values
    filterLabels.fullName = TAPi18n.__("residents-filterLabels-fullName");
    filterLabels.homeName = TAPi18n.__("residents-filterLabels-homeName");

    return filterLabels;
  }
});

Template.residents.events({
  'click #new-resident' () {
    // Show the edit home modal
    Modal.show('addResidencyModal');
  },
  'click #include-departed' (event) {
    const instance = Template.instance();

    const includeDepartedValue = event.target.checked;

    instance.includeDeparted.set(includeDepartedValue);
  }
});
