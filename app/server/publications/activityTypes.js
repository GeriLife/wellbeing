Meteor.publish('allActivityTypes', function () {
    return ActivityTypes.find();
});
