Residents = new Mongo.Collection('residents');

var ResidentsSchema = new SimpleSchema({
  firstName:{
    type:String,
    label: 'Name',
    optional: true,
  },
  homeId:{
    type:String,
    label: 'Home',
  },
  createdAt: {
    type: Date,
    label: "Created Date",
    autoValue: function() {
      if (this.isInsert)
        return new Date;
    },
    denyUpdate: true
  },
  updatedAt: {
    type: Date,
    label: "Updated Date",
    autoValue: function() {
      return new Date();
    },
    optional: true
  },
  createdUserId: {
    type: String,
    label: "Created by",
    autoValue: function() {
      if (this.isInsert && !this.value)
        return this.userId;
    },
    denyUpdate: true,
    optional: true
  },
  updatedUserId: {
    type: String,
    label: "Updated by",
    autoValue: function() {
      if (!this.value)
        return this.userId;
    },
    optional: true
  }
});

Residents.attachSchema(ResidentsSchema);
