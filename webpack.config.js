'use strict';

var path = require('path');
var webpack = require('webpack');
var WriteFilePlugin = require ('write-file-webpack-plugin');
var isLocal = process.argv[2] === '--dev';

var moduleLoaders = ['babel'];
var moduleEntry = ['./src/app'];
var modulePlugins = [];

if (isLocal) {
  moduleLoaders.unshift('react-hot');
  moduleEntry.unshift('webpack/hot/only-dev-server');
  moduleEntry.unshift('webpack-dev-server/client?http://localhost:3000');
  modulePlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin({
      test: /bundle.js$/,
    })
  ];
}

module.exports = {
  entry: moduleEntry,
  output: {
    path: path.join(__dirname, 'static'),
    publicPath: '/static',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loaders: moduleLoaders,
      include: path.join(__dirname, 'src')
    }]
  },
  plugins: modulePlugins,
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
