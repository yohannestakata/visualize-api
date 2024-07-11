import User from "../models/userModel";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { genSalt, hash } from "bcryptjs";

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("department");
  if (!user) return next(new AppError("No user found", 404));
  return res.status(200).json({ status: "success", user });
});

export const createUser = catchAsync(async (req, res) => {
  const salt = await genSalt(10);
  const password = await hash(req.body.password, salt);

  const user = await User.create({ ...req.body, password });
  res.status(200).json({ status: "success", data: user });
});

export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find().populate("sections");
  res.status(200).json({ status: "success", data: users });
});

export const updateUser = catchAsync(async (req, res) => {
  const { sections, ...otherUpdates } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { sections: sections }, ...otherUpdates },
    { new: true }
  );

  res.status(200).json({ status: "success", data: updatedUser });
});
