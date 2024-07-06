import Semesters from "../models/semesterModel";
import catchAsync from "../utils/catchAsync";

export const createSemester = catchAsync(async (req, res) => {
  const newSemester = await Semesters.create(req.body);
  res.json({ status: "success", data: newSemester });
});
