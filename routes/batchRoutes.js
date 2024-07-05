import { Router } from "express";
import Batches from "../models/batchesModel";

const router = Router();

router.route("/").post(async (req, res) => {
  const newBatch = await Batches.create(req.body);
  res.json({ data: newBatch });
});

export default router;
