const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
    // secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const signup = catchAsync(async (req, res, next) => {
  const { nickname, email, password, uniId, department, role } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUserCred = {
    nickname,
    email,
    uniId,
    department,
    password: hashedPassword,
    role: role ? role : "Student",
  };

  const newUser = await User.create(tempUserCred);

  createSendToken(newUser, 201, req, res);
});

const login = catchAsync(async (req, res, next) => {
  const { uniId, password } = req.body;

  if (!uniId || password)
    next(
      new AppError("Please provide your University ID or email and password")
    );

  const user = await User.findById({ uniId });

  if (!user)
    next(
      new AppError(
        "No user by that University ID found. Please sign-up if you don't have an account.",
        404
      )
    );

  console.log(user);
});

const getSignedUser = catchAsync(async (req, res, next) => {
  if (!req.cookies.jwt)
    return res.status(200).json({
      status: "success",
      message: "No token available. Please sign-up or login",
    });

  const { id } = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  const user = await User.findById(id);

  if (!user) next(new AppError("No user found", 404));

  res.status(200).json({ status: "success", user });
});

module.exports = { signup, login, getSignedUser };
