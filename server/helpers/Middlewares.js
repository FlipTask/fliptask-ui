import proxy from "express-http-proxy";

const compression = require("compression");

const shouldCompress = (req, res) => {
    if (req.headers["x-no-compression"]) return false;
    return compression.filter(req, res);
};

export const useProxy = proxy(`${process.env.API_URL}`, {
    proxyReqPathResolver(req) {
        return `${process.env.API_URL}${req.originalUrl}`;
    },
    proxyReqOptDecorator(opts) {
        opts.headers["x-forwarded-host"] = process.env.HOST_URL;
        return opts;
    }
});

export const useCompression = compression({
    enableBrotli: true,
    level: 6, // set compression level from 1 to 9 (6 by default)
    filter: shouldCompress // set predicate to determine whether to compress
});
