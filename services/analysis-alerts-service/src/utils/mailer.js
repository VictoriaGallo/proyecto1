import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Envía un correo sencillo de alerta.
 * @param {string} toEmail - dirección completa del destinatario
 * @param {string} subject
 * @param {string} text
 */
export async function sendMail(toEmail, subject, text) {
  const mailOptions = {
    from: `"Alerta NovaTech" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject,
    text,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`📧 Correo enviado: ${info.messageId} -> ${toEmail}`);
  return info;
}

/**
 * Helper específico para alertas: si solo tienes patientId, aquí se puede mapear a correo real.
 */
export async function sendAlertEmail(patientId, message) {
  // Ajusta este mapeo según tu modelo (aquí usamos patientId@example.com para pruebas)
  const toEmail = `${patientId}@example.com`;
  return sendMail(toEmail, "🔔 Notificación NovaTech - Alerta", message);
}
