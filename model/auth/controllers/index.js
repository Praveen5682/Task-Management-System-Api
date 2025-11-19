const {
  registerationValidation,
  loginValidation,
} = require("../authValidator");
const service = require("../service/index");

module.exports.Registration = async (req, res) => {
  console.log("REQ BODY:", req.body);
  try {
    const { error, value } = registerationValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }

    const response = await service.Registration(value);
    if (response.error) {
      return res.status(400).json({
        status: false,
        message: response.error,
      });
    }
    return res.status(201).json({
      status: true,
      data: response.data || [],
      message: response.message,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { error, value } = loginValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const response = await service.Login(value);

    console.log("reponse", response);

    if (response.error) {
      return res.status(400).json({
        success: false,
        message: response.error,
      });
    }

    return res.status(200).json({
      success: true,
      data: response,
      message: "Login Succesfull",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
