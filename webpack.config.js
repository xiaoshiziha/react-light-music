const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./app/index.js",
  devServer: {
    contentBase: "./app",
    open : true,
    hot: true
  },
  output: {
    path: path.resolve(__dirname,"build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react']
        }
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader' 
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]

};