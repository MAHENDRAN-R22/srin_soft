const jwt = require("jsonwebtoken");
require("dotenv").config();

// authentication for json token
const authenticateJWT = (req,res,next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next({ name: "ForbiddenError" });
      }
      req.user = user;
      next();
    });
  } else {
     next({ name: "INVALID_CREDENTIALS" });
  }
};

module.exports = authenticateJWT;
