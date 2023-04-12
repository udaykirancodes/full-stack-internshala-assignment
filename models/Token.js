const mongoose = require('mongoose');
const TokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600 // 1Hr
    }
})

module.exports = mongoose.model("Tokens", TokenSchema);