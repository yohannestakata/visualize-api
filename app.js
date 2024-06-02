import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Utils and controllers
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/AppError";
import userParser from "./utils/userParser";

// Routes
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import modelRouter from "./routes/modelsRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(userParser());
if (process.env.NODE_ENV === "development")
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
else
  app.use(
    cors({
      origin: "https://visualize-tau.vercel.app/",
      credentials: true,
    })
  );
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/models", modelRouter);

app.all("*", (req, res, next) => {
  next(next(new AppError(`Can't find ${req.originalUrl} on this server`), 404));
});

app.use(globalErrorHandler);

export default app;
