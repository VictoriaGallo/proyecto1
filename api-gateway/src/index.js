// src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import gatewayRoutes from "./routes/gatewayRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas propias del gateway
app.use("/", gatewayRoutes);

// ======== PROXIES DE SERVICIOS ========

// Servicio de alertas
app.use(
  "/alerts",
  createProxyMiddleware({
    target: process.env.ALERTS_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/alerts": "" },
  })
);

// Servicio de análisis
app.use(
  "/analysis",
  createProxyMiddleware({
    target: process.env.ANALYSIS_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/analysis": "" },
  })
);

// Servicio de usuarios
app.use(
  "/users",
  createProxyMiddleware({
    target: process.env.USERS_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/users": "" },
  })
);

// Servicio de comunicación
app.use(
  "/communication",
  createProxyMiddleware({
    target: process.env.COMM_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/communication": "" },
  })
);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`✅ Gateway activo en puerto ${port}`));
