const express = require('express');
const router = express.Router();
const apiController = require('../controllers/user.controller');
const {upload} = require('../config/saveIMG');



router.get('/get-user', apiController.getUser);
router.post('/add-user',upload.single('image'), apiController.addUser);
router.get('/add-user', apiController.UIaddUser);


module.exports = router;