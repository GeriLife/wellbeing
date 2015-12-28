Template.feelings.events({
  "click #joy": function () {
    // Set selected feeling session variable
    Session.set("selectedFeeling", "joy");
    console.log("joy clicked");
  },
  "click #fear": function () {
    // Set selected feeling session variable
    Session.set("selectedFeeling", "fear");
    console.log("fear clicked");
  },
  "click #sad": function () {
    // Set selected feeling session variable
    Session.set("selectedFeeling", "sad");
    console.log("sad clicked");
  },
  "click #anger": function () {
    // Set selected feeling session variable
    Session.set("selectedFeeling", "anger");
    console.log("anger clicked");
  },
  "click .feelings": function () {
    // Show feelings modal
    console.log("feelings clicked");
    Modal.show('newFeeling');
  }
});
