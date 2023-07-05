const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner.controller');
const {upload} = require('../config/saveIMG');


router.get('/get-banner', bannerController.getBanner);
router.post('/add-banner', upload.single('image'), bannerController.addBanner);
router.get('/add-banner', bannerController.UIaddBanner);
router.get('/update-banner/:id', bannerController.UIupdateBanner);
router.post('/update-banner/:id', upload.single('image'), bannerController.updateBanner);
router.post('/delete-banner/:id', bannerController.deleteBanner);


module.exports = router;