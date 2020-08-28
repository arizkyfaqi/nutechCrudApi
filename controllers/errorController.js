const AppError = require("../utils/appError");

const sendError = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplikat nama barang: ${value}. Gunakan nama lain!`;

  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.satus = err.status || "error";

  let error = { ...err };
  error.message = err.message;

  if (error.code === 11000) error = handleDuplicateFieldsDB(error);

  sendError(error, req, res);
};
