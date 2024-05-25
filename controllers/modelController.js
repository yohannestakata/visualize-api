import Model from "../models/modelsModel";
import catchAsync from "../utils/catchAsync";

export const uploadModel = catchAsync(async (req, res) => {
  console.log(req.body);
  const newModel = await Model.create(req.body);
  console.log(newModel);
  res.status(200).json({ status: "success", data: newModel });
});
