import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { initFirebase } from "./src/utils/realtime.js";
import { processPendingAlertsPeriodically } from "./src/work/scheduler.js";
import { alertRoutes } from "./src/routes/alerts.js";

const app = express();
app.use(express.json());

// Inicializa Firebase
try {
  await initFirebase({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
  console.log("✅ Firebase inicializado correctamente");
} catch (error) {
  console.error("❌ Error al inicializar Firebase:", error);
  process.exit(1);
}

// Rutas REST
app.use("/alerts", alertRoutes);

// Ruta principal de prueba
app.get("/", (req, res) => {
  res.send("🚀 NovaTech Alerts Service activo y funcionando con Express.js");
});

// Puerto
const port = process.env.PORT || 4103;
app.listen(port, () => console.log(`✅ Alerts-service activo en puerto ${port}`));

// Inicia el job periódico
processPendingAlertsPeriodically();
