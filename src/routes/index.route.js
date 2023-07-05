

const bannerApi = require('./banner.api.route');


const banner = require('./banner.route');
const user = require('./user.route');



function route(app) {
    app.get('/', (req, res) => {
        res.redirect('/banner/get-banner');
    });


    app.use('/api/banner', bannerApi);



    app.use('/banner', banner);
    app.use('/user', user);
}
module.exports = route;