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
  department: {
    type: Schema.Types.ObjectId,
    ref: "Departments",
  },
  open: {
    type: Boolean,
    default: true,
  },
});

semesterSchema.pre("save", async function (next) {
  const newSemester = this;
  if (newSemester.isNew) {
    const existingSemesters = await Semesters.find({
      // year: newSemester.year,
      // half: newSemester.half,
      department: newSemester.department,
    });
    await Promise.all(
      existingSemesters.map((semester) => semester.updateOne({ open: false }))
    );
  }
  next();
});

const Semesters = model("Semesters", semesterSchema);

export default Semesters;
