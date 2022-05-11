const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build';

function setDMode() {
  if (isProd) {
    return 'production';
  } else {
    return 'development';
  }
}
module.exports = {
  mode: setDMode(),
  devtool: "source-map",
  entry: {
    main: path.resolve(__dirname, './src/js/index.js'),
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  // target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset',
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            url: false,
          },
        }, 'sass-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/asset', to: './' },
        // { from: './src/img', to: './img/' },
        // {from: './src/audio', to: './'},
        // {from: './src/audio', to: './audio/'},
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, './src'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 9000,
  },
}
