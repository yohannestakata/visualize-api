import Model from "../models/modelsModel";
import catchAsync from "../utils/catchAsync";

export const uploadModel = catchAsync(async (req, res) => {
  const user = req.user;
  console.log(req.body);

  const newModel = await Model.create({ ...req.body, teacher: user.id });

  res.status(200).json({ status: "success", data: newModel });
});

export const getModels = catchAsync(async (req, res) => {
  const query = Model.find(req.query);
  const models = await query.exec();

  res.status(200).json({ status: "success", data: models });
});
