const express = require("express");
const cors = require("cors");
const svgCaptcha = require("svg-captcha");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory database for storing captchas
const captchaDB = {};

// Generate a new CAPTCHA and return an ID
app.get("/api/verify/:id", (req, res) => {
  const { id } = req.params;
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 3,
    color: true,
    background: "#f4f4f4",
  });

  captchaDB[id] = captcha.text; // Store captcha text with the given ID
  res.type("svg").send(captcha.data);
});

// Verify user input
app.post("/api/verify/:text", (req, res) => {
  const { text } = req.params;
  const { id } = req.body; // Frontend must send the captcha ID

  if (!id || !captchaDB[id]) {
    return res.status(400).json({ success: false, message: "Invalid captcha ID." });
  }

  if (captchaDB[id] === text) {
    delete captchaDB[id]; // Remove captcha after successful verification
    return res.json({ success: true, message: "Verified!" });
  } else {
    return res.status(400).json({ success: false, message: "Refused! Incorrect text." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
