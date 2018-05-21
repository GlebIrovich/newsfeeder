const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
  entry: ['babel-polyfill', './src/js/app.js'],
  output: {
    filename: 'newsfeeder.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
       {
         test: /\.(jpg|png|woff|woff2|eot|ttf|svg|gif)$/,
         loader: 'file-loader?limit=100000',
         options: {
          name: 'assets/[name].[ext]'
        }
       },
   ]
  },
   optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),

    new MiniCssExtractPlugin({
      filename: "newsfeeder.min.css",
      chunkFilename: "[id].css"
    }),

    new HtmlWebpackPlugin({
      title: 'Custom template',
      // Load a custom template
      template: './src/temp.html'
    }),

    new CopyWebpackPlugin([
    { from: 'src/js/newsfeeder.config.js', to: 'newsfeeder.config.js' },
    { from: 'src/js/jquery-3.3.1.min.js', to: 'jquery-3.3.1.min.js' }
    ])
  ]
};
