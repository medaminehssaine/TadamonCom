const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { Buffer } = require('buffer');
const router = express.Router();
const { hashData, decodeBase64 } = require("../controllers/utils")
const { User } = require("../controllers/userController")

router.post("/auth/register",  async (req, res) => {
    try {
        const { email: encodedEmail, password: hashedPassword } = req.body;

        console.log(encodedEmail, hashedPassword)

        const email = decodeBase64(encodedEmail).toLowerCase().trim();
        const password = decodeBase64(hashedPassword);

        console.log(email, password)
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const finalHashedPassword = await hashData(password);

        const user = new User({
            email,
            password: finalHashedPassword,
        });

        await user.save();

        // Send success response
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
})

module.exports = router;