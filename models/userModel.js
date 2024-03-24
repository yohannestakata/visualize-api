const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nickname: String,
  email: String,
  uniId: String,
  password: { type: String, select: false },
  department: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
