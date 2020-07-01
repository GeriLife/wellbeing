Template.singleValueCharts.onCreated(function () {
  const templateInstance = this;
});

Template.singleValueCharts.helpers({
  title() {
    return TAPi18n.__(Template.currentData().title);
  },

  info() {
    return TAPi18n.__(Template.currentData().info);
  },

  statsList() {
    return Template.currentData().statsList;
  },

  number() {
    return Template.currentData().statsList
      ? Template.currentData().statsList.length
      : 0;
  },
});
