const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

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
    path: path.resolve('./public/dist/'),
    publicPath: '/public/dist/',
    filename: 'bundle.min.js'
  },
  plugins: [
    new ExtractTextPlugin('[name].min.css', {
      allChunks: true
    }),
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
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
      }
    ]
  },
  postcss: function () {
    return [autoprefixer]
  }
}
