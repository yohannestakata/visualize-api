import { Router } from "express";
import { uploadModel } from "../controllers/modelController";
import multer from "multer";

const upload = multer();

const router = new Router();

router.route("/upload").post(uploadModel);

export default router;
