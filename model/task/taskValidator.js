const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);

const createTaskValidator = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title should be a String",
    "string.empty": "Title cannot be empty",
  }),

  description: Joi.string().required().messages({
    "string.base": "description should be a String",
    "string.empty": "description cannot be empty",
  }),
  status: Joi.string()
    .valid("todo", "in-progress", "completed")
    .default("todo")
    .messages({
      "any.only": "Invalid status value",
    }),
  priority: Joi.string()
    .valid("low", "medium", "high")
    .default("medium")
    .messages({
      "any.only": "Invalid priority value",
    }),
  assignedTo: JoiObjectId().required().messages({
    "any.required": "assignedTo (User ID) is required",
    "string.pattern.name": "Invalid User ID format",
  }),

  teamId: JoiObjectId().required().messages({
    "any.required": "teamId is required",
    "string.pattern.name": "Invalid Team ID format",
  }),

  createdBy: JoiObjectId().required().messages({
    "any.required": "createdBy (User ID) is required",
    "string.pattern.name": "Invalid User ID format",
  }),

  dueDate: Joi.date().required().messages({
    "date.base": "dueDate must be a valid date",
    "any.required": "dueDate is required",
  }),
});

module.exports = createTaskValidator;
