const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const verifyToken = require("./auth.middleware");

router.post("/register", authController.register)
router.post("/login", authController.login)

module.exports = router