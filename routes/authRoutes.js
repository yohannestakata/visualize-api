import { Router } from "express";
import { signup, getSignedUser } from "../controllers/authController";

const router = new Router();

router.route("/signup").post(signup);

router.route("/signed-user").get(getSignedUser);

export default router;
