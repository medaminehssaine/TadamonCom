const express = require("express");
const router = express.Router();

router.get("/auth/register/:enc", (req, res) => {
    const { t } = req.params;
    atob(t)
})