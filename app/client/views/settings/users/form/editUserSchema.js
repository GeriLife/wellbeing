import SimpleSchema from 'simpl-schema';
import {
  deactivateOnSchema,
  emailSchema,
  isAdminSchema,
} from './commonSchemas';

export const EditUserSchema = new SimpleSchema({
  email: emailSchema,
  isAdmin: isAdminSchema,
  deactivateOn: deactivateOnSchema,
});
