import { Schema, model } from "mongoose";

const semesterSchema = Schema({
  year: String,
  half: {
    type: Number,
    min: [1, "Semester half can't be less than 0"],
    max: [3, "Semsester half can't be more than 3"],
  },
  batches: {
    type: [Schema.Types.ObjectId],
    ref: "Batches",
  },
});

const Semesters = model("Semesters", semesterSchema);

export default Semesters;
