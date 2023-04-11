const express = require('express')
const router = express.Router();

// Login Normal
router.get('/', (req, res) => res.send('login normal method'))

module.exports = router;