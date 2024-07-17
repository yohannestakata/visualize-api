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
  exam: [
    {
      question: String,
      options: {
        type: [String],
        min: [4, "4 options are mandatory for a question"],
        max: [4, "Question can't have more than 4 options"],
      },
      correctOption: Number,
    },
  ],
});

const Classrooms = model("Classrooms", classroomSchema);

export default Classrooms;
