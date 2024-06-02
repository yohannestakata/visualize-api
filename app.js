import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

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
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      sameSite: "none",
      domain: "visualize-api.onrender.com",
      path: "/",
    },
  })
);

app.use(userParser());
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
    })
  );
// app.use(cors());
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/models", modelRouter);

app.all("*", (req, res, next) => {
  next(next(new AppError(`Can't find ${req.originalUrl} on this server`), 404));
});

app.use(globalErrorHandler);

export default app;
