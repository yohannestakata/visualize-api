import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// import session from "express-session";

// Utils and controllers
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/AppError";
import userParser from "./utils/userParser";

// Routes
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import modelRouter from "./routes/modelsRoutes";
import departmentRouter from "./routes/departmentRoutes";
import courseRouter from "./routes/courseRoutes";
import batchRouter from "./routes/batchRoutes";
import sectionRouter from "./routes/sectionRoutes";
import semesterRouter from "./routes/semesterRoutes";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development")
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

if (process.env.NODE_ENV === "production")
  app.use(
    cors({
      origin: "https://visualize-qakf.onrender.com",
      credentials: true,
      exposedHeaders: ["set-cookie"],
    })
  );

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(userParser());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/models", modelRouter);
app.use("/departments", departmentRouter);
app.use("/courses", courseRouter);
app.use("/batches", batchRouter);
app.use("/sections", sectionRouter);
app.use("/semesters", semesterRouter);

app.all("*", (req, res, next) => {
  next(next(new AppError(`Can't find ${req.originalUrl} on this server`), 404));
});

app.use(globalErrorHandler);

export default app;
