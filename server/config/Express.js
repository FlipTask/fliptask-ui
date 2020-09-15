import express from "express";
import Path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ServeWeb from "../helpers/ServeWeb";
import { useCompression, useProxy } from "../helpers/Middlewares";
import DevServer from "../helpers/DevServer";

const init = async() => {
    const app = express();

    app.use(express.static(Path.resolve(__dirname, "./../public")));
    // app.use("/assets/", express.static(Path.resolve(__dirname, "./../public/assets")));
    app.use("/static", express.static(Path.resolve(__dirname, "./../client-build")));

    app.use(bodyParser.json({}));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(useCompression);
    DevServer(app);
    app.use("/api", useProxy);
    app.get("*.js", (req, res, next) => {
        req.url += ".gz";
        res.set("Content-Encoding", "gzip");
        res.set("Content-Type", "text/javascript");
        next();
    });
    app.get(/\/((?!assets|static).)*/, ServeWeb);
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`App listening to ${PORT}....`);
        console.log("Press Ctrl+C to quit.");
    });
};

export default init;