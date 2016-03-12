var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = module.exports = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Servidor ON em http://%s:%s", host, port);
});

app.use(express.static(path.join(__dirname, '../')));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());