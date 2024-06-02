// import app from "../app";
import mongoose from "mongoose";
import express from "express";
const app = express();

app.get("/", (res, res) => res.send("Express on vercel"));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connected");
});
export default app;
