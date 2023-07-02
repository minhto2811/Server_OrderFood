const Banner = require('../models/Banner');
const fs = require('fs');
const path = require('path');

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
        bannerData.image = "/images/banner/" + req.file.filename;
        Banner.create(bannerData)
            .then(() => res.redirect('/banner/get-banner'))
            .catch((err) => res.json(err));
    }

    UIupdateBanner(req, res) {
        const id = req.params.id;
        Banner.findById(id)
            .then((banner) => {
                res.render('update-banner', { banner: banner.toObject() })
            })
            .catch((err) => res.json(err));

    }
    updateBanner(req, res) {
        const id = req.params.id;
        const bannerData = req.body;
        if (req.file != null) {
            bannerData.image = "/images/banner/" + req.file.filename;
        } else {
            bannerData.image = bannerData.old;
        }
        const imagePath = path.join(__dirname, '../public', bannerData.old);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(err);
            }
            delete bannerData.old;
            Banner.findByIdAndUpdate(id, bannerData)
                .then(() => res.redirect('/banner/get-banner'))
                .catch((err) => res.json(err));
        });
    }


    deleteBanner(req, res) {
        const id = req.params.id;
        Banner.findByIdAndDelete(id)
            .then((banner) => {
                const imagePath = path.join(__dirname, '../public', banner.image);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                    res.redirect('/banner/get-banner');
                });
            })
            .catch((err) => res.json(err));
    }


}




module.exports = new ApiController;