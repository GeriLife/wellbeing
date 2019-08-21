import SimpleSchema from 'simpl-schema';
import {
  deactivateOnSchema,
  emailSchema,
  isAdminSchema,
} from './commonSchemas';

export const NewUserSchema = new SimpleSchema({
  email: emailSchema,
  password: {
    type: String,
    min: 5,
  },
  isAdmin: isAdminSchema,

  deactivateOn: deactivateOnSchema,
});
