import { Router } from "express";
import { createSemester } from "../controllers/semesterController";

const router = Router();

router.route("/").post(createSemester);

export default router;
