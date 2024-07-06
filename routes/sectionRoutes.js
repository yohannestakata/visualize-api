import { Router } from "express";
import { createSections } from "../controllers/sectionsController";

const router = Router();

router.route("/").post(createSections);

export default router;
