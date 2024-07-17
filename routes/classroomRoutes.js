import { Router } from "express";
import {
  createClassroom,
  getClassroom,
  getClassrooms,
  updateClassroom,
} from "../controllers/classroomController";

const router = new Router();

router.route("/:id").get(getClassroom).post(updateClassroom);
router.route("/").post(createClassroom).get(getClassrooms);

export default router;
