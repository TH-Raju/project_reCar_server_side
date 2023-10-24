const express = require("express");
const router = express.Router();
const paymentIntent = require("../controllers/paymentIntent.controller");

router.post("/", paymentIntent);

module.exports = router;
