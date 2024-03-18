const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");

// Routers
const authRouter = require("./routes/authRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/auth", authRouter);

app.all("*", (req, res, next) => {
  next(next(new AppError(`Can't find ${req.originalUrl} on this server`), 404));
});

app.use(globalErrorHandler);

module.exports = app;
