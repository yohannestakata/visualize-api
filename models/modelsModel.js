import { Schema, model } from "mongoose";

const modelSchema = Schema({
  modelTitle: {
    type: String,
    required: true,
  },
  modelUrl: String,
  thumbnailUrl: String,
  department: { type: Schema.Types.ObjectId, ref: "Departments" },
  course: { type: Schema.Types.ObjectId, ref: "Courses" },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
