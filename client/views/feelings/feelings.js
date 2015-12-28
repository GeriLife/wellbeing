Template.feelings.events({
  "click #joy": function () {
    // Set selected feeling session variable
    Session.set("selectedFeeling", "joy");
  },
  "click #fear": function () {
    // Set selected feeling session variable
    Session.set("selectedFeeling", "fear");
  },
  "click #sad": function () {
    // Set selected feeling session variable
    Session.set("selectedFeeling", "sad");
  },
  "click #anger": function () {
    // Set selected feeling session variable
    Session.set("selectedFeeling", "anger");
  },
  "click .feelings": function () {
    // Show feelings modal
    Modal.show('newFeeling');
  }
});
