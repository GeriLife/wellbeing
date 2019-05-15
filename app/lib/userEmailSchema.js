import SimpleSchema from 'simpl-schema';

module.exports = new SimpleSchema({
    emails: {
        optional: false,
        type: Object
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        optional: true,
        type: String,
        regEx: SimpleSchema.RegEx.EmailWithTLD
    },
    "emails.$.verified": {
        optional: true,
        type: Boolean
    }
});
