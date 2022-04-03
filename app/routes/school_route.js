import { Router } from "express";
import {
  get_school,
  get_schools,
} from "../controllers/school_controller.js";

const router = Router();

router.get("/", get_schools);

router.get("/:school_id", get_school);

export default router;
