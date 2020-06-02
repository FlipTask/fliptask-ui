const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const path = require("path");

module.exports = {
    // Tell webpack to run babel on every file it runs through
    mode: "development",
    devtool: "eval",
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new LoadablePlugin(),
        new CleanWebpackPlugin()
    ]
};
