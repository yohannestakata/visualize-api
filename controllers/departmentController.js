import Departments from "../models/departmentsModel";
import catchAsync from "../utils/catchAsync";

export const createDepartment = catchAsync(async (req, res) => {
  const newDepartment = await Departments.create(req.body);
  console.log(newDepartment);
});
