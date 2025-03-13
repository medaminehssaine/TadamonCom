const svgCaptcha = require("svg-captcha");

// In-memory database for storing captchas
const captchaDB = {};

const generateCaptcha = (req, res) => {
  const { id } = req.params;
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 3,
    color: true,
    background: "#f4f4f4",
  });

  captchaDB[id] = captcha.text; // Store captcha text with the given ID
  res.type("svg").send(captcha.data);
};

const verifyCaptcha = (req, res) => {
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
};

module.exports = {
  generateCaptcha,
  verifyCaptcha,
};