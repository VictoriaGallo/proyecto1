const request = require("supertest");
const express = require("express");

const app = express();
app.get("/alerts/test", (req, res) =>
  res.json({ message: "Servicio de alertas operativo ✅" })
);

describe("Servicio de Alertas", () => {
  test("GET /alerts/test debe responder con 200", async () => {
    const res = await request(app).get("/alerts/test");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
