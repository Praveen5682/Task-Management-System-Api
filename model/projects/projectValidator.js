const Joi = require("joi");

const projectJoiValidation = Joi.object({
  projectName: Joi.string().required().messages({
    "string.base": "Project name must be a string",
    "string.empty": "project name cannot be empty",
    "any.required": "Project name is required",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Description must be a string",
  }),
  team: Joi.array().items(Joi.string().hex().length(24)).optional().messages({
    "array.base": "Team must be an array of user IDs",
  }),
  status: Joi.string()
    .valid("pending", "in-progress", "completed")
    .default("pending")
    .messages({
      "any.only": "Status must be pending, in-progress, or completed",
    }),
});

module.exports = projectJoiValidation;
