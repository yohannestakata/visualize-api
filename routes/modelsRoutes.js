import { Router } from "express";
import {
  getModels,
  uploadModel,
  getModel,
} from "../controllers/modelController";
import multer from "multer";

const upload = multer();

const router = new Router();

router.route("/").post(uploadModel).get(getModels);
router.route("/:id").get(getModel);

export default router;
