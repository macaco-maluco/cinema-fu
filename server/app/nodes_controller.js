var express = require('express'),
    CinemaInfo = require('./cinema_info');

var controller = express();

controller.get('/', function (req, res) {
  var info = new CinemaInfo();

  info.find(req.query.query).then(function (result) {
    res.send(result);
  });
});

controller.get('/:id', function (req, res) {
  var info = new CinemaInfo();
  info.getConnections(req.params.id).then(function(result) {
    res.send({id: req.params.id, connections: result});
  });
});

module.exports = controller;
