import Alert from "../models/Alert.js";
import { saveAlert, getAlertsForUser, notifyClient } from "../utils/realtime.js";
import { sendEmail } from "../utils/email.js";

export const createAlert = async ({ userId, type, message, channel = "both", meta = {} }) => {
  if (!userId || !type || !message) {
    return { status: 400, body: { success: false, error: "Campos requeridos: userId, type, message" } };
  }

  const alert = new Alert({ userId, type, message, channel, meta });

  try {
    await saveAlert(alert);

    if (channel === "email" || channel === "both") await sendEmail(userId, message, meta);
    if (channel === "in-app" || channel === "both") await notifyClient(userId, alert);

    return { status: 201, body: { success: true, alert } };
  } catch (err) {
    console.error("Error al crear alerta:", err);
    return { status: 500, body: { success: false, error: err.message } };
  }
};

export const listAlertsForUser = async (userId) => {
  try {
    const alerts = await getAlertsForUser(userId);
    return { status: 200, body: { success: true, alerts } };
  } catch (err) {
    return { status: 500, body: { success: false, error: err.message } };
  }
};
