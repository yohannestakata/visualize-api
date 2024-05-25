import { Router } from "express";
const { getUser } = require("../controllers/userController");

const router = new Router();

router.route("/:id").get(getUser);

export default router;
