import { Router } from "express";
import { getCategoriyProduct } from "../controllers/categoriy.controller";
const router = Router();

router.get("/", getCategoriyProduct);

export default router;
