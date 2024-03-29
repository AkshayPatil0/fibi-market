const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/users",
    createProxyMiddleware({
      target: "http://localhost:4001",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/products",
    createProxyMiddleware({
      target: "http://localhost:4002",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/orders",
    createProxyMiddleware({
      target: "http://localhost:4003",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/blogs",
    createProxyMiddleware({
      target: "http://localhost:4004",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/quizes",
    createProxyMiddleware({
      target: "http://localhost:4005",
      changeOrigin: true,
    })
  );
};
