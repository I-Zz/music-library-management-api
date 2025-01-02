const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (err) {
    // res.status(401).json({ message: "Invalid token." });
    res.status(401).json({
      status: 401,
      data: null,
      message: "Unauthorized Access",
      error: null,
    });
  }
};

exports.authorize = (roles) => (req, res, next) => {
  // if (!roles.includes(req.user.role)) {
  //     return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
  // }
  if (!roles.includes(req.user.role)) {
    // return res.status(401).json({
    //   status: 401,
    //   data: null,
    //   message: "Unauthorized Access",
    //   error: null,
    // });
    return res.status(403).json({
      status: 403,
      data: null,
      message: "Forbidden Access.",
      error: null,
    });
  }
  next();
};
