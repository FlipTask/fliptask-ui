import { matchRoutes } from "react-router-config";
import Renderer from "./Renderer";
import Routes from "../../client/Routes";
import CreateStore from "./CreateStore";
// (store, route, req.path, req.query, req.params)
export default (req, res) => {
    const store = CreateStore(req);
    const promises = matchRoutes(Routes, req.path).filter((routes) => routes.route.loadData).map((routes) => new Promise((resolve) => {
        resolve(routes.route.loadData(store, routes.route, req.path, req.query, req.params));
    }).catch((err) => {
        console.log("[ERROR]", err);
    }));

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
