var path = require('path');
var webpack = require('webpack');
var WriteFilePlugin = require ('write-file-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/app'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    publicPath: '/static',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
