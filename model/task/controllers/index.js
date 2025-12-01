const service = require("../service/index");
const {
  createTaskValidator,
  updateTaskValidator,
} = require("../taskValidator");

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

module.exports.getAllTasks = async (req, res) => {
  console.log(req.user);
  try {
    const response = await service.getAllTasks(req.user);
    if (response.error) {
      return res.status(400).json({
        success: false,
        message: response.error,
      });
    }

    return res.status(200).json({
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

module.exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskid;

    console.log(taskId);

    const { error, value } = updateTaskValidator.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const response = await service.updateTask(value, taskId);

    if (response.error) {
      return res.status(400).json({
        success: false,
        message: response.error,
      });
    }

    return res.status(200).json({
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

module.exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskid;

  try {
    const response = await service.deleteTask(taskId);

    if (response.error) {
      return res.status(400).json({
        success: false,
        message: response.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
