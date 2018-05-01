import SimpleSchema from 'simpl-schema';

export default HomesSchema = new SimpleSchema({
  name:{
    type:String
  },
  groupId: {
    type: String,
  }
});
