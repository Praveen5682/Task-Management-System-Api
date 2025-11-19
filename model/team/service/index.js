const team = require("../authModel");

module.exports.createTeam = async (props = {}) => {
  const { teamname, description, leader, members } = props;

  try {
    if (!teamname || !description || !leader || !members) {
      return {
        error: "Fields are required",
      };
    }

    const existingTeam = await team.findOne({ teamname });

    if (existingTeam) {
      return {
        error: "Team already existed",
      };
    }

    const teamData = await team.create({
      teamname,
      description,
      leader,
      members,
    });

    return {
      success: true,
      message: "Team Created SuccessFully",
      data: teamData,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

module.exports.getTeams = async () => {
  try {
    const teamsData = await team.find();

    if (teamsData.length === 0) {
      return { error: "No teams available" };
    }

    return {
      message: "Data fetched successfully",
      data: teamsData,
    };
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

module.exports.getTeamById = async (props) => {
  const teamId = props;
  try {
    if (!teamId) {
      return {
        error: "Team Id Is Required",
      };
    }

    const teamFromDb = await team.findById(teamId);

    if (!teamFromDb) {
      return { error: `No data is available for : ${teamId}` };
    }

    return {
      message: `Data fetched successFully for : ${teamId}`,
      data: teamFromDb,
    };
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

module.exports.updateTeam = async (props) => {
  const { teamId, teamname, description, leader, members } = props;

  try {
    if (!teamId || !teamname || !leader) {
      return {
        error: "teamId, teamname, and leader are required",
      };
    }

    const updateData = {
      teamname,
      leader,
    };

    if (description) updateData.description = description;
    if (members) updateData.members = members;

    const updateTeamData = await team.findByIdAndUpdate(teamId, updateData, {
      new: true,
    });

    if (!updateTeamData) {
      return { error: `No team found for ID: ${teamId}` };
    }

    return {
      message: "Team updated successfully",
      data: updateTeamData,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

module.exports.deleteTeam = async (props = {}) => {
  const teamId = props;

  try {
    if (!teamId) {
      return {
        error: "Team id is required ",
      };
    }

    const deleteTeamData = await team.findByIdAndDelete(teamId);

    if (!deleteTeamData) {
      return { error: "Data not found for delete" };
    }

    return {
      message: "Deleted SuccessFully",
      data: deleteTeamData,
    };
  } catch (error) {
    return {
      message: error.message,
    };
  }
};
