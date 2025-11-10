const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

const users = [];

// Simula registro
app.post("/auth/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Campos incompletos" });

  const hashed = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashed });
  res.status(201).json({ message: "Usuario registrado ✅" });
});

// Simula login
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ error: "Credenciales inválidas" });

  const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });
  res.json({ token });
});

// Verificación de token
app.get("/auth/verify", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Token faltante" });

  try {
    const token = auth.split(" ")[1];
    jwt.verify(token, "secret");
    res.json({ message: "Token válido ✅" });
  } catch (err) {
    res.status(403).json({ error: "Token inválido" });
  }
});

describe("Auth Service", () => {
  test("POST /auth/register debe registrar usuario", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ username: "santiago", password: "12345" });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Usuario registrado ✅");
  });

  test("POST /auth/login debe devolver token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "santiago", password: "12345" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("GET /auth/verify debe validar token", async () => {
    const login = await request(app)
      .post("/auth/login")
      .send({ username: "santiago", password: "12345" });

    const token = login.body.token;
    const res = await request(app)
      .get("/auth/verify")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Token válido ✅");
  });
});
