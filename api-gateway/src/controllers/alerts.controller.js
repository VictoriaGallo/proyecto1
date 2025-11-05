import { env } from '../utils/env.js';
export async function listAlerts(_req,res,next){
  try{
    const r = await fetch(`${env.AA_URL}/alerts`);
    res.status(r.ok?200:400).json(await r.json());
  }catch(e){ next(e); }
}
