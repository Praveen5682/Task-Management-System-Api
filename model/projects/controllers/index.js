const projectJoiValidation = require("../projectValidator");
const service = require("../services/index");

module.exports.createProject = async (req, res) => {
  try {
    const { error, value } = projectJoiValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const response = await service.createProject(value);

    return res.status(201).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
