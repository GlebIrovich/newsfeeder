const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: ['babel-polyfill', './src/js/app.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [
          { loader: 'expose-loader', options: 'jQuery' },
          { loader: 'expose-loader', options: '$' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
       {
         test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
         loader: 'url-loader?limit=100000'
       },
       // {
       //   test: /\.(png|svg|jpg|gif)$/,
       //   use: [
       //     'file-loader'
       //   ]
       // },
       // {
       //   test: /\.(woff|woff2|eot|ttf|otf)$/,
       //   use: [
       //     'file-loader'
       //   ]
       // },
       {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
   ]
 },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),

    new HtmlWebpackPlugin({
      title: 'Custom template',
      // Load a custom template (lodash by default see the FAQ for details)
      template: './src/temp.html'
    })
  ]
};
