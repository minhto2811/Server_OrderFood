const mongoose = require('mongoose');

const User = new mongoose.Schema({
    fullname: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    numberphone: { type: String, require: true },
    role: { type: Boolean },
    email: { type: String, require: true, unique: true },
    image: { type: String },
    sex: { type: Boolean },
    date: { type: String },
    tokenNotify: { type: String },
    resetToken: { type: String },
    resetTokenExpiration: { type: Date, },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

}, {
    collection: "users"
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);