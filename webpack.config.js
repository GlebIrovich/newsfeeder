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
         loader: 'file-loader?limit=100000',
         options: {
          name: 'assets/[name].[ext]'
        }
       },
      //  {
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // }
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
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),

    new MiniCssExtractPlugin({
      // both options are optional
      filename: "newsfeeder.min.css",
      chunkFilename: "[id].css"
    }),

    new HtmlWebpackPlugin({
      title: 'Custom template',
      // Load a custom template (lodash by default see the FAQ for details)
      template: './src/temp.html'
    }),

    new CopyWebpackPlugin([
    { from: 'src/js/newsfeeder.config.js', to: 'newsfeeder.config.js' }
    ])
  ]
};
