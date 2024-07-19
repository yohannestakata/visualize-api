import Notifications from "../models/notificationModel";
import catchAsync from "../utils/catchAsync";

export const getNotifications = catchAsync(async (req, res) => {
  const notifications = await Notifications.find({
    department: req.user.department,
  });

  res.status(200).json({ status: "success", data: notifications });
});

export const createNotification = catchAsync(async (req, res) => {
  const newNotification = await Notification.create(req.body);

  res.status(200).json({ status: 200, data: newNotification });
});
