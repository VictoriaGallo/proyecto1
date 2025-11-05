import { env } from '../utils/env.js';
export async function postAnnotation(req,res,next){
  try{
    const r = await fetch(`${env.USER_URL}/annotations`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(req.body) });
    res.status(r.ok?200:400).json(await r.json());
  }catch(e){ next(e); }
}
