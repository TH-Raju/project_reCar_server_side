import { Router } from "express";
import {
  deleteUserById,
  getAdmin,
  getSeller,
  getUsers,
  postUser,
  putToAdmin,
} from "../controllers/users.controller";
import verifyJWT from "../utils/verifyJWT";
const router = Router();

router.get("/", getUsers);
router.post("/", postUser);
router.delete("/:id", deleteUserById);
router.get("/admin/:email", getAdmin);
router.get("/seller/:email", getSeller);
router.put("/admin/:id", verifyJWT, putToAdmin);

export default router;
