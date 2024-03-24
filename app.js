const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Utils and controllers
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");

// Routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.all("*", (req, res, next) => {
  next(next(new AppError(`Can't find ${req.originalUrl} on this server`), 404));
});

app.use(globalErrorHandler);

module.exports = app;
