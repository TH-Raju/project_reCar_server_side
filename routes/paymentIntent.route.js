import { Router } from "express";
import { paymentIntent } from "../controllers/paymentIntent.controller";
const router = Router();

router.post("/", paymentIntent);

export default router;
