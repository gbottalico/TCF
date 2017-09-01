 require('rootpath')();
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(config.connectionString);

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
/*app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/tcf/api/userController/authenticate'] }));*/

// routes
app.use('/tcf/api/userController', require('./controllers/user.controller'));
app.use('/tcf/api/domainController', require('./controllers/domain.controller'));
app.use('/tcf/api/consuntivoController', require('./controllers/consuntivo.controller'));
app.use('/tcf/api/reportisticaController', require('./controllers/reportistica.controller'));

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});