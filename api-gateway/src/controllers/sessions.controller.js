import { env } from '../utils/env.js';
export async function postSession(req,res,next){
  try{
    const r = await fetch(`${env.USER_URL}/sessions`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(req.body) });
    res.status(r.ok?200:400).json(await r.json());
  }catch(e){ next(e); }
}
export async function listSessions(_req,res,next){
  try{
    const r = await fetch(`${env.USER_URL}/sessions`);
    res.status(r.ok?200:400).json(await r.json());
  }catch(e){ next(e); }
}
