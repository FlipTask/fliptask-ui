import proxy from "express-http-proxy";
import Cookies from "universal-cookie";

const compression = require("compression");

const shouldCompress = (req, res) => {
    if (req.headers["x-no-compression"]) { return false; }
    return compression.filter(req, res);
};

export const useProxy = proxy(`${process.env.API_URL}`, {
    proxyReqOptDecorator(opts, req) {
        console.log(`${process.env.API_URL} ${req.method} ${req.originalUrl}`);
        const cookies = new Cookies(req.headers.cookie);
        opts.headers["x-forwarded-host"] = process.env.HOST_URL;
        opts.headers.Authorization = `Bearer ${cookies.get("token") || ""}`;
        return opts;
    },
    proxyReqBodyDecorator(bodyContent, srcReq) {
        const cookies = new Cookies(srcReq.headers.cookie);
        bodyContent.organisationId = cookies.get("active-org");
        return bodyContent;
    }
});

export const useCompression = compression({
    enableBrotli: true,
    level: 6, // set compression level from 1 to 9 (6 by default)
    filter: shouldCompress // set predicate to determine whether to compress
});
