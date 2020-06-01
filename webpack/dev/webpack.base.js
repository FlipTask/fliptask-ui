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
            },
            {
                test: /ckeditor5-[^\/\\]+[\/\\].+\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [ require( '@babel/preset-env' ) ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new LoadablePlugin(),
        new CleanWebpackPlugin()
    ],
    externals: ["react-portal-universal"]
};
