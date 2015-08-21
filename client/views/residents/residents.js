Template.residents.created = function () {
  this.subscribe('residentsHomesComposite');
};

Template.residents.helpers({
  'residents': function () {
    // Get all residents
    var residents = Residents.find().fetch();

    // Create a placeholder array for resident objects
    var residentsArray = [];

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
  },
  'tableSettings': function () {
    var tableSettings = {
      showFilter: false,
      fields: [
        {
          key: 'fullName',
          label: 'Resident Name',
          sortOrder: 0,
          sortDirection: 'ascending'
        },
        {
          key: 'homeName',
          label: 'Home Name',
          sortOrder: 1,
          sortDirection: 'ascending'
        }
      ],
      filters: ['nameFilter', 'homefilter']
    };

    return tableSettings;
  }
});

Template.residents.events({
  'click .reactive-table tbody tr': function (event) {
    event.preventDefault();

    // Get Resident ID from table
    var residentId = this.residentId;

    // Show view for selected resident
    Router.go('resident', {residentId: residentId})
  }
});
