const express = require("express");
const router = express.Router();
const  jwt  = require("../controllers/userJWT.controller");


router.get("/", jwt);

module.exports = router;