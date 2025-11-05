export function errorHandler(err, _req, res, _next){
  console.error('[gateway error]', err);
  res.status(err.status || 500).json({ error: err.code || 'internal_error', message: err.message || 'Unexpected error' });
}
