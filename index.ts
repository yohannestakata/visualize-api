import app from "./app";
import mongoose from "mongoose";

app.listen(process.env.PORT, () => {
  console.log(`Listening on port 3000 ${process.env.PORT}`);
});

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connected");
});
