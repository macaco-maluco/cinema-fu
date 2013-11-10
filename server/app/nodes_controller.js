var express = require('express'),
    CinemaInfo = require('./cinema_info');

var controller = express();

controller.get('/', function (req, res) {
  var info = new CinemaInfo();

  info.find(req.query.search).then(function (result) {
    res.send(result);
  });
});

module.exports = controller;
