import mongoose, { Schema, model } from "mongoose";

const modelSchema = Schema({
  modelTitle: {
    type: String,
    required: true,
  },
  modelUrl: String,
  thumbnailUrl: String,
  department: String,
  course: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const Model = model("Model", modelSchema);

export default Model;
