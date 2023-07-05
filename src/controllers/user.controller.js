const User = require('../models/User');
require('dotenv').config();
const SECRECT_KEY = process.env.SECRECT_KEY;
var jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

class ApiController {
    getUser(req, res) {
        User.find().then((users) => {
            res.render('list-user', { users: users.map(item => item.toObject()) });
        }).catch((err) => res.json(err));
    }

    UIaddUser(req, res) {
        res.render('add-user');
    }

    addUser(req, res) {
        const user = req.body;
    
        if (req.file != null) {
            user.image = "/images/user/" + req.file.filename;
        }
        user.userID = jwt.sign(user.userID, SECRECT_KEY);
        console.log(user)
        User.create(user).then((user) => res.redirect('/user/get-user'))
            .catch((err) => {
                const imagePath = path.join(__dirname, '../public', user.image);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                    res.json(err);
                });
            });
    }
}




module.exports = new ApiController;