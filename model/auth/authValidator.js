const Joi = require("joi");

const registerationValidation = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be atleast 3 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid Email Format",
    "string.empty": "Email cannot be Empty",
  }),
  password: Joi.string().trim().min(6).max(20).required().messages({
    "string.base": "Password must be string",
    "string.empty": "Password cannot be empty",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "string.empty": "Confirm Password cannot be empty",
  }),
  role: Joi.number().valid(1, 2, 3).default(3).messages({
    "any.only": "Role must be 1 (admin), 2 (team-leader), or 3 (user)",
  }),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email is not valid",
    "string.empty": "Email cannot be empty",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be in string",
    "string.empty": "Password cannot be empty",
  }),
  // role: Joi.number().required().valid(1, 2, 3).default(3).messages({
  //   "any.only": "Role must be 1 (admin), 2 (team-leader), or 3 (user)",
  //   "any.required": "Role is required",
  // }),
});

module.exports = { registerationValidation, loginValidation };
