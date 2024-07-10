import { Router } from "express";
import {
  createSemester,
  getSemesters,
  updateSemesters,
} from "../controllers/semesterController";

const router = Router();

router.route("/:id").patch(updateSemesters);
router.route("/").post(createSemester).get(getSemesters);

export default router;
