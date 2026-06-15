// ============================================================
// KalcDose — Système d'activation par code (Firebase)
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get, set, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLG6fbL4gqCFbrzXM65QPF19ZdlyCGwAM",
  authDomain: "kalcdose.firebaseapp.com",
  databaseURL: "https://kalcdose-default-rtdb.firebaseio.com",
  projectId: "kalcdose",
  storageBucket: "kalcdose.firebasestorage.app",
  messagingSenderId: "43097919196",
  appId: "1:43097919196:web:de567ce941ece9b5786e19"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Générer un identifiant unique pour cet appareil
function getDeviceId() {
  let id = localStorage.getItem("kalcdose_device_id");
  if (!id) {
    id = "dev_" + Math.random().toString(36).substr(2, 16) + Date.now();
    localStorage.setItem("kalcdose_device_id", id);
  }
  return id;
}

// Vérifier si l'appareil est déjà activé
export async function checkActivation() {
  const deviceId = getDeviceId();
  const savedCode = localStorage.getItem("kalcdose_code");
  if (!savedCode) return false;
  try {
    const snap = await get(ref(db, `codes/${savedCode}`));
    if (!snap.exists()) return false;
    const data = snap.val();
    // Vérifier que ce code appartient à cet appareil
    return data.activated && data.deviceId === deviceId;
  } catch (e) {
    return false;
  }
}

// Activer un code
export async function activateCode(code) {
  const deviceId = getDeviceId();
  try {
    const snap = await get(ref(db, `codes/${code}`));
    if (!snap.exists()) {
      return { success: false, message: "Code invalide." };
    }
    const data = snap.val();
    if (!data.active) {
      return { success: false, message: "Ce code est désactivé." };
    }
    if (data.activated && data.deviceId !== deviceId) {
      return { success: false, message: "Ce code est déjà utilisé sur un autre appareil." };
    }
    // Activer le code sur cet appareil
    await update(ref(db, `codes/${code}`), {
      activated: true,
      deviceId: deviceId,
      activatedAt: new Date().toISOString()
    });
    localStorage.setItem("kalcdose_code", code);
    return { success: true, message: "Activation réussie !" };
  } catch (e) {
    return { success: false, message: "Erreur de connexion. Vérifiez votre internet." };
  }
}
