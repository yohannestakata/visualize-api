import { Router } from "express";
import {
  addCourse,
  getAllCourses,
  updateCourse,
} from "../controllers/courseController";

const router = new Router();

router.route("/").get(getAllCourses).post(addCourse);
router.route("/:id").patch(updateCourse);

export default router;
