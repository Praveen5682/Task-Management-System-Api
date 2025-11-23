const service = require("../service/index");
const createTaskValidator = require("../taskValidator");

module.exports.createTask = async (req, res) => {
  try {
    const { error, value } = createTaskValidator.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message).join(", "),
      });
    }

    const response = await service.createTask(value);

    if (response.error) {
      return res.status(400).json({
        success: false,
        message: response.error,
      });
    }

    return res.status(201).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
