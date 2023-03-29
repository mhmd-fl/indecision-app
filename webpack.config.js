// const path = require('path');

// module.exports = {
//   entry: './src/app.js',
//   output: {
//     path: path.join(__dirname, 'public'),
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [{
//       loader: 'babel-loader',
//       test: /\.js$/,
//       exclude: /node_modules/
//     }, {
//       test: /\.s?css$/,
//       use: [
//         'style-loader',
//         'css-loader',
//         'sass-loader'
//       ]
//     }]
//   },
//   devtool: 'cheap-module-eval-source-map',
//   devServer: {
//     contentBase: path.join(__dirname, 'public')
//   }
// };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
