const Banner = require('../models/Banner');
const fs = require('fs');
const path = require('path');
const { uploadImage, deleteImage } = require('../config/firebaseUploader');

class ApiController {
    getBanner(req, res) {
        Banner.find()
            .then((banners) => {
                res.render('list-banner', {
                    listBanner: banners.map(item => item.toObject()),
                })
            })
            .catch((err) => res.json(err));
    }

    UIaddBanner(req, res) {
        res.render('add-banner');
    }

    addBanner(req, res) {
        const bannerData = req.body;
        const filename = req.file.filename;
        const filepath = req.file.path;
        uploadImage(filepath, filename)
            .then((url) => {
                bannerData.image = url;
                Banner.create(bannerData)
                    .then(() => res.redirect('/banner/get-banner'))
                    .catch((err) => res.json(err));
            }).catch((err) => res.json(err));

    }

    UIupdateBanner(req, res) {
        const id = req.params.id;
        Banner.findById(id)
            .then((banner) => {
                res.render('update-banner', { banner: banner.toObject() })
            })
            .catch((err) => res.json(err));

    }
    async updateBanner(req, res) {
        const id = req.params.id;
        const bannerData = req.body;
        if (req.file != null) {
            const filename = req.file.filename;
            const filepath = req.file.path;
            await deleteImage(bannerData.old);
            delete bannerData.old;
            await uploadImage(filepath, filename)
                .then((url) => {
                    bannerData.image = url;
                    Banner.findByIdAndUpdate(id, bannerData)
                        .then(() => res.redirect('/banner/get-banner'))
                        .catch((err) => res.json(err));
                }).catch((err) => res.json(err));
        } else {
            bannerData.image = bannerData.old;
            delete bannerData.old;
            Banner.findByIdAndUpdate(id, bannerData)
                .then(() => res.redirect('/banner/get-banner'))
                .catch((err) => res.json(err));
        }



    }


    deleteBanner(req, res) {
        const id = req.params.id;
        Banner.findByIdAndDelete(id)
            .then((banner) => {
                const imageUrl = banner.image;
                deleteImage(imageUrl)
                    .then(() => {
                        res.redirect('/banner/get-banner');
                    })
                    .catch(err => {
                        res.json(err);
                    });
            })
            .catch((err) => res.json(err));
    }


}




module.exports = new ApiController;