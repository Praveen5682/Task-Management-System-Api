const service = require("../service/index");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await service.getUsers();
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
