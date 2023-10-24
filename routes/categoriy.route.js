import { Router } from "express";
import {
  getCategoriy,
  getCategoriyById,
  putCategoriy,
} from "../controllers/categoriy.controller";
const router = Router();

router.get("/", getCategoriy);
router.put("/", putCategoriy);
router.get("/:id", getCategoriyById)

export default router;
