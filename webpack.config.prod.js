const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js']
  },
  entry: [
    'babel-polyfill',
    './src/client'
  ],
  output: {
    path: path.resolve('./public/js'),
    publicPath: '/public/js/',
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      '__CLIENT__': 'true',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
