const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/app.ts',
  devtool: 'inline-source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/accets", to: "accets" },
        { from: "./src/sound", to: "sound" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
          test: /\.png$/,
          loader: 'file-loader',
          options: {
              name: './accets/[name].[ext]',
          }
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
            name: './sound/[name].[ext]',
        }
    }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};