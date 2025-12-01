const task = require("../taskModel");

module.exports.createTask = async (props = {}) => {
  const {
    title,
    description,
    status,
    priority,
    assignedTo,
    teamId,
    createdBy,
    dueDate,
  } = props;

  try {
    const checkExistingTask = await task.findOne({ title, teamId });

    if (checkExistingTask) {
      return { error: "Task already exists with this title in the team" };
    }

    const newTask = await task.create({
      title,
      description,
      status,
      priority,
      assignedTo,
      teamId,
      createdBy,
      dueDate,
    });

    return {
      message: "Task created Successfully",
      data: newTask,
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.getAllTasks = async (user) => {
  try {
    let tasksData;

    if (user.role === 1) {
      tasksData = await task.find();
    }
    // if (user.role === 2) {
    //   tasksData = await task.find();
    // }
    else {
      tasksData = await task.find();
    }

    if (tasksData.length === 0) {
      return {
        error: "There is no task data ",
      };
    }

    return {
      message: "Task fetched successfully",
      data: tasksData,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

module.exports.updateTask = async (props = {}, taskId) => {
  const {
    title,
    description,
    status,
    priority,
    assignedTo,
    teamId,
    createdBy,
    dueDate,
  } = props;

  try {
    const existingTask = await task.findById(taskId);

    if (!existingTask) {
      return {
        error: "Task not found",
      };
    }

    const updateData = {
      title,
      description,
      status,
      priority,
      assignedTo,
      teamId,
      createdBy,
      dueDate,
    };

    const updated = await task.findByIdAndUpdate(taskId, updateData, {
      new: true,
      runValidators: true,
    });

    return {
      message: "Task updated successFully",
      data: updated,
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports.deleteTask = async (taskId) => {
  try {
    const checkTask = await task.findById(taskId);

    if (!checkTask) {
      return {
        error: "No task found for this Task Id",
      };
    }

    const deleted = await task.findByIdAndDelete(taskId);

    return {
      message: "Task deleted successfully",
      data: deleted,
    };
  } catch (error) {
    return { error: error.message };
  }
};
