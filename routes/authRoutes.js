import { Router } from "express";
import { signup, getSignedUser, login } from "../controllers/authController";

const router = new Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/signed-user").post(getSignedUser);

export default router;
