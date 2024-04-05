const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nickname: String,
  email: String,
  department: String,
  role: String,
  uniId: {
    type: String,
    unique: true,
  },
  password: { type: String, select: false },
});

const User = mongoose.model("User", userSchema);

export default User;
