import { Router } from "express";
import {
  createDepartment,
  getAllDepartments,
} from "../controllers/departmentController";

const router = new Router();

router.route("/").post(createDepartment).get(getAllDepartments);

export default router;
