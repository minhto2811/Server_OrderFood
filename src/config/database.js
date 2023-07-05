const mongoose = require('mongoose');
require('dotenv').config();
const URI_MONGODB = process.env.URI_MONGODB;

async function connect() {
    try {
        await mongoose.connect(URI_MONGODB, { useNewUrlParser: true,
        useUnifiedTopology: true });
        console.log(`kết nối databse thành công ${URI_MONGODB}`);
    } catch (error) {
        console.log(`kết nối databse thất bại ${URI_MONGODB}`);
    }

}

module.exports = { connect };