import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

SimpleSchema.messages({
    "passwordMismatch": "Passwords do not match"
});

export const UserProfile = new SimpleSchema({
    name: {
        type: String,
    },
});

export const UserProfileFriends = new SimpleSchema({
    user_id: {
        type: String
    },
    createdAt: {
        type: Date
    },
    acceptRequest: {
        type: Date,
        optional: true
    },
    isSenderRequest: {
        type: Boolean,
        optional: true
    },
    isAccepted: {
        type: Boolean,
        optional: true
    }
});

export const UserSchema  = new SimpleSchema({
    // username: {
    //     type: String,
    // },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object,
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    "emails.$.verified": {
        type: Boolean,
        optional: true
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: UserProfile,
        optional: true
    },
    "profile.friends.$": {
        type: UserProfileFriends,
        optional: true
    },
    services: {
        type: Object,
        blackbox: true
    },
    // roles: {
    //     type: Object,
    //     optional: true,
    //     blackbox: true
    // },
    // roles: {
    //     type: Array,
    //     optional: true
    // },
    // 'roles.$': {
    //     type: String
    // }
});

Meteor.users.attachSchema(UserSchema);