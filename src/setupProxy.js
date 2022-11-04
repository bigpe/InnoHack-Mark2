// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
const { createProxyMiddleware } = require('http-proxy-middleware');

const INTERNAL_API = process.env.REACT_APP_FRONTEND_API_URL;

// eslint-disable-next-line func-names
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: INTERNAL_API,
            changeOrigin: true,
        })
    );
};
