var express = require('express');
var expressHbs = require('express-handlebars');
var bodyParser = require('body-parser');
require('dotenv').config();
var PORT = process.env.PORT;
const db = require('./src/config/database');
var path = require('path');


var app = express();

app.use(express.static(path.join(__dirname, '/src/public')));
app.engine('.hbs', expressHbs.engine({
    extname: '.hbs',
    defaultLayout:'main',
    layoutsDir: path.join(__dirname, '/src/views/layouts'),
    helpers:{
        sum: (a) => a + 1,
    }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/src/views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var route = require('./src/routes/index.route')


route(app);
db.connect();
app.listen(PORT, () => {
    console.log(`app running at http://localhost:${PORT}/banner/get-banner`)
});