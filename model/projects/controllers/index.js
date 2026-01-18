const projectJoiValidation = require("../projectValidator");
const service = require("../services/index");

module.exports.createProject = async (req, res) => {
  try {
    const { error, value } = projectJoiValidation.validate(req.body);

    const response = await service.createProject(value);

    return res.status(201).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.getProjects = async (req, res) => {
  try {
    const response = await service.getProjects();

    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
