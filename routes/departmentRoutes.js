import { Router } from "express";
import {
  createDepartment,
  getAllDepartments,
  updateDepartment,
} from "../controllers/departmentController";

const router = new Router();

router.route("/:id").patch(updateDepartment);
router.route("/").post(createDepartment).get(getAllDepartments);

export default router;
