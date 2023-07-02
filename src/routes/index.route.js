
const userApi = require('./user.api.route');
const bannerApi = require('./banner.api.route');


const banner = require('./banner.route');




function route(app) {
    app.get('/', (req, res) => {
        res.redirect('/banner/get-banner');
    });

    app.use('/api/user', userApi);
    app.use('/api/banner', bannerApi);



    app.use('/banner', banner);
}
module.exports = route;