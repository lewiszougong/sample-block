const webpack = require("webpack");
const PACKAGE = require("./package.json");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = function (env, argv) {
  return {
    devtool: "cheap-source-map",
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.(jpe?g|png|gif)$/i, //to support eg. background-image property
          loader: "file-loader",
          query: {
            name: "[name].[ext]",
            outputPath: "images/",
            //the images will be emmited to public/assets/images/ folder
            //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png);
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, //to support @font-face rule
          loader: "url-loader",
          query: {
            limit: "10000",
            name: "[name].[ext]",
            outputPath: "fonts/",
            //the fonts will be emmited to public/assets/fonts/ folder
            //the fonts will be put in the DOM <style> tag as eg. @font-face{ src:url(assets/fonts/font.ttf); }
          },
        },
        {
          test: /\.css$/,
          loaders: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        {
          // you may want to bundle SLDS SASS files with webpack,
          // we'll keep things simple for this example and just copy SLDS into dist
          from: path.resolve(
            __dirname,
            "./node_modules/@salesforce-ux/design-system/assets"
          ),
          to: path.resolve(__dirname, "dist/design-system"),
        },
        {
          // you may want to bundle SLDS SASS files with webpack,
          // we'll keep things simple for this example and just copy SLDS into dist
          from: path.resolve(__dirname, "./images"),
          to: path.resolve(__dirname, "dist"),
        },
      ]),
      new webpack.BannerPlugin(
        `${PACKAGE.author} - ${PACKAGE.description} - content-block`
      ),
    ],
  };
};
