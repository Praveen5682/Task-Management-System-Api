const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("authHeader:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token found.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded : ", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = authMiddleware;
