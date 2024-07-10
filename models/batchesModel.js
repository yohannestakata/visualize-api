import { Schema, model } from "mongoose";

const batchSchema = Schema({
  year: {
    type: Number,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Departments",
  },
  sections: {
    type: [Schema.Types.ObjectId],
    ref: "Sections",
  },
  courses: {
    type: [Schema.Types.ObjectId],
    ref: "Courses",
  },
});

const Batches = model("Batches", batchSchema);

export default Batches;
