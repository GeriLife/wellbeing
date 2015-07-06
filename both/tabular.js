TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Residents = new Tabular.Table({
  name: "Residents",
  collection: Residents,
  columns: [
    {data: "fullName()", title: "Full Name"}
  ]
});
