import Classrooms from "../models/classroomModel";
import catchAsync from "../utils/catchAsync";

export const createClassroom = catchAsync(async (req, res) => {
  const newClassroom = await Classrooms.create(req.body);

  res.status(200).json({ status: "success", data: newClassroom });
});

export const getClassrooms = catchAsync(async (req, res) => {
  const { sections } = req.query;
  const sectionIds = sections.split(",");

  const classrooms = await Classrooms.find({
    sections: { $in: sectionIds },
  }).populate("course teacher models");

  res.status(200).json({ status: "success", data: classrooms });
});
