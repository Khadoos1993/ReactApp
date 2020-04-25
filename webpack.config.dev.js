const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

//configuring webpack
//webpack doesn't output code in development mode. it serve our app from memory
module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map", //source maps let us see our original code when debugging in the browser
  entry: "./src/index", //default for webpack
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    stats: "minimal", //reduces the info that writes to the command line
    overlay: true, //overlay any error that occur in the browser
    historyApiFallback: true, //all request sent to the index.html this way we can load deep link and handled by react router
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"], //run bable on this files
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
