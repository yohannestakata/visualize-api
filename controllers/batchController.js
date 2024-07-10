import Batches from "../models/batchesModel";
import Section from "../models/sectionsModel";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";

export const createBatch = catchAsync(async (req, res) => {
  const { sections, department, year } = req.body;

  const sectionPromises = sections.map(async (section) => {
    let repId = undefined;

    if (section.representative) {
      const user = await User.findOne({
        uniId: section.representative,
      });
      if (user) repId = user._id;
    }

    const newSection = await Section.create({
      representative: repId,
      name: section.name,
      department: section.department,
    });

    return newSection._id;
  });

  const sectionIds = await Promise.all(sectionPromises);

  const newBatch = await Batches.create({
    year,
    department,
    sections: sectionIds,
  });

  res.status(200).json({ status: "success", data: newBatch });
});

export const updateBatch = catchAsync(async (req, res) => {
  const { courses, ...otherUpdates } = req.body;

  const updatedBatch = await Batches.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { courses: courses }, ...otherUpdates },
    { new: true }
  );

  res.status(200).json({ status: "success", data: updatedBatch });
});

export const deleteCourseFromBatch = catchAsync(async (req, res) => {
  const { courseId, batchId } = req.params;
  const updatedBatch = await Batches.findByIdAndUpdate(
    batchId,
    { $pull: { courses: courseId } }, // Use $pull operator
    { new: true } // Return the updated document
  );

  res.status(200).json({ status: "success", data: updatedBatch });
});

export const getBatches = catchAsync(async (req, res) => {
  const batches = await Batches.find({ department: req.user.department });
  res.status(200).json({ status: "success", data: batches });
});

export const getBatch = catchAsync(async (req, res) => {
  const batch = await Batches.findOne({ _id: req.params.id });
  res.status(200).json({ status: "success", data: batch });
});
