import { Router } from "express";
import {
  getUser,
  createUser,
  getUsers,
  updateUser,
} from "../controllers/userController";

const router = new Router();

router.route("/:id").get(getUser).patch(updateUser);
router.route("/").post(createUser).get(getUsers);

export default router;
