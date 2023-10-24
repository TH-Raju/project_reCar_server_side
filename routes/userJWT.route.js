import { Router } from "express";
import { jwt } from "../controllers/userJWT.controller";
const router = Router();

router.get("/", jwt);

export default router;