const express = require("express");
const router = express.Router();
const {
  deleteProduct,
  getProduct,
  postProduct,
} = require("../controllers/product.controller");


router.get("/", getProduct);
router.post("/", postProduct);
router.delete("/:id", deleteProduct);

module.exports= router;
