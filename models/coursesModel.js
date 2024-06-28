import { Schema, model } from "mongoose";

const coursesSchema = Schema({
  name: { type: String, unique: true },
  credits: {
    type: Number,
    min: [1, "Credits can't be less than 1"],
    max: [5, "Credits can't be more than 5"],
  },
});

const Courses = model("Courses", coursesSchema);

export default Courses;
