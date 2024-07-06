import { Schema, model } from "mongoose";

const sectionsSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  students: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  representative: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Section = model("Sections", sectionsSchema);

export default Section;
