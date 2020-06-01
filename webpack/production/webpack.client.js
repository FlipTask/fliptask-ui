const path = require("path");
const merge = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const {styles} = require("@ckeditor/ckeditor5-dev-utils");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin");
const baseConfig = require("./webpack.base");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const config = {

    // Tell webpack the root file of our server Application
    target: "web",
    devServer: {
        contentBase: path.join(__dirname, 'client-build'),
        port: 8080,
        host: `localhost`
    },
    entry: path.resolve(__dirname, "../../client/index.js"),
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    caller: {
                        name: "web"
                    }
                }
            }, {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", {
                        loader: "postcss-loader",
                        options: {
                            // parser: "sugarss", exec: true, config: {     path: __dirname }
                        }
                    },
                    "sass-loader"
                ]
            }, {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                use: ["raw-loader"]
            }, {
                test: /\.css$/,
                exclude: [/\.module\.css$/, /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/]
            }, {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            injectType: "singletonStyleTag",
                            attributes: {
                                "data-cke": true
                            }
                        }
                    }, {
                        loader: "postcss-loader",
                        options: styles.getPostCssConfig({
                            themeImporter: {
                                themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
                            },
                            minify: true
                        })
                    }
                ]
            }
        ]
    },
    stats: {
        colors: false,
        hash: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true
    },
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true
                    }
                }
            }),
            new TerserPlugin({
                // Use multi-process parallel running to improve the build speed Default number
                // of concurrent runs: os.cpus().length - 1
                parallel: true,
                // Enable file caching
                cache: true,
                sourceMap: true
            })
        ],
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor_app",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    // Tell webpack where to put the output file that is generated

    output: {
        publicPath: "/static/",
        filename: "[name].bundle.js",
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, "../../client-build")
    },
    plugins: [
        // extractSass,
        new CleanWebpackPlugin(),
        new CKEditorWebpackPlugin({language: "en"}),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false
        })
    ]
};

// console.log(JSON.stringify(merge.smart(config,baseConfig)));
module.exports = merge.smart(baseConfig, config);
