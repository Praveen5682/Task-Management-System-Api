const project = require("../projectModel");

module.exports.createProject = async (props = {}) => {
  const { projectName, description, team, status } = props;

  try {
    const existingProject = await project.findOne({ projectName });

    if (existingProject) {
      throw new Error("Project with this name already exists");
    }

    const createProject = await project.create({
      projectName,
      description,
      team,
      status,
    });

    return {
      message: "Project created successfully",
      data: createProject,
    };
  } catch (err) {
    throw err;
  }
};
