import Model from "../models/modelsModel";
import catchAsync from "../utils/catchAsync";

export const uploadModel = catchAsync(async (req, res) => {
  const user = req.user;
  console.log(req.body);

  const newModel = await Model.create({ ...req.body, teacher: user.id });

  res.status(200).json({ status: "success", data: newModel });
});

export const getModels = catchAsync(async (req, res) => {
  const query = Model.find(req.query).populate("teacher");
  query.sort({ createdAt: -1 });
  const models = await query.exec();

  res.status(200).json({ status: "success", data: models });
});

export const getModel = catchAsync(async (req, res) => {
  const id = req.params.id;
  const model = await Model.findById(id);

  res.status(200).json({ status: 200, data: model });
});

export const updateModel = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedModel = await Model.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({ status: 200, data: updatedModel });
});

export const deleteModel = catchAsync(async (req, res) => {
  const id = req.params.id;
  await Model.findByIdAndDelete(id);
  res.status(200).json({ status: "success" });
});
