import { Router } from "express";
import {
  createClassroom,
  getClassroom,
  getClassrooms,
  updateClassroom,
  addActivity,
  addExamActivity,
} from "../controllers/classroomController";

const router = new Router();

router.route("/addActivity/:id").patch(addActivity);
router.route("/exam/addActivity/:id").patch(addExamActivity);
router.route("/:id").get(getClassroom).post(updateClassroom);
router.route("/").post(createClassroom).get(getClassrooms);

export default router;
