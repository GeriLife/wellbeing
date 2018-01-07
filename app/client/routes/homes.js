/*
  Homes routes
*/
Router.route('/homes', function () {
  this.render('homes');
}, {
  name: 'homes'
});

Router.route('/home/:homeId', function () {
  var controller = this;
  var homeId = controller.params.homeId;
  this.render('home', {
    data: function() {
      return Homes.findOne(homeId);
    }
  });
}, {
  name: 'home'
});

Router.route('/latest-activities', function () {
  this.render('latestActivitiesByType');
}, {
  name: 'latestActivitiesByType'
});
