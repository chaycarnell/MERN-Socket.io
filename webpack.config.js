require('dotenv').config();
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => ({
  entry: ['./src/client/src/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: './public/favicon.png' }] }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: path.resolve(__dirname, 'public'),
    port: 8080,
    proxy: {
      '/api': {
        target: `${process.env.SERVER_URL}:${process.env.PORT}`,
      },
    },
  },
});
