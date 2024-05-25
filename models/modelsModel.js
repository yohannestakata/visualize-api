import { Schema, model } from "mongoose";

const modelSchema = Schema({
  name: {
    type: String,
  },
  url: String,
  thumbnailUrl: String,
  department: String,
  course: String,
});

const Model = model("Model", modelSchema);

export default Model;
