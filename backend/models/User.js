const mongoose = require('mongoose');
const UserSchema = new UserSchema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    contact: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model("user", UserSchema);