import { Router } from "express";
import {
  deleteProduct,
  getProduct,
  postProduct,
} from "../controllers/product.controller";
const router = Router();

router.get("/", getProduct);
router.post("/", postProduct);
router.delete("/:id", deleteProduct);

export default router;
