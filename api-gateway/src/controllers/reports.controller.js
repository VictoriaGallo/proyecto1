import { env } from '../utils/env.js';
export async function postBaseline(req,res,next){
  try{
    const r = await fetch(`${env.AA_URL}/baseline`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(req.body) });
    res.status(r.ok?200:400).json(await r.json());
  }catch(e){ next(e); }
}
export async function postDeviation(req,res,next){
  try{
    const r = await fetch(`${env.AA_URL}/deviation`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(req.body) });
    res.status(r.ok?200:400).json(await r.json());
  }catch(e){ next(e); }
}
