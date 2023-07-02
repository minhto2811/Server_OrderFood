const express = require('express');
const router = express.Router();
const bannerApiController = require('../controllers/banner.api.controller');

router.get('/get-banner', bannerApiController.getBanner);

module.exports = router;


