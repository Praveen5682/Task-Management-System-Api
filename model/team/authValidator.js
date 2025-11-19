const Joi = require("joi");

const teamValidation = Joi.object({
  teamname: Joi.string().required().messages({
    "string.base": "Team name must be string",
    "string.empty": "Team name cannot be empty",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Description must be a string",
  }),
  leader: Joi.string().required().messages({
    "string.base": "Leader must be a string (ObjectId)",
    "string.empty": "Leader cannot be empty",
  }),

  members: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Members must be an array",
    "string.base": "Each member id must be a string (ObjectId)",
  }),
});

const getTeamByIdValidation = Joi.object({
  teamId: Joi.number().required().messages({
    "number.base": "TeamId must be a number",
    "number.empty": "TeamId cannot be empty",
  }),
});

module.exports = teamValidation;
