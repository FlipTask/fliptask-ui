import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack/dev/webpack.base";


const devServerEnabled = false;

export default (app) => {
    if (devServerEnabled) {
        // reload=true:Enable auto reloading when changing JS files or content
        // timeout=1000:Time from disconnecting from server to reconnecting
        config.entry.app.unshift("webpack-hot-middleware/client?reload=true&timeout=1000");

        // Add HMR plugin
        config.plugins.push(new webpack.HotModuleReplacementPlugin());

        const compiler = webpack(config);

        // Enable "webpack-dev-middleware"
        app.use(webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath
        }));

        // Enable "webpack-hot-middleware"
        app.use(webpackHotMiddleware(compiler));
    }
};
