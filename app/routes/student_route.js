import { Router } from "express";
import {
  get_student,
  get_students,
  add_student,
  update_student,
  delete_student,
} from "../controllers/student_controller.js";

const router = Router();

router.get("/", get_students);

router.get("/:student_id", get_student);

router.post("/", add_student);

router.put("/:student_id", update_student);

router.delete("/:student_id", delete_student);

export default router;
