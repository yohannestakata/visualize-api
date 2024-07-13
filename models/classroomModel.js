import { Schema, model } from "mongoose";

const classroomSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: [Schema.Types.ObjectId],
    ref: "Departments",
  },
  sections: {
    type: [Schema.Types.ObjectId],
    ref: "Sections",
  },
  teacher: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  models: {
    type: [Schema.Types.ObjectId],
    ref: "Model",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
  },
  exam: {
    type: Schema.Types.ObjectId,
    ref: "Exams",
  },
});

const Classrooms = model("Classrooms", classroomSchema);

export default Classrooms;
