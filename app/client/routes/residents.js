/*
  Residents routes
*/

Router.route('/residents', function () {
  this.render('residents');
}, {
  name: 'residents'
});

Router.route(
  '/resident/:residentId',
  function () {
    var controller = this;
    var residentId = controller.params.residentId;
    Meteor.call('getResidentDetails', residentId, function (
      err,
      residentDetails
    ) {
      if (err || !residentDetails) {
        Router.go('/');
      } else {
        controller.render('resident', {
          data: function () {
            return residentDetails;
          },
        });
      }
    });
  },
  {
    name: 'resident',
  }
);

