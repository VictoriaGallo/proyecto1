// src/utils/realtime.js
import { initializeApp, cert } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

let db;

export async function initFirebase(config) {
  const { projectId, clientEmail, privateKey, databaseURL } = config;

  if (!projectId) throw new Error("FIREBASE_PROJECT_ID no definido");
  if (!clientEmail) throw new Error("FIREBASE_CLIENT_EMAIL no definido");
  if (!privateKey) throw new Error("FIREBASE_PRIVATE_KEY no definido");
  if (!databaseURL) throw new Error("FIREBASE_DATABASE_URL no definido");

  const fixedPrivateKey =
    typeof privateKey === "string" ? privateKey.replace(/\\n/g, "\n") : privateKey;

  const app = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey: fixedPrivateKey,
    }),
    databaseURL,
  });

  db = getDatabase(app);
  return db;
}

export function getDB() {
  if (!db) throw new Error("Firebase no inicializado. Llama a initFirebase primero.");
  return db;
}
