import SimpleSchema from 'simpl-schema';
import {
  deactivateOnSchema,
  emailSchema,
  isAdminSchema,
} from './commonSchemas';
SimpleSchema.extendOptions(['autoform']);

export const NewUserSchema = new SimpleSchema({
  email: emailSchema,
  password: {
    type: String,
    min: 5,
    autoform: {
      type: 'password',
    },
  },
  isAdmin: isAdminSchema,

  deactivateOn: deactivateOnSchema,
});
