Homes = new Mongo.Collection('homes');

var HomesSchema = new SimpleSchema({
  name:{
    type:String,
    label: 'Home Name',
  }
});

Homes.attachSchema(HomesSchema);
