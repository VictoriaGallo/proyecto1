// api-gateway/src/routes/nlp.routes.js
import { Router } from 'express';
import { postScore } from '../controllers/nlp.controller.js';
const r = Router(); r.post('/score', postScore); export default r;

// api-gateway/src/routes/reports.routes.js
import { Router } from 'express';
import { postBaseline, postDeviation } from '../controllers/reports.controller.js';
const r = Router(); r.post('/baseline', postBaseline); r.post('/deviation', postDeviation); export default r;

// api-gateway/src/routes/photos.routes.js
import { Router } from 'express';
import { postPhoto } from '../controllers/photos.controller.js';
const r = Router(); r.post('/', postPhoto); export default r;

// api-gateway/src/routes/annotations.routes.js
import { Router } from 'express';
import { postAnnotation } from '../controllers/annotations.controller.js';
const r = Router(); r.post('/', postAnnotation); export default r;

// api-gateway/src/routes/sessions.routes.js
import { Router } from 'express';
import { postSession, listSessions } from '../controllers/sessions.controller.js';
const r = Router(); r.post('/', postSession); r.get('/', listSessions); export default r;

// api-gateway/src/routes/alerts.routes.js
import { Router } from 'express';
import { listAlerts } from '../controllers/alerts.controller.js';
const r = Router(); r.get('/', listAlerts); export default r;
