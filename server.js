const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3333 : process.env.PORT;
const app = express();

const cases = [
    {
      "id": 1,
      "name": "test"
    },
    {
      "id": 2,
      "name": "test"
    },
    {
      "id": 3,
      "name": "test"
    },
    {
      "id": 4,
      "name": "test"
    },
    {
      "id": 5,
      "name": "test"
    },
    {
      "id": 6,
      "name": "test"
    },
    {
      "id": 7,
      "name": "test"
    },
    {
      "id": 8,
      "name": "test"
    }
  ];

const webpackFile = isDeveloping ? './webpack/webpack.dev.js' : './webpack/webpack.build.js';
const config = require(webpackFile);
 
if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  /*app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'src/index.html')));
    res.end();
  });*/
} else {
  //app.use(express.static(__dirname + '/src'));
  /*app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'src/index.html'));
  });*/
}


app.get('/cases', function(req, res) {
  var action = Math.ceil(Math.random()*10);
  var count = Math.floor(Math.random()*10);
  if(action == 4) {
    res.sendStatus(500);
  } else if(action == 5 || action == 6) {
    setTimeout(function () {
      if (action == 5) {
        res.sendStatus(500);
      } else {
        res.json(cases.slice(count));
      }
    }, 3000)
  } else {
    res.json(cases.slice(count));
  }
});



app.listen(port, function () {
  console.log('Example app listening on port '+port+'!');
});
