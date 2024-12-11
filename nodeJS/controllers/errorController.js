const AppError = require("../utils/appError");

module.exports = (err, req, res, next) => {
  // it will catch you have decare err in function parameters

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err, name: err.name };
  error.message = err.message;

  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === "ValidationError") error = handleValidationErrorDB(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: err.stack,
  });
};

const handleCastErrorDB = (err) => {
  new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate fileds ${Object.keys(err.keyValue)[0]}!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((item) => item.message);

  return new AppError(`Invalid input data. ${errors.join(". ")}`, 400);
};

const handleJWTError = () => new AppError("Invalid JWT token!", 401);

const handleJWTExpiredError = () => {
  return new AppError("Your token has been expired. Please login again!", 401);
};
