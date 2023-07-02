const express = require('express');
const router = express.Router();
const apiController = require('../controllers/user.api.controller');
const upload = require('../config/saveIMG');



router.post('/createUser', apiController.createUser);
router.get('/getUser', apiController.getUser);
router.post('/deleteUser/:id',apiController.deleteUser);
router.post('/updateUser/:id',apiController.updateUser);



module.exports = router;