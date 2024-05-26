import { Router } from "express";
import { getModels, uploadModel } from "../controllers/modelController";
import multer from "multer";

const upload = multer();

const router = new Router();

router.route("/").post(uploadModel).get(getModels);

export default router;
