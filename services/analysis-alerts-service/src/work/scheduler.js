// src/work/scheduler.js
import { getDB } from "../utils/realtime.js";
import { sendAlertEmail } from "../utils/mailer.js";

export function processPendingAlertsPeriodically() {
  const intervalMs = Number(process.env.ALERTS_INTERVAL_MS) || 60000;
  console.log(`⏱️ Scheduler iniciado. Intervalo = ${intervalMs} ms`);

  setInterval(async () => {
    try {
      const db = getDB();
      const snapshot = await db.ref("alerts").get();
      const alerts = snapshot.val() || {};

      for (const [key, alert] of Object.entries(alerts)) {
        if (alert.status === "pending") {
          console.log(`Procesando alerta ${key} (${alert.channel})`);

          if (alert.channel === "email") {
            try {
              await sendAlertEmail(alert.patientId, alert.message);
              await db.ref(`alerts/${key}`).update({
                status: "sent",
                sentAt: new Date().toISOString(),
              });
              console.log(`✅ Alerta enviada -> ${alert.patientId}`);
            } catch (err) {
              console.error(`❌ Error enviando email:`, err);
              await db.ref(`alerts/${key}`).update({
                status: "error",
                error: String(err),
                lastAttempt: new Date().toISOString(),
              });
            }
          } else {
            await db.ref(`alerts/${key}`).update({
              status: "sent",
              sentAt: new Date().toISOString(),
            });
          }
        }
      }
    } catch (err) {
      console.error("❌ Error en scheduler:", err);
    }
  }, intervalMs);
}
