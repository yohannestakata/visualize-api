import { Schema, model } from "mongoose";

const classroomSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  sections: {
    type: [Schema.Types.ObjectId],
    ref: "Sections",
  },
  teacher: {
    type: [Schema.Types.ObjectId],
    ref: "Teachers",
  },
  models: {
    type: [Schema.Types.ObjectId],
    ref: "Models",
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
