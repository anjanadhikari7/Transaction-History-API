import userSchema from "../schema/userSchema.js";
// Create a user
export const createUser = (userObj) => {
  return userSchema(userObj).save();
};

// Find user by email

export const findUserByEmail = (email) => {
  return userSchema.findOne({ email });
};
