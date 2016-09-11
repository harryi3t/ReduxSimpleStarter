'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var isLocal = process.argv[2] === '--dev';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: isLocal,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});
