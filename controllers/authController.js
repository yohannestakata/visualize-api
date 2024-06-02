import { genSalt, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import bcrypt from "bcryptjs";

function signToken(id) {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
}

function createSendToken(user, statusCode, req, res) {
  const token = signToken(user.id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
    path: "/",
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    domain: "onrender.com",
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
}

export const signup = catchAsync(async (req, res, next) => {
  const { nickname, email, password, uniId, department, role } = req.body;

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

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

export const login = catchAsync(async (req, res, next) => {
  const { uniId, password } = req.body;

  if (!uniId || !password)
    next(new AppError("Please provide your University ID and password"));

  const user = await User.findOne({ uniId: uniId }).select("+password");

  if (!user)
    next(
      new AppError(
        "No user by that University ID found. Please sign-up if you don't have an account.",
        404
      )
    );

  const hashedPassword = user.password;
  const validPass = await bcrypt.compare(password, hashedPassword);

  if (validPass) createSendToken(user, 201, req, res);
  else next(new AppError("Incorrect password", 401));
});

export const getSignedUser = catchAsync(async (req, res, next) => {
  if (!req.cookies.jwt)
    return res.status(200).json({
      status: "success",
      message: "No token available. Please sign-up or login",
    });

  const { id } = verify(req.cookies.jwt, process.env.JWT_SECRET);

  const user = await User.findById(id);

  if (!user) next(new AppError("No user found", 404));

  res.status(200).json({ status: "success", user });
});
