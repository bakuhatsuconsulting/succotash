const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const html = require('html-webpack-plugin');
const copy = require('copy-webpack-plugin');
const externals = require('webpack-node-externals');
const dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        use: [
        {
          loader: "jshint-loader",
          options: {
            camelcase: false,
            emitErrors: false,
            failOnHint: false
          }
        },
      ]},
      {test: /\.js$/, loader: 'babel-loader'},
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: "json-loader"},
      { test: /\.(png|jpg|gif)$/, loader: 'file-loader'},
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      { test: /\.(eot|ttf|svg)$/, loader: 'file-loader' },
      { test: /\.(scss|sass)?$/, use: [{
             loader: "style-loader" // creates style nodes from JS strings
         }, {
             loader: "css-loader" // translates CSS into CommonJS
         }, {
             loader: "sass-loader" // compiles Sass to CSS
         }]
       }
    ]
  },
  target: 'electron',
  node: {
    global: true,
    fs: true,
  },
  resolve: {
    alias: {
      '~': path.join(__dirname)
    }
  },
  plugins: [
    new html({template: path.join(__dirname, 'src', 'index.html')}),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$")),
    new dotenv()
    // new copy([
    //   {from: path.join(__dirname, 'src', 'assets', 'images', '**', '*'), to: 'assets'},
    //   {from: path.join(__dirname, 'src', 'assets', '**', '*'), to: 'assets'},
    // ])
  ]
}
