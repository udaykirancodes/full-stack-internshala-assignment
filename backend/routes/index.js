const express = require('express')
const router = express.Router();

const authRoutes = require('./Auth/index');
router.use('/auth', authRoutes)

module.exports = router;