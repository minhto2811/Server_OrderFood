const User = require('../models/User');
require('dotenv').config();
const SECRECT_KEY = process.env.SECRECT_KEY;
var jwt = require('jsonwebtoken');

class ApiController {
    createUser(req, res) {
        var user = req.body;
        user.password = jwt.sign(user.password, SECRECT_KEY);
        User.create(user)
            .then((u) => {
                res.json(u);
            })
            .catch((err) => {
                res.json({ msg: err });
            });
    }
    getUser(req, res) {
        User.find()
            .then((users) => {
                res.json(users)
            })
            .catch((err) => {
                res.json({ msg: err })
            });
    }
    deleteUser(req, res) {
        const id = req.params.id;
        User.findByIdAndDelete(id)
            .then((rs) => {
                res.json('Xoa thanh cong');
            })
            .catch(
                (err) => {
                    res.json(err);
                });
    }

    updateUser(req, res) {
        const id = req.params.id;
        const fullnameNew = req.body.fullname;
        User.findByIdAndUpdate(id, { $set: { fullname: fullnameNew } })
            .then((rs) => {
                res.json('Cap nhat thanh cong');
            })
            .catch(
                (err) => {
                    res.json(err);
                });
    }

}




module.exports = new ApiController;