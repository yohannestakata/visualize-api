import { Schema, model } from "mongoose";

const departmentsSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Courses",
    },
  ],
  description: {
    type: String,
    min: [150, "Department description needs to have at least 150 characters"],
  },
  maxSections: {
    type: Number,
    max: [10, "Department can't have more than 10 sections"],
    default: 10,
  },
});

const Departments = model("Departments", departmentsSchema);

export default Departments;
