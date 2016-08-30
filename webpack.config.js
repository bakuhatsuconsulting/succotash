var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

module.exports = {
    entry: {
    app: ['webpack/hot/dev-server', './entry.jsx'],
  },
  output: {
    path: './built',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/built/'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './',
    publicPath: 'http://localhost:8080/built/',
    
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: "json-loader"}
    ]
  },
  node: {
    global: true,
    fs: fs
  },
  target: 'electron',
  resolve: {
    root: path.join(__dirname),
    fallback: path.join(__dirname, 'node_modules'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.js', '.jsx', '.scss', '.png', '.jpg', '.jpeg', '.gif']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))
  ]
}