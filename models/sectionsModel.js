import { Schema, model } from "mongoose";

const sectionsSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  representative: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Departments",
  },
});

const Section = model("Sections", sectionsSchema);

export default Section;
