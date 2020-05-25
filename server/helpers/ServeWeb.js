import { matchRoutes } from "react-router-config";
import { matchPath } from "react-router-dom";
import Renderer from "./Renderer";
import Routes from "../../client/Routes";
import CreateStore from "./CreateStore";
// (store, route, req.path, req.query, req.params)
export default (req, res) => {
    const store = CreateStore(req);
    const promises = matchRoutes(Routes, req.path).map(({
        route
    // eslint-disable-next-line array-callback-return
    }) => (route.loadData ? route.loadData(store, matchPath(req.path, route), req.path, req.query, req.params) : null)).map((promise) => {
        if (promise) {
            return new Promise((resolve) => {
                Promise.all(promise).then((value) => {
                    resolve(value);
                });
            });
        }
    });

    Promise
        .all(promises)
        .then(() => {
            const context = {};
            // console.log("content");
            Renderer(req, store, context).then((content) => {
                // console.log("content --->",content)
                if (context.url) {
                    return res.redirect(301, context.url);
                }

                if (context.notFound) {
                    res.status(404);
                }

                res.send(content);
            }).catch((err) => {
                // console.log(err);
                res.send(err);
            });
        })
        .catch((err) => {
            // console.log(err);
            console.log("Something went wrong", err);
            res.send("Something went wrong");
        });
};
