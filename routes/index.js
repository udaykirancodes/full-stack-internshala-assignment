const express = require('express')
const router = express.Router();

const authRoutes = require('./Auth/index');
router.use('/auth', authRoutes)

const dataRoute = require('./data');
router.use('/data', dataRoute);

module.exports = router;