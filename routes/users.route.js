const express = require("express");
const router = express.Router();
const {
  deleteUserById,
  getAdmin,
  getSeller,
  getUsers,
  postUser,
  putToAdmin,
} = require("../controllers/users.controller");

router.get("/", getUsers);
router.post("/", postUser);
router.delete("/:id", deleteUserById);
router.get("/admin/:email", getAdmin);
router.get("/seller/:email", getSeller);
router.put("/admin/:id", putToAdmin);

module.exports = router;
