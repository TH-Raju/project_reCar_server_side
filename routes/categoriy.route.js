const express = require("express");
const router = express.Router();
const {
  getCategoriy,
  getCategoriyById,
  putCategoriy,
} = require("../controllers/categoriy.controller");


router.get("/", getCategoriy);
router.put("/", putCategoriy);
router.get("/:id", getCategoriyById);

module.exports = router;
