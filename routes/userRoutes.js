import { Router } from "express";
import {
  getUser,
  createUser,
  getUsers,
  updateUser,
  registerUser,
} from "../controllers/userController";

const router = new Router();

router.route("/register/:id").patch(registerUser);
router.route("/:id").get(getUser).patch(updateUser);
router.route("/").post(createUser).get(getUsers);

export default router;
