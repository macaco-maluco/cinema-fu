var connect = require('connect'),
    sass = require('node-sass');

var app = connect();

app.use(sass.middleware({
  src: __dirname + '/../../client',
  includePaths: [__dirname + '/../../client/src', __dirname + '/../../client/vendor/css'],
  dest: __dirname + '/../public',
  force: true
}));

var staticPaths = [
  __dirname + '/../../client',
  __dirname + '/../../client/vendor/css',
  __dirname + '/../public'
];

staticPaths.forEach(function (path) {
  app.use(connect.static(path));
});

app.use('/font', connect.static(__dirname + '/../../client/vendor/font'));

module.exports = app;
