const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const { exec } = require('child_process');

const mode = process.env.NODE_ENV || "production";
const isProduction = mode === "production";
const manifestFile = isProduction
  ? "src/manifest.json"
  : "server/manifest.dev.json";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: {
    content: "./src/content/content.ts",
    popup: "./src/popup/popup.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/dist/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/images/icon16.png", to: "images/icon16.png" },
        { from: "src/images/icon48.png", to: "images/icon48.png" },
        { from: "src/images/icon128.png", to: "images/icon128.png" },
        {
          from: "src/images/playwright-logo.svg",
          to: "images/playwright-logo.svg",
        },
        { from: "src/popup/popup.html", to: "popup.html" },
        { from: "src/popup/styles.css", to: "styles.css" },
        { from: manifestFile, to: "manifest.json" },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, 'dist'),
  //   },
  //   compress: true,
  //   port: 3000,
  //   hot: true,
  //   watchFiles: ['src/**/*'],
  //   liveReload: false, // Disable live reloading
  //   onAfterSetupMiddleware: function (server) {
  //     // Automatically run Playwright script after Webpack builds
  //     server.compiler.hooks.done.tap('PlaywrightReloadPlugin', () => {
  //       exec('node reload-extension.js', (error, stdout, stderr) => {
  //         if (error) {
  //           console.error(`Error executing Playwright script: ${error}`);
  //           return;
  //         }
  //         console.log(`Playwright script output: ${stdout}`);
  //         if (stderr) {
  //           console.error(`Playwright script error output: ${stderr}`);
  //         }
  //       });
  //     });
  //   },
  // }
};
