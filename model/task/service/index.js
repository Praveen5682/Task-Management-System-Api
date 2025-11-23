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
