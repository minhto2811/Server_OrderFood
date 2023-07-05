const mongoose = require('mongoose');

const User = new mongoose.Schema({
    fullname: { type: String, require: true },
    userID: { type: String, require: true, unique: true },
    numberphone: { type: String},
    role: { type: Boolean },
    email: { type: String},
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