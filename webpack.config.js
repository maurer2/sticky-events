const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    sticky: './src/sticky/index.js',
    intersection: './src/intersection/index.js',
  },
  output: {
    filename: '[name]/script.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // Babel
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
          },
        },
      },
      // SCSS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS
          // 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
    extensions: ['*', '.js', '.ts', '.css'],
  },
  plugins: [
    // Sticky
    new HtmlWebpackPlugin({
      filename: 'sticky/index.html',
      chunks: ['sticky'],
      template: 'src/sticky/index.html',
      hash: true,
    }),
    // Intersection
    new HtmlWebpackPlugin({
      filename: 'intersection/index.html',
      chunks: ['intersection'],
      template: 'src/intersection/index.html',
      hash: true,
    }),
    // Create separate CSS files
    new MiniCssExtractPlugin({
      filename: '[name]/style.css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
    watchContentBase: true,
    hot: true,
    inline: true,
  },
};
