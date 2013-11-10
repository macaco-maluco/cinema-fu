var connect = require('connect'),
    assetsMiddleware = require('./assets_middleware');

var app = connect();
app.use(assetsMiddleware);

module.exports = app;
