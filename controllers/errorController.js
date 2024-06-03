import AppError from "../utils/AppError";

function sendError(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
}

function handleDbDuplicateField(err) {
  const duplicateField = [
    .../'(.*?)'/.exec(err.message.split(" ").at(-1)),
  ][1].split(".")[1];

  return new AppError(
    `Duplicate entry on field: ${duplicateField}. Please use a different value`,
    400
  );
}

const handleJwtError = () =>
  new AppError("Invalid token. Please login again", 401);

const handleJwtTokenExpiredError = () =>
  new AppError("Your login session has expired. Please login again", 401);

const handleDbDuplicateKey = (error) => {
  console.log("Duplicate key err", error.message);
  return new AppError(error.message, 401);
};

const handleConnectionError = () =>
  new AppError(
    "Encountering server connection issues. Please try again later",
    500
  );

export default function (err, req, res, next) {
  console.error(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (err.code === "ER_DUP_ENTRY") err = handleDbDuplicateField(err);
  if (err.code === 11000) err = handleDbDuplicateKey(err);
  if (err.name === "JsonWebTokenError") err = handleJwtError();
  if (err.name === "TokenExpiredError") err = handleJwtTokenExpiredError();
  if (err.code === "ECONNREFUSED") err = handleConnectionError();

  sendError(err, res);
}
