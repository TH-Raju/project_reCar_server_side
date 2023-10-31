const express = require("express");
const router = express.Router();
const {
  getCategoriy,
  getCategoriyById,
  putCategoriy,
  postCategoriy,
} = require("../controllers/categoriy.controller");


router.get("/", getCategoriy);
router.post("/", postCategoriy);
router.put("/", putCategoriy);
router.get("/:id", getCategoriyById);

module.exports = router;
