const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const Token = require('../../models/Token')
const { sendEmail } = require('../mail')
const config = require('../../config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Request For OTP
router.post('/getotp', async (req, res) => {
    try {
        const { email, contact, name } = req.body;
        console.log(email);
        if (!email) return res.status(400).json({ success: false, msg: "Email Required" })
        let user = null;
        user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ success: false, msg: "User Found With Email" })
        }
        const random = Math.floor(Math.random() * 9000 + 1000);
        console.log(random);
        // Generate Token
        const token = new Token({
            email: email,
            otp: random
        })
        // Save Token
        const savedToken = await token.save();
        // Email Sending
        let subject = 'OTP For Register🔥'
        let html = `<h2>OTP : ${random} <h2/>`
        await sendEmail(res, email, subject, html);
    } catch (error) {
        console.log(error.message);
        return res.status(200).json({ success: false, msg: "Internal Server Error" })
    }
})
// validate OTP
router.post('/validate', async (req, res) => {
    try {
        const { email, otp, name, contact } = req.body;
        if (!email || !otp) return res.status(400).json({ success: false, msg: "Email required" })
        let token = null;
        token = await Token.findOne({ email, otp });
        if (!token) {
            return res.status(400).json({ success: false, msg: "Invalid OTP" })
        }
        // password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(email, salt);
        let user = new User({
            email: email,
            name: name || 'No name',
            contact: contact || '00',
            password: hashedPassword
        })
        let newUser = await user.save();
        // JWT TOKEN
        let data = {
            user: {
                id: user._id
            }
        }
        let authToken = await jwt.sign(data, config.jwt)
        res.status(200).json({ success: true, authToken: authToken })
        return

    } catch (error) {
        console.log(error.message);
        return res.status(200).json({ success: false, msg: "Internal Server Error" })
    }
})

module.exports = router;