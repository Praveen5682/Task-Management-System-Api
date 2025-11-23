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
