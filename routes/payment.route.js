import { Router } from "express";
import verifyJWT from "../utils/verifyJWT";
import { payment } from "../controllers/payments.controller";
const router = Router();

router.post("/", payment);

export default router;
