const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/frontend/index.js',
  mode: process.env.NODE_ENV,
  output: {
    path: isProd ? path.join(process.cwd(), './src/server/public') : '/',
    filename: 'assets/app.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(woff|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          name: 'assets/static/[hash].[ext]',
          limit: 1000,
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ],
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/app.css',
    }),
  ],
};
