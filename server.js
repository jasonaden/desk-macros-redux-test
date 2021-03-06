var express = require('express');
var app = express();
var httpProxy = require('http-proxy');
var config = require('./config.json');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.use(express.static('./'));

app.disable('etag');

var proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  auth: config.username + ':' + config.password
});

proxy.on('error', function (err, req, res) {
  console.log(err);

  res.end('Something went wrong. And we are reporting a custom error message.');
});

app.get('/api/*', function (req, res) {
  proxy.web(req, res, {
    target: config.server
  })
});

app.patch('/api/*', function (req, res) {
  proxy.web(req, res, {
    target: config.server
  });
});

app.delete('/api/*', function (req, res) {
  proxy.web(req, res, {
    target: config.server
  });
});

app.post('/api/*', function (req, res) {
  proxy.web(req, res, {
    target: config.server
  });
});

app.listen(8888, function () {
  console.log('Example app listening on 8888!');
});
