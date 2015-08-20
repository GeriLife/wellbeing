/*
  Management routes
*/
Router.map(function () {
    this.route('manageGroups', {
        path: '/manage/groups',
        template: 'manageGroups',
        layoutTemplate: 'manageLayout'
    });
});
