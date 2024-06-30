import { Schema, model } from "mongoose";

const userSchema = Schema({
  nickname: String,
  email: String,
  department: { type: Schema.Types.ObjectId, ref: "Departments" },
  role: String,
  uniId: {
    type: String,
    unique: true,
  },
  password: { type: String, select: false },
});

const User = model("User", userSchema);

export default User;
