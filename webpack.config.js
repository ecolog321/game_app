/* eslint-disable prettier/prettier */
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const mode =
  process.env.NODE_ENV === "production" ? "production" : "development"

module.exports = {
  entry: "./game_app/lib/index.js",
  mode,
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  devtool:
    process.env.NODE_ENV === "production" ? "hidden-source-map" : "source-map",
  output: {
    path: path.resolve(__dirname, "./game_app/dist"),
    filename: "bundle.js",
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{ from: "./game_app/cards_images", to: "./static" }],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./game_app/lib/index.html",
    }),
  ],
}
