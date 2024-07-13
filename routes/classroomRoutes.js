import { Router } from "express";
import {
  createClassroom,
  getClassrooms,
} from "../controllers/classroomController";

const router = new Router();

router.route("/").post(createClassroom).get(getClassrooms);

export default router;
