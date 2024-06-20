import { Router } from "express";
import { createDepartment } from "../controllers/departmentController";

const router = new Router();

router.route("/").post(createDepartment);

export default router;
