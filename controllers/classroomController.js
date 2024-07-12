import Classrooms from "../models/classroomModel";
import catchAsync from "../utils/catchAsync";

export const createClassroom = catchAsync(async (req, res) => {
  const newClassroom = await Classrooms.create(req.body);

  res.status(200).json({ status: "success", data: newClassroom });
});
