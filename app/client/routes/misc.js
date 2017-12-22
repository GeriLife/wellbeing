/*
  Misc
*/

Router.route('/graph', function () {
  this.render('graph');
}, {
  name: 'graph'
});

Router.route('/toggle', function () {
  this.render('subscriptionToggle');
}, {
  name: 'subscriptionToggle'
});
