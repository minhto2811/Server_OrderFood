const User = require('../models/User');
require('dotenv').config();
const SECRECT_KEY = process.env.SECRECT_KEY;
var jwt = require('jsonwebtoken');
const { uploadImage, deleteImage } = require('../config/firebaseUploader');

class ApiController {
    getUser(req, res) {
        User.find().then((users) => {
            users.map(item => { item.userID = jwt.verify(item.userID, SECRECT_KEY) });
            res.render('list-user', { users: users.map(item => item.toObject()) });
        }).catch((err) => res.json(err));
    }

    UIaddUser(req, res) {
        res.render('add-user');
    }

    addUser(req, res) {
        const user = req.body;
        const filename = req.file.filename;
        const filepath = req.file.path;
        uploadImage(filepath, filename)
            .then((url) => {
                user.image = url;
                user.userID = jwt.sign(user.userID, SECRECT_KEY);
                User.create(user).then(
                    (user) => {
                        console.log(user);
                        res.redirect('/user/get-user');
                    })
                    .catch((err) => res.json(err));
            }).catch((err) => res.json(err));
    }

    deleteUser(req, res) {
        const id = req.params.id;
        User.findByIdAndDelete(id)
            .then((user) => {
                const imageUrl = user.image;
                deleteImage(imageUrl)
                    .then(() => {
                        res.redirect('/user/get-user');
                    })
                    .catch(err => {
                        res.json(err);
                    });
            })
            .catch((err) => res.json(err));
    }

    UIupdateUser(req, res) {
        const id = req.params.id;
        User.findById(id)
            .then((user) => {
                user.userID = jwt.verify(user.userID, SECRECT_KEY);
                res.render('update-user', { user: user.toObject() });
            })
            .catch((err) => res.json(err));
    }

    async updateUser(req, res) {
        const id = req.params.id;
        const userData = req.body;
        if (req.file != null) {
            await deleteImage(userData.old);
            delete userData.old;
            const filename = req.file.filename;
            const filepath = req.file.path;
            await uploadImage(filepath, filename)
                .then((url) => {
                    userData.image = url;
                    User.findByIdAndUpdate(id, userData)
                        .then(() => res.redirect('/user/get-user'))
                        .catch((err) => res.json(err));
                }).catch((err) => res.json(err));
        } else {
            userData.image = userData.old;
            delete userData.old;
            User.findByIdAndUpdate(id, userData)
                .then(() => res.redirect('/user/get-user'))
                .catch((err) => res.json(err));
        }


        // User.findById(id)
        // .then((user)=>res.render('update-user',{user:user.toObject()}))
        // .catch((err)=>res.json(err));
    }
}




module.exports = new ApiController;