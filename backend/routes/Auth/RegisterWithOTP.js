const express = require('express')
const router = express.Router();

router.get('/', (req, res) => res.send('register with otp method'))


module.exports = router;