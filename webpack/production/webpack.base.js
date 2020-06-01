const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TerserJsPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
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
        new Dotenv({
            path: "./env/prod.env", // load this now instead of the ones in '.env'
            safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            silent: true, // hide any errors
            defaults: false // load '.env.defaults' as the default values if empty.
        }),
        new BrotliPlugin({
            asset: "[path].br[query]",
            test: /\.js$|\.css$|\.html$/
        })
    ]
};
