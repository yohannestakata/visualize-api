import { Router } from "express";
import { addCourse, getAllCourses } from "../controllers/courseController";

const router = new Router();

router.route("/").get(getAllCourses).post(addCourse);

export default router;
