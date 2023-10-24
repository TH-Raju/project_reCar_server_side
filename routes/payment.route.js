const express = require("express");
const router = express.Router();
const payment = require("../controllers/payments.controller");

router.post("/", payment);

module.exports = router;
