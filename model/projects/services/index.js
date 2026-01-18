const Project = require("../projectModel");

module.exports.createProject = async (props = {}) => {
  const { projectName, description, team, status } = props;

  try {
    const existingProject = await Project.findOne({ projectName });

    if (existingProject) {
      throw new Error("Project with this name already exists");
    }

    const createProject = await Project.create({
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

module.exports.getProjects = async () => {
  try {
    const projects = await Project.find();

    if (!projects || projects.length === 0) {
      throw new Error("No projects data found");
    }

    return {
      message: "Projetcs data fetched",
      data: projects,
    };
  } catch (err) {
    throw err;
  }
};
