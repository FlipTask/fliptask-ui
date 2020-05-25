import path from "path";
import loadApp from "./bootstrap";

const env = process.env.NODE_ENV === "production" ? "prod.env" : "dev.env";
require("dotenv").config({
    path: path.resolve(__dirname, `../env/${env}`)
});

loadApp();
