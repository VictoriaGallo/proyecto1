// src/controllers/gatewayController.js
import axios from "axios";

/**
 * Verifica el estado de un microservicio realizando una petición GET.
 */
const checkServiceStatus = async (url) => {
  try {
    const response = await axios.get(url);
    return response.status === 200 ? "🟢 Activo" : "🟡 Responde con error";
  } catch (error) {
    return "🔴 Inaccesible";
  }
};

/**
 * Controlador principal del Gateway: retorna el estado general.
 */
export const getStatus = async (req, res) => {
  const services = {
    alerts: process.env.ALERTS_SERVICE,
    analysis: process.env.ANALYSIS_SERVICE,
    users: process.env.USERS_SERVICE,
    communication: process.env.COMM_SERVICE,
  };

  // Verificar el estado de cada servicio
  const statuses = {};
  for (const [name, url] of Object.entries(services)) {
    statuses[name] = {
      url,
      status: await checkServiceStatus(url),
    };
  }

  res.json({
    message: "🚀 API Gateway de NovaTech operativo",
    timestamp: new Date().toISOString(),
    services: statuses,
  });
};
