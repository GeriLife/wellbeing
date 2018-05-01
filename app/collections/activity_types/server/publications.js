import ActivityTypes from '../';

Meteor.publish('allActivityTypes', function () {
    return ActivityTypes.find();
});
