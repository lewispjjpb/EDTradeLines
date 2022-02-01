const webpack = require('webpack');
const path = require('path');

const config = {
  entry: path.join(__dirname, './client/src/app.jsx'),
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-react', '@babel/preset-env'],
          // },
        },
        exclude: /node_modules/
      }
    ]
  },


};

module.exports = config;