const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../config');
const User = require('../models/User');
const isUser = (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(400).json({ success: false, msg: "Invalid AuthToken" });
    }
    try {
        let data = jwt.verify(token, config.jwt);
        req.user = data.user
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, msg: "Internal Server Error" })
    }
}

router.get('/', isUser, async (req, res) => {
    try {
        let id = req.user.id;
        let user = await User.findById(id);
        if (!user) {
            res.status(400).json({ success: false, msg: "Invalid User" });
            return;
        }
        return res.status(200).json({ success: true, data: user })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, msg: "Internal Server Error" })

    }
})


module.exports = router;