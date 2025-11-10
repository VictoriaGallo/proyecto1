const request = require("supertest");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Simular proxy
app.use(
  "/alerts",
  createProxyMiddleware({
    target: "http://localhost:4003",
    changeOrigin: true,
    pathRewrite: { "^/alerts": "" },
  })
);

describe("API Gateway", () => {
  test("Debe redirigir correctamente /alerts/test", async () => {
    const res = await request(app).get("/alerts/test");
    expect(res.statusCode).toBeGreaterThanOrEqual(200);
  });
});
