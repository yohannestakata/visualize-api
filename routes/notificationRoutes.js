import { Router } from "express";
import {
  createNotification,
  getNotifications,
} from "../controllers/notificationController";

const router = new Router();

router.route("/").get(getNotifications).post(createNotification);

export default router;
