var connect = require('connect'),
    assetsMiddleware = require('./assets_middleware'),
    nodesController = require('./nodes_controller');

var app = connect();
app.use(assetsMiddleware);
app.use('/nodes/', nodesController);

module.exports = app;
