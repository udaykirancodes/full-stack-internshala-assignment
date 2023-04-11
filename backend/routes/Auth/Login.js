const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config')
// import model
const UserModel = require('../../models/User');

// Login Normal

router.post('/', async (req, res) => {
    // validation
    const { email, password } = req.body;
    try {
        // find user
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            // user not found
            res.status(400).json({ success: false, msg: "User Not found" });
        }
        // if found :: check password
        let comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ success: false, msg: "Invalid Credentials" });
        }

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
        res.status(500).json({ success: false, msg: "Internal Server Error" })
    }
})

module.exports = router;