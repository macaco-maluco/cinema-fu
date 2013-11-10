var express = require('express'),
    CinemaInfo = require('./cinema_info'),
    Node = require('./node');

var controller = express();

controller.get('/', function (req, res) {
  var info = new CinemaInfo();

  info.find(req.query.query).then(function (result) {
    res.send(result);
  });
});

controller.get('/:id', function (req, res) {
  Node.findOrFetch(req.params.id).then(function(result) {
    res.send(result);
  }, function (error) {
    res.send(arguments.length);
  });
});

module.exports = controller;
