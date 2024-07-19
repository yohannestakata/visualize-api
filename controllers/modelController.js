import Model from "../models/modelsModel";
import Notifications from "../models/notificationModel";
import catchAsync from "../utils/catchAsync";

export const uploadModel = catchAsync(async (req, res) => {
  const user = req.user;

  const newModel = await Model.create({ ...req.body, teacher: user.id });

  await Notifications.create({
    title: "New model alert!",
    description: `${user.nickname} uploaded ${newModel.modelTitle}. Be sure to check it out!`,
    link: newModel._id,
    department: newModel.department,
  });

  res.status(200).json({ status: "success", data: newModel });
});

export const getModels = catchAsync(async (req, res) => {
  const user = req.user;

  if (user.role.toLowerCase() === "student")
    req.query = {
      ...req.query,
      department: user.department,
      drafted: false,
    };

  if (user.role.toLowerCase() === "teacher")
    req.query = { ...req.query, teacher: user._id };

  const query = Model.find(req.query).populate("teacher department");
  query.sort({ createdAt: -1 });
  const models = await query.exec();

  res.status(200).json({ status: "success", data: models });
});

export const getModel = catchAsync(async (req, res) => {
  const id = req.params.id;
  const model = await Model.findById(id).populate("teacher");

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
