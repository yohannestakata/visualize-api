import Departments from "../models/departmentsModel";
import catchAsync from "../utils/catchAsync";

export const createDepartment = catchAsync(async (req, res) => {
  const newDepartment = await Departments.create(req.body);
  res.status(200).json({ status: "success", data: newDepartment });
});

export const getAllDepartments = catchAsync(async (req, res) => {
  const departments = await Departments.find();
  res.status(200).json({ status: "success", data: departments });
});
