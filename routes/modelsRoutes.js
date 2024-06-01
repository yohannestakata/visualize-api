import { Router } from "express";
import {
  getModels,
  uploadModel,
  getModel,
  updateModel,
} from "../controllers/modelController";
import multer from "multer";

const router = new Router();

router.route("/").post(uploadModel).get(getModels);
router.route("/:id").get(getModel).patch(updateModel);

export default router;
