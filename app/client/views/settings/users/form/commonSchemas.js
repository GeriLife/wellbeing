import SimpleSchema from 'simpl-schema';
export const deactivateOnSchema = {
  type: Date,
  optional: true,
  min: function() {
    const date = new Date();
    const utcDate = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0
    );

    return new Date(utcDate);
  },
  max: new Date('2050'),
};

export const emailSchema = {
  type: String,
  optional: false,
  regEx: SimpleSchema.RegEx.EmailWithTLD,
};

export const isAdminSchema = {
  type: Boolean,
  defaultValue: false,
  label: 'System administrator',
};
