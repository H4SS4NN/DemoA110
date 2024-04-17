const path = require("path");

module.exports = {
  mode: "production",
  entry: "./server.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.cs$/,
        use: "raw-loader",
      },
    ],
  },
  target: "node",
};
