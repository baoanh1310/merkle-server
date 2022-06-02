const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    account: {
        type: String,
        trim: true,
        required: 'NEAR account is required'
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);