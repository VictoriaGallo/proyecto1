import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.js';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.get('/health', (_req,res)=>res.json({ ok:true, service:'api-gateway' }));
app.use('/api', routes);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`[gateway] up on ${PORT}`));
