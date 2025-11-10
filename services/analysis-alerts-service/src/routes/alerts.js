// src/routes/alerts.js
import express from "express";
import { getDB } from "../utils/realtime.js";

export const alertRoutes = express.Router();

// Obtener todas las alertas
alertRoutes.get("/", async (req, res) => {
  try {
    const db = getDB();
    const snapshot = await db.ref("alerts").get();
    res.json(snapshot.val() || {});
  } catch (error) {
    res.status(500).json({ error: "Error al obtener alertas", details: error.message });
  }
});

// Crear una nueva alerta
alertRoutes.post("/create", async (req, res) => {
  try {
    const { patientId, type, message, level, channel } = req.body;
    if (!patientId || !type || !message || !level || !channel) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const db = getDB();
    const alertRef = db.ref("alerts").push();
    const payload = {
      patientId,
      type,
      message,
      level,
      channel,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    await alertRef.set(payload);
    res.json({ success: true, id: alertRef.key, alert: payload });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la alerta", details: error.message });
  }
});
