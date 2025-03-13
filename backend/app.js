const express = require("express");
const cors = require("cors");
const captchaRoutes = require("./routes/captchaRoutes");
const login = require("./routes/login")
const register = require("./routes/register")
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Use the captcha routes
app.use("/api", captchaRoutes);

app.use("/api", login);

app.use("/api", register);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});