import { Router } from "express";
import Batches from "../models/batchesModel";
import { createBatch } from "../controllers/batchController";

const router = Router();

router.route("/").post(createBatch);

export default router;
