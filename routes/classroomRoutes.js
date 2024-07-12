import { Router } from "express";
import { createClassroom } from "../controllers/classroomController";

const router = new Router();

router.route("/").post(createClassroom);

export default router;
