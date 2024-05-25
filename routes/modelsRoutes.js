import { Router } from "express";
import { uploadModel } from "../controllers/modelController";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = new Router();

router.route("/upload").post(upload.any(), uploadModel);

export default router;
