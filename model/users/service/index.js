const User = require("../../auth/authModel");

module.exports.getUsers = async (props = {}) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      throw new Error("No users found");
    }

    return users;
  } catch (error) {
    throw error;
  }
};
