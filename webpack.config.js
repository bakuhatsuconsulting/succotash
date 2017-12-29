const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const html = require('html-webpack-plugin');
const copy = require('copy-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: '#source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader'},
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: "json-loader"},
      { test: /\.(png|jpg|gif)$/, loader: 'file-loader', options: {name: '[path][name].[ext]'}},
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' , options: {name: '[path][name].[ext]'}},
      { test: /\.(eot|ttf|svg)$/, loader: 'file-loader', options: {name: '[path][name].[ext]'} }
    ]
  },
  node: {
    global: true,
    fs: true
  },
  target: 'electron',
  resolve: {
    alias: {
      '~': path.join(__dirname)
    }
  },
  plugins: [
    new html({template: path.join(__dirname, 'src', 'index.html')}),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$")),
    new copy([
      {from: path.join(__dirname, 'images'), to: path.join(__dirname, 'dist')},
      {from: path.join(__dirname, 'fonts'), to: path.join(__dirname, 'dist')}
    ])
  ]
}
