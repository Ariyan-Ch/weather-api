const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter the Username"],
        unique: [true, "User already exists in the database"]
    },
    password: {
        type: String,
        required: [true, "Please Enter the Password"]
    },

});

// Pre-save hook to hash the password before saving
user.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const collectionName = 'UserCreds'
module.exports = mongoose.model(collectionName, user);