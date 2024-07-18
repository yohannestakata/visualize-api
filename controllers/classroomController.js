import Classrooms from "../models/classroomModel";
import catchAsync from "../utils/catchAsync";

export const createClassroom = catchAsync(async (req, res) => {
  const newClassroom = await Classrooms.create(req.body);

  res.status(200).json({ status: "success", data: newClassroom });
});

export const getClassrooms = catchAsync(async (req, res) => {
  const { sections } = req.query;

  let classroomQuery;

  if (req.user.role.toLowerCase() === "student") {
    const sectionIds = sections.split(",");

    classroomQuery = Classrooms.find({
      sections: { $in: sectionIds },
    }).populate("course teacher models");
  } else if (req.user.role.toLowerCase() === "teacher") {
    classroomQuery = Classrooms.find({ teacher: req.user._id }).populate(
      "department sections"
    );
  } else classroomQuery = Classrooms.find({ department: req.user.department });

  const classrooms = await classroomQuery.populate("models").exec();

  res.status(200).json({ status: "success", data: classrooms });
});

export const getClassroom = catchAsync(async (req, res) => {
  const classroom = await Classrooms.findById(req.params.id).populate("models");
  res.status(200).json({ status: "success", data: classroom });
});

export const updateClassroom = catchAsync(async (req, res) => {
  const updatedClassroom = await Classrooms.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ status: "success", data: updatedClassroom });
});

export const addActivity = catchAsync(async (req, res) => {
  const classroomId = req.params.id;

  const updatedClassroom = await Classrooms.findByIdAndUpdate(classroomId, {
    $push: { activities: new Date() },
  });

  res.status(200).json({ status: "success", data: updatedClassroom });
});

export const addExamActivity = catchAsync(async (req, res) => {
  const classroomId = req.params.id;

  const updatedClassroom = await Classrooms.findByIdAndUpdate(classroomId, {
    $push: { examStat: new Date() },
  });

  res.status(200).json({ status: "success", data: updatedClassroom });
});
