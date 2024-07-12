import Semesters from "../models/semesterModel";
import catchAsync from "../utils/catchAsync";

export const createSemester = catchAsync(async (req, res) => {
  const newSemester = await Semesters.create(req.body);
  res.status(200).json({ status: "success", data: newSemester });
});

export const getSemesters = catchAsync(async (req, res) => {
  const user = req.user;
  let semestersQuery;
  if (user.role.toLowerCase() === "teacher")
    semestersQuery = Semesters.find({ ...req.query });
  else if (user.role.toLowerCase() === "admin")
    semestersQuery = Semesters.find({
      ...req.query,
      department: req.user.department,
    });
  else if (user.role.toLowerCase() === "student") {
    semestersQuery = Semesters.find({
      ...req.query,
      department: req.user.department[0],
      open: true,
    });
  } else {
    semestersQuery = Semesters.find();
  }

  const semesters = await semestersQuery
    .populate({
      path: "batches",
      populate: { path: "sections courses" },
    })
    .exec();
  res.status(200).json({ status: "success", data: semesters });
});

export const updateSemesters = catchAsync(async (req, res) => {
  const { batches, ...otherUpdates } = req.body;

  const updatedSemester = await Semesters.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { batches: batches }, ...otherUpdates },
    { new: true }
  );

  res.status(200).json({ status: "success", data: updatedSemester });
});
