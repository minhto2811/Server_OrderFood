const mongoose = require('mongoose');

const Banner = new mongoose.Schema({
    image: { type: String, require: true},
    event: { type: String, require: true, unique: true },
}, {
    collection: "banners"
});

module.exports = mongoose.model('Banner', Banner);