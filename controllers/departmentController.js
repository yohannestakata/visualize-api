import Courses from "../models/coursesModel";
import Departments from "../models/departmentsModel";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";

export const createDepartment = catchAsync(async (req, res) => {
  const newDepartment = await Departments.create(req.body);
  res.status(200).json({ status: "success", data: newDepartment });
});

export const getAllDepartments = catchAsync(async (req, res) => {
  const departments = await Departments.find().populate("courses");
  res.status(200).json({ status: "success", data: departments });
});

export const updateDepartment = catchAsync(async (req, res) => {
  const courses = req.body.courses.map((course) => {
    const newObj = { ...course };
    delete newObj._id;
    return newObj;
  });
  console.log(courses);
  const addedCourses = await Courses.create(courses);
  const courseIds = addedCourses.map((course) => course._id);

  const updatedDepartment = await Departments.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body, courses: courseIds },
    { new: true }
  );
  console.log(updatedDepartment, req.params.id);

  res.status(200).json({ status: "success", data: updatedDepartment });
});
