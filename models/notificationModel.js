import { Schema, model } from "mongoose";

const notificationSchema = Schema({
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Departments",
  },
  link: String,
});

const Notifications = model("Notifications", notificationSchema);

export default Notifications;
