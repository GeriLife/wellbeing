import SimpleSchema from 'simpl-schema';
import { deactivateOnSchema } from '../commonSchemas';

EditUserSchema = new SimpleSchema({
  email: {
    type: String,
    optional: false,
    regEx: SimpleSchema.RegEx.EmailWithTLD,
  },
  isAdmin: {
    type: Boolean,
    defaultValue: false,
  },
  deactivateOn: deactivateOnSchema,
});
