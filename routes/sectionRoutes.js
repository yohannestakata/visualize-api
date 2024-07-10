import { Router } from "express";
import {
  createSections,
  updateSection,
} from "../controllers/sectionsController";

const router = Router();

router.route("/:id").patch(updateSection);
router.route("/").post(createSections);

export default router;
