/*
  Residents routes
*/

Router.route('/residents', function () {
  this.render('residents');
}, {
  name: 'residents'
});

Router.route('/resident/:residentId', function () {
  var controller = this;
  var residentId = controller.params.residentId;
  this.render('resident', {
    data: function() {
      return Residents.findOne(residentId);
    }
  });
}, {
  name: 'resident'
});
