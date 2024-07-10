import { Router } from "express";
import {
  createBatch,
  updateBatch,
  getBatches,
  getBatch,
  deleteCourseFromBatch,
} from "../controllers/batchController";

const router = Router();

router.route("/:batchId/courses/:courseId").delete(deleteCourseFromBatch);
router.route("/:id").patch(updateBatch).get(getBatch);
router.route("/").post(createBatch).get(getBatches);

export default router;
