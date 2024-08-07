import { Schema, model } from "mongoose";

const userSchema = Schema({
  nickname: String,
  email: String,
  department: { type: [Schema.Types.ObjectId], ref: "Departments" },
  role: String,
  uniId: {
    type: String,
    unique: true,
  },
  password: { type: String, select: false },
  sections: { type: [Schema.Types.ObjectId], ref: "Sections" },
  streak: { type: Number, default: 0 },
  lastStreakDate: Date,
  scores: [
    {
      score: Number,
      date: {
        type: Date,
      },
    },
  ],
  representing: {
    type: Schema.Types.ObjectId,
    ref: "Sections",
  },
});

const User = model("User", userSchema);

export default User;
