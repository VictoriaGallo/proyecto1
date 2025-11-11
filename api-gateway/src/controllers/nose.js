// api-gateway/src/controllers/nose.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import routes from '../routes/index.js';
import { authOptional } from '../middlewares/auth.js';
import { errorHandler } from '../middlewares/error.js';

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

// Healthcheck
app.get('/health', (_req, res) => res.json({ ok: true, service: 'api-gateway' }));

// Rutas de la API (con auth opcional; cambia a authRequired si quieres forzar token)
app.use('/api', authOptional, routes);

// Manejo de errores centralizado
app.use(errorHandler);

// Arranque del servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`[gateway] up on ${PORT}`);
});
