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
