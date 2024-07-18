import { Router } from "express";
import catchAsync from "../utils/catchAsync";
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: "c9Br6v7O5hkJTbTkNTPFnwvPEFD61cJcLKuEIFAQ",
});

const router = new Router();

router.route("/").post(
  catchAsync(async (req, res) => {
    const { message } = req.body;

    const response = await cohere.chat({
      message,
    });

    res.status(200).json(response);
  })
);

export default router;
