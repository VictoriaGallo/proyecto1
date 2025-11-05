import { Router } from 'express';
import nlp from './nlp.routes.js';
import reports from './reports.routes.js';
import photos from './photos.routes.js';
import annotations from './annotations.routes.js';
import sessions from './sessions.routes.js';
import alerts from './alerts.routes.js';

const router = Router();
router.use('/nlp', nlp);
router.use('/reports', reports);
router.use('/photos', photos);
router.use('/annotations', annotations);
router.use('/sessions', sessions);
router.use('/alerts', alerts);

export default router;
