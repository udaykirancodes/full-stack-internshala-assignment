const express = require('express')

const router = express.Router();

// import routes
const loginRoutes = require('./Login')
const registerRoutes = require('./Register')
const loginWithOTPRoutes = require('./LoginWithOTP');
const registerWithOTPRoutes = require('./RegisterWithOTP')

router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/loginwithotp', loginWithOTPRoutes);
router.use('/registerwithotp', registerWithOTPRoutes);


module.exports = router;