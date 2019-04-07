Template.front.events({
  'click #add-activity' () {
    // Show the add activity modal
    Modal.show('activityFormModal');
  },
  'click #add-feeling' () {
    // Show the feeling modal
    Modal.show('newFeeling');
  }
});


Template.front.helpers({
  props(){
    return { val:"Hello to Vue from blaze!"}
  }
})
