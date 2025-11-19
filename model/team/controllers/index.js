const { teamValidation, getTeamByIdValidation } = require("../authValidator");
const service = require("../service/index");

module.exports.createTeam = async (req, res) => {
  try {
    const { error, value } = teamValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const response = await service.createTeam(value);

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
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.getTeams = async (req, res) => {
  try {
    const response = await service.getTeams();

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

module.exports.getTeamById = async (req, res) => {
  const teamId = req.params.teamId;

  console.log("teamId", teamId);

  try {
    const { error } = getTeamByIdValidation.validate({ teamId });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const response = await service.getTeamById(teamId);

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
