Template.homeAuthContainer.onCreated(function() {
  const templateInstance = this;
  const router = Router.current();
  const homeId = router.params.homeId;

  templateInstance.userIsAuthorized = new ReactiveVar("spinner");
  templateInstance.showSpinner = new ReactiveVar(true);

  Meteor.call("currentUserCanAccessHome", homeId, function(
    error,
    userAuthorization
  ) {
    templateInstance.showSpinner.set(false);
    templateInstance.userIsAuthorized.set(userAuthorization);
  });
});

Template.homeAuthContainer.helpers({
  userIsAuthorized() {
    const templateInstance = Template.instance();

    return templateInstance.userIsAuthorized.get();
  }
});
