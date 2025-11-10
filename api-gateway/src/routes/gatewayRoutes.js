// src/routes/gatewayRoutes.js
import express from "express";
import { getStatus } from "../controllers/gatewayController.js";

const router = express.Router();

/**
 * Ruta: GET /status
 * Descripción: Devuelve el estado del API Gateway y los servicios conectados.
 */
router.get("/status", getStatus);

export default router;
