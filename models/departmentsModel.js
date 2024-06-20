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
  maxSections: {
    type: Number,
    max: [10, "Department can't have more than 10 sections"],
  },
});

const Departments = model("Departments", departmentsSchema);

export default Departments;
