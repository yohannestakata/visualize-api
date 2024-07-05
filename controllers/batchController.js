import Batches from "../models/batchesModel";
import Section from "../models/sectionsModel";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";

export const createBatch = catchAsync(async (req, res) => {
  const { sections, department, year } = req.body;

  const sectionPromises = sections.map(async (section) => {
    const { _id: repId } = await User.findOne({
      uniId: section.representative,
    });

    const newSection = await Section.create({
      representative: repId,
      name: section.name,
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
