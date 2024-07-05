import { Schema, model } from "mongoose";

const coursesSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  creditHour: {
    type: Number,
    min: [1, "Credits can't be less than 1"],
    max: [5, "Credits can't be more than 5"],
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

const Courses = model("Courses", coursesSchema);

export default Courses;
