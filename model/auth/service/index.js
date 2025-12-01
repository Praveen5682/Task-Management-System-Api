const user = require("../authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.Registration = async (props = {}) => {
  const { name, email, password, confirmPassword, role } = props;

  console.log("props: ", name, email, password, confirmPassword, role);

  try {
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      throw new Error("User already registered");
    }

    if (password !== confirmPassword) {
      throw new Error("Password do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = await user.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return {
      message: "Registration Successful",
      data: newuser,
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.Login = async (props = {}) => {
  const { email, password, role } = props;

  try {
    if (!email || !password || !role) {
      return { error: "Fields are Required" };
    }

    const checkUser = await user.findOne({ email, role });

    if (!checkUser) {
      return { error: "User not found with this email and role" };
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);

    if (!isMatch) {
      return { error: "Invalid password" };
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      message: "Login SuccessFull",
      data: checkUser,
      token,
    };
  } catch (err) {
    return { error: err.message };
  }
};
