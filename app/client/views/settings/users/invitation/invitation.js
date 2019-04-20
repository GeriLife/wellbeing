Template.invitation.created = function() {
  const templateInstance = this;
  templateInstance.invitationId = Router.current().params.invitationId;
  templateInstance.showSuccessAlert = new ReactiveVar(false);
  templateInstance.errorMessage = new ReactiveVar(null);
  Meteor.call("ValidateAndRedeem",templateInstance.invitationId, function(err,data) {
      
    if ("error" in data) {
      templateInstance.errorMessage.set(data.error.message);
    } else {
      templateInstance.showSuccessAlert.set(true);

      /* Setting timeout(4000milliseconds) here so that the user has time to read the alert */
      setTimeout(function() {
        Router.go("front");
      }, 4000);
    }
  });
};

Template.invitation.helpers({
    errorMessage(){
        return Template.instance().errorMessage.get()
    },
    showSuccessAlert(){
        return Template.instance().showSuccessAlert.get()
    }
})