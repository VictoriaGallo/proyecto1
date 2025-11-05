import { env } from '../utils/env.js';
export async function postScore(req, res, next){
  try{
    const r = await fetch(`${env.NLP_URL}/score`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(req.body) });
    const data = await r.json();
    res.status(r.ok?200:400).json(data);
  }catch(e){ next(e); }
}
