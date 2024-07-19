import Courses from "../models/coursesModel";
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
  const users = await User.find(req.query).populate("sections department");
  res.status(200).json({ status: "success", data: users });
});

export const updateUser = catchAsync(async (req, res) => {
  const { sections, ...otherUpdates } = req.body;

  let updatedUser;

  if (sections)
    updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { sections: sections }, ...otherUpdates },
      { new: true }
    );
  else
    updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

  res.status(200).json({ status: "success", data: updatedUser });
});

export const registerUser = catchAsync(async (req, res) => {
  const { sections, courses } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { sections: sections } },
    { new: true }
  );

  const updatePromises = courses.map(async (courseId) => {
    return await Courses.findByIdAndUpdate(courseId, {
      $addToSet: { students: updatedUser ? updatedUser._id : req.params.id },
    });
  });

  await Promise.all(updatePromises);

  res.status(200).json({ status: "success" });
});

export const updateScore = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id).populate("scores");
  const { newScore } = req.body;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existingScore = user.scores.find((score) => {
    const scoreDate = new Date(score.date);
    scoreDate.setHours(0, 0, 0, 0);
    return scoreDate.getTime() === today.getTime();
  });

  if (existingScore) {
    existingScore.score += Number(newScore);
  } else {
    user.scores.push({ score: newScore, date: new Date() });
  }

  await user.save();

  res.status(200).json({ message: "Score updated" });
});

export const updateStreak = catchAsync(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  const yesterday = new Date();
  yesterday.setHours(0, 0, 0, 0);
  yesterday.setDate(new Date().getDate() - 1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastStreakDate = new Date(user.lastStreakDate) || new Date(0);
  lastStreakDate.setHours(0, 0, 0, 0);

  if (lastStreakDate.getTime() === yesterday.getTime()) {
    user.streak++;
  } else if (lastStreakDate.getTime() === today.getTime()) {
    user.streak = user.streak;
  } else {
    user.streak = 1;
  }

  user.lastStreakDate = today;
  await user.save();

  res.status(200).json({ streak: user.streak });
});

export const assignRep = catchAsync(async (req, res) => {
  const { sectId, uniId } = req.body;

  const user = await User.findOne({ uniId });

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      representing: sectId,
    },
    { new: true }
  );

  res.status(200).json({ status: "success", data: updatedUser });
});

export const removeFromSection = catchAsync(async (req, res) => {
  const { section } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $pull: { sections: section } },
    { new: true }
  );
  res.status(200).json({ status: "success", data: user });
});
