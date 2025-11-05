import jwt from 'jsonwebtoken';
export function authOptional(req, _res, next) {
  const hdr = req.headers.authorization;
  if (!hdr) return next();
  try {
    const tok = hdr.replace(/^Bearer\s+/i, '');
    req.user = jwt.decode(tok) || null; 
  } catch {}
  next();
}
