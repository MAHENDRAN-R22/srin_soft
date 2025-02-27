// to handle unknown error in middleware
const errorHandler = (err, req, res, next) => {

    let statusCode = 500;
    let message = "Internal Server Error";
    
    if (err.name === "INVALID_CREDENTIALS") {
      statusCode = 401;
      message = "Invalid credentials";
    } else if (err.name === "ForbiddenError") {
      statusCode = 403;
      message = "Forbidden Access denied";
    }
  
    res.status(statusCode).json({ error: message });
  };
  
  module.exports = errorHandler;
  