import { Router } from "express";
const { getUser, createUser } = require("../controllers/userController");

const router = new Router();

router.route("/:id").get(getUser);
router.route("/").post(createUser);

export default router;
