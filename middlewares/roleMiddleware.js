const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const userRole = Number(req.user.role);

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission",
      });
    }

    next();
  };
};

module.exports = authorize;
