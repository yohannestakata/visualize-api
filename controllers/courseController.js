import Courses from "../models/coursesModel";
import catchAsync from "../utils/catchAsync";

export const getAllCourses = catchAsync(async (req, res) => {
  const user = req.user;
  console.log("User department: ", user);
  console.log(req.user);

  const courses = await Courses.find({ departments: user.department });
  res.status(200).json({ status: "success", data: courses });
});

export const addCourse = catchAsync(async (req, res) => {
  const course = await Courses.create(req.body);
  res.status(200).json({ status: "success", data: course });
});

export const updateCourse = catchAsync(async (req, res) => {
  const updatedCourse = await Courses.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ status: 200, data: updatedCourse });
});
