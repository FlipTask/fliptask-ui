import React from "react";
import path from "path";
import { renderToNodeStream } from "react-dom/server";
import { ChunkExtractor } from "@loadable/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import getHTML from "./HTML";
import App from "../../client/App";

const webStats = path.resolve(__dirname, "./../client-build/loadable-stats.json");

export default (req, store, context) => new Promise((resolve) => {
    const InitialComponent = (
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );
    const webExtractor = new ChunkExtractor({ statsFile: webStats });

    const JSX = webExtractor.collectChunks(InitialComponent);
    // const html = renderToString(JSX);
    const htmlChunks = renderToNodeStream(JSX);
    const chunks = [];
    htmlChunks.on("data", (chunk) => {
        chunks.push(chunk.toString());
    });
    htmlChunks.on("end", () => {
        const htmlTemplate = getHTML({
            store: store.getState(),
            styleTags: webExtractor.getStyleTags(),
            linkTags: webExtractor.getLinkTags(),
            scriptTags: webExtractor.getScriptTags(),
            html: chunks.join("")
        });
        resolve(htmlTemplate);
    });
    htmlChunks.on("error", () => {
        const htmlTemplate = getHTML({
            store: store.getState(),
            styleTags: webExtractor.getStyleTags(),
            linkTags: webExtractor.getLinkTags(),
            scriptTags: webExtractor.getScriptTags(),
            html: chunks.join("")
        });
        resolve(htmlTemplate);
    });
}).catch((err) => {
    console.log("------------ERROR IN RENDERER------------------", err);
    return getHTML({
        store: "",
        styleTags: "",
        linkTags: "",
        scriptTags: "",
        html: ""
    });
});
