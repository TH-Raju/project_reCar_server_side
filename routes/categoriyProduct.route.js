const express = require("express");
const router = express.Router();
const { getCategoriyProduct } = require("../controllers/categoriy.controller");


router.get("/", getCategoriyProduct);

module.exports = router;
