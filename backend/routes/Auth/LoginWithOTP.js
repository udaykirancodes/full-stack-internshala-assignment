const express = require('express')
const router = express.Router();

router.get('/', (req, res) => res.send('login with otp method'))


module.exports = router;