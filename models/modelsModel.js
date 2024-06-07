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
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  drafted: {
    type: Boolean,
    default: true,
  },
  definitions: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        definition: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

const Model = model("Model", modelSchema);

export default Model;
