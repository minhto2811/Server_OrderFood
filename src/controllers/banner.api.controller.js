const Banner = require('../models/Banner');

class ApiController {
    getBanner(req, res) {
        Banner.find()
            .then((banners) => {
                res.json(banners);
            })
            .catch((err) => res.json(err));
    }
}




module.exports = new ApiController;