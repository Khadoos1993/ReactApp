const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackBundlerAnalyzer = require("webpack-bundle-analyzer");

process.env.NODE_ENV = "production";

//configuring webpack
//webpack doesn't output code in development mode. it serve our app from memory
module.exports = {
  mode: "production",
  target: "web",
  devtool: "source-map", //source maps let us see our original code when debugging in the browser
  entry: "./src/index", //default for webpack
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    new webpackBundlerAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }), //webpack automatically display a report of what is in our bundle
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", //webpack pick the name and add # to it and this way filename only change when our css changes
    }),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", //extract in different file
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => {
                require("cssnano"); // minify our css
              },
              sourceMap: true,
            }, //run in bottom -top order
          },
        ],
      },
    ],
  },
};
