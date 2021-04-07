var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var InterpolateHtmlPlugin = require("interpolate-html-plugin");

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(png|jpg|gif|svg)$/, use: "url-loader" },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: "asset/resource" },
    ],
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "",
    }),
  ],
  devServer: {
    // public: '/',
    host: "0.0.0.0",
    contentBase: "./public",
    // hot: true,
    historyApiFallback: true,
    proxy: {
      "/api/users": {
        target: "http://localhost:4001",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        bypass: function (req, res, proxyOptions) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
          res.header("Access-Control-Allow-Headers", "Content-Type");
          res.header("Cache-Control", "no-store");
        },
      },
      "/api/products": {
        target: "http://localhost:4002",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        bypass: function (req, res, proxyOptions) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
          res.header("Access-Control-Allow-Headers", "Content-Type");
        },
      },
      "/api/orders": {
        target: "http://localhost:4003",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        bypass: function (req, res, proxyOptions) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
          res.header("Access-Control-Allow-Headers", "Content-Type");
        },
      },
    },
  },
};
