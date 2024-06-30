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
  const updatedDepartment = await Departments.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (!updatedDepartment)
    throw new AppError(`No department with id: ${req.params.id} found`, 401);

  res.status(200).json({ status: "success", data: updatedDepartment });
});
