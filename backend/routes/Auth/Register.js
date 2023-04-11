const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Regiser Normal
router.post('/', async (req, res) => {
    try {
        const { email, password, name, contact } = req.body;
        // validation
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: "Email & Password are required" });
        }
        // check if found
        let user = null;
        user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ success: false, msg: "Email already registered" });
        }
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            email: email,
            password: hashedPassword,
            name: name || "",
            contact: contact || ""
        })
        const newuser = await user.save();
        // JWT TOKEN
        let data = {
            user: {
                id: user._id
            }
        }
        let authToken = await jwt.sign(data, config.jwt)
        res.status(200).json({ success: true, authToken: authToken })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
})


module.exports = router;