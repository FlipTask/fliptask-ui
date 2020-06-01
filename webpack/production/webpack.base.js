const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TerserJsPlugin = require("terser-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
module.exports = {
    // Tell webpack to run babel on every file it runs through
    devtool: "source-map",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["es2015", "react", "stage-2"]
                }
            }
        ]
    },
    plugins: [
        new LoadablePlugin(),
        new CleanWebpackPlugin(),
        new BrotliPlugin({
            asset: "[path].br[query]",
            test: /\.js$|\.css$|\.html$/
        })
    ]
};
