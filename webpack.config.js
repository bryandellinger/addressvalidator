const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
    },
    devtool: 'inline-source-map',
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
     new CleanWebpackPlugin(['dist']), 
     new HtmlWebpackPlugin({
       title: 'Address Validation'
     })
   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
     module: {
             rules: [
              { test: /\.handlebars$/,
                loader: "handlebars-loader"
             },
               {
                 test: /\.css$/,
                 use: [
                   'style-loader',
                   'css-loader'
                 ]
               }
             ]
           }
  };