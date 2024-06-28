import Courses from "../models/coursesModel";
import catchAsync from "../utils/catchAsync";

export const getAllCourses = catchAsync(async (req, res) => {
  const courses = await Courses.find();
  res.status(200).json({ status: "success", data: courses });
});

export const addCourse = catchAsync(async (req, res) => {
  const course = await Courses.create(req.body);
  res.status(200).json({ status: "success", data: course });
});
