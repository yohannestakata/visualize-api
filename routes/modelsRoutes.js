import { Router } from "express";
import {
  getModels,
  uploadModel,
  getModel,
  updateModel,
  deleteModel,
} from "../controllers/modelController";

const router = new Router();

router.route("/").post(uploadModel).get(getModels);
router.route("/:id").get(getModel).patch(updateModel).delete(deleteModel);

export default router;
