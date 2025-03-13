const express = require("express");
const router = express.Router();
const captchaController = require("../controllers/captchaController");

// Generate a new CAPTCHA and return an ID
router.get("/verify/:id", captchaController.generateCaptcha);

// Verify user input
router.post("/verify/:text", captchaController.verifyCaptcha);

module.exports = router;