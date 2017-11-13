"use strict";

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var config =  {
  entry: ['./src/index.js'],
  output: {
    filename: 'dist/app.js',
    path: __dirname + '/dist',
    publicPath: '/'
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /.*\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|swf)$/,
        loader: 'file-loader?name=assets/[hash].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html'
    }),
  ]
};

module.exports = config;
