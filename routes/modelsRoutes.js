import { Router } from "express";
import { uploadModel } from "../controllers/modelController";
import multer from "multer";

const upload = multer();

const router = new Router();

router.route("/upload").post(
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "model", maxCount: 1 },
  ]),
  uploadModel
);

export default router;
