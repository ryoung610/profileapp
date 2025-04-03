import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true, // Email-based login
  },
  userAttributes: {
    preferredUsername: {
      required: true, // Username
    },
    profilePicture: {
      mutable: true, // Can update profile pic
      required: false, // Optional during signup
    },
  },
});