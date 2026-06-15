// ============================================================
// KalcDose — Base de données complète des médicaments
// Validé par le professionnel de santé
// ============================================================

const MEDICATIONS = [

  // ══════════════════════════════════════════════════════════
  // 💉 ANTIBIOTIQUES INJECTABLES
  // ══════════════════════════════════════════════════════════

  {
    id: "amoxicilline-inj", name: "Amoxicilline", category: "Antibiotiques injectables", icon: "💉",
    description: "50 mg/kg/j — flacon 500 mg/10 ml (50 mg/ml) — 2 injections/j",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 100 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const ml = (p * 50 / 2) / 50;
      return [
        { label: "Dose par injection", value: `${ml % 1 === 0 ? ml : ml.toFixed(1)} ml`, sub: "2 injections par jour" },
        { label: "Dose en mg", value: `${Math.round(p*25)} mg/injection`, sub: `${Math.round(p*50)} mg/j — flacon 500 mg/10 ml (50 mg/ml)` },
      ];
    }
  },

  {
    id: "cefotaxime-inj", name: "Céfotaxime", category: "Antibiotiques injectables", icon: "💉",
    description: "50 mg/kg/j — flacon 1g/4 ml (250 mg/ml) — 3 injections/j",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 100 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const ml = (p * 50 / 3) / 250;
      return [
        { label: "Dose par injection", value: `${ml.toFixed(2)} ml`, sub: "3 injections par jour" },
        { label: "Dose en mg", value: `${Math.round(p*50/3)} mg/injection`, sub: `${Math.round(p*50)} mg/j — flacon 1g/4 ml (250 mg/ml)` },
      ];
    }
  },

  {
    id: "ceftriaxone-inj", name: "Ceftriaxone", category: "Antibiotiques injectables", icon: "💉",
    description: "50 mg/kg/j — flacon 1g/10 ml (100 mg/ml) — 1 ou 2 injections/j",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 100 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const mgJ = Math.min(p * 50, 2000); const mlJ = mgJ / 100;
      return [
        { label: "Dose journalière totale", value: `${mlJ % 1 === 0 ? mlJ : mlJ.toFixed(1)} ml/j`, sub: `${Math.round(mgJ)} mg/j — flacon 1g/10 ml (100 mg/ml)` },
        { label: "En 1 injection", value: `${mlJ % 1 === 0 ? mlJ : mlJ.toFixed(1)} ml`, sub: "1 × /jour" },
        { label: "En 2 injections", value: `${(mlJ/2) % 1 === 0 ? mlJ/2 : (mlJ/2).toFixed(1)} ml`, sub: "2 × /jour" },
      ];
    }
  },

  {
    id: "ampicilline-inj", name: "Ampicilline", category: "Antibiotiques injectables", icon: "💉",
    description: "100 mg/kg/j — flacon 500 mg/5 ml (100 mg/ml) — 2 ou 3 injections/j",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 100 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const mgJ = Math.min(p * 100, 4000); const mlJ = mgJ / 100;
      return [
        { label: "Dose journalière totale", value: `${mlJ % 1 === 0 ? mlJ : mlJ.toFixed(1)} ml/j`, sub: `${Math.round(mgJ)} mg/j — flacon 500 mg/5 ml (100 mg/ml)` },
        { label: "En 2 injections", value: `${(mlJ/2) % 1 === 0 ? mlJ/2 : (mlJ/2).toFixed(1)} ml`, sub: "2 × /jour" },
        { label: "En 3 injections", value: `${(mlJ/3).toFixed(1)} ml`, sub: "3 × /jour" },
      ];
    }
  },

  {
    id: "amikacine-inj", name: "Amikacine", category: "Antibiotiques injectables", icon: "💉",
    description: "15 mg/kg/j — flacon 250 mg/2 ml (125 mg/ml) — 1 injection/j",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 100 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const ml = (p * 15) / 125;
      return [
        { label: "Dose par injection", value: `${ml < 1 ? ml.toFixed(2) : ml.toFixed(1)} ml`, sub: "1 injection par jour" },
        { label: "Dose en mg", value: `${(p*15).toFixed(1)} mg/j`, sub: "flacon 250 mg/2 ml (125 mg/ml)" },
      ];
    }
  },

  {
    id: "gentamicine-inj", name: "Gentamicine", category: "Antibiotiques injectables", icon: "💉",
    description: "3 mg/kg/j — flacon 40 mg/2 ml (20 mg/ml) — 1 injection/j — IM ou IV",
    fields: [
      { id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 100 },
      { id: "voie", label: "Voie", type: "select", options: ["IM", "IV"] }
    ],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const ml = (p * 3) / 20; const mlFmt = ml < 1 ? ml.toFixed(2) : ml.toFixed(1);
      const volDil = Math.max(10, Math.round(p * 2));
      if (v.voie === "IV") return [
        { label: "Dose à prélever", value: `${mlFmt} ml`, sub: `${(p*3).toFixed(1)} mg — flacon 40 mg/2 ml (20 mg/ml)` },
        { label: "Dilution IV — NaCl 0,9%", value: `+ ${volDil} ml`, sub: `Volume total : ${(ml + volDil).toFixed(1)} ml` },
        { label: "Durée", value: "Perfusion 30 min — 1 fois/jour" },
      ];
      return [
        { label: "Dose IM", value: `${mlFmt} ml`, sub: `${(p*3).toFixed(1)} mg — flacon 40 mg/2 ml (20 mg/ml)` },
        { label: "Voie", value: "IM profonde — 1 injection/jour", sub: "Face antéro-latérale de la cuisse" },
      ];
    }
  },

  {
    id: "metro-inj", name: "Métronidazole", category: "Antibiotiques injectables", icon: "💉",
    description: "Bon état: 30 mg/kg/j — MAS: 15 mg/kg/j — 2 perfusions/j — 500 mg/100 ml",
    fields: [
      { id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 100 },
      { id: "etat", label: "État nutritionnel", type: "select", options: ["Bon état nutritionnel", "Malnutrition aiguë sévère (MAS)"] }
    ],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const mgKgJ = v.etat === "Malnutrition aiguë sévère (MAS)" ? 15 : 30;
      const mlPrise = (p * mgKgJ / 2) / 5;
      return [
        { label: "Dose par perfusion", value: `${mlPrise % 1 === 0 ? mlPrise : mlPrise.toFixed(1)} ml`, sub: "2 perfusions par jour — espacées de 12 h" },
        { label: "Dose en mg", value: `${(p*mgKgJ/2).toFixed(1)} mg/perfusion`, sub: `${(p*mgKgJ).toFixed(1)} mg/j — flacon 500 mg/100 ml (5 mg/ml)` },
        { label: "Administration", value: "Perfusion 30–60 min — prêt à l'emploi" },
      ];
    }
  },

  {
    id: "artesunate-inj", name: "Artésunate", category: "Antipaludéens injectables", icon: "💉",
    description: "< 20 kg: 3 mg/kg — ≥ 20 kg: 2,4 mg/kg — flacon 60 mg — IV ou IM",
    fields: [
      { id: "poids", label: "Poids (kg)", type: "number", min: 5, max: 100 },
      { id: "voie", label: "Voie", type: "select", options: ["IV — 10 mg/ml", "IM — 20 mg/ml"] }
    ],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const mgKg = p < 20 ? 3.0 : 2.4;
      const conc = v.voie === "IV — 10 mg/ml" ? 10 : 20;
      const mgDose = p * mgKg;
      const ml = Math.ceil(mgDose / conc);
      const nbVials = Math.ceil(mgDose / 60);
      const recon = v.voie === "IV — 10 mg/ml" ? "poudre + 1 ml bicarbonate + 5 ml NaCl → 6 ml" : "poudre + 1 ml bicarbonate + 2 ml NaCl → 3 ml";
      return [
        { label: "Dose par injection", value: `${ml} ml`, sub: `${mgDose.toFixed(1)} mg — ${mgKg} mg/kg — arrondi au ml supérieur` },
        { label: "Flacons 60 mg / dose", value: `${nbVials} flacon(s)` },
        { label: "Reconstitution", value: recon },
      ];
    }
  },

  // ══════════════════════════════════════════════════════════
  // 💉 CORTICOÏDES INJECTABLES
  // ══════════════════════════════════════════════════════════

  {
    id: "hydrocortisone-inj", name: "Hydrocortisone", category: "Corticoïdes injectables", icon: "💉",
    description: "4 mg/kg/dose IV — flacon 100 mg/2 ml (50 mg/ml)",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 100 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const ml = (p * 4) / 50; const mlFmt = ml < 1 ? ml.toFixed(2) : ml.toFixed(1);
      const volDil = Math.max(10, Math.round(p * 2));
      return [
        { label: "Dose à prélever", value: `${mlFmt} ml`, sub: `${(p*4).toFixed(1)} mg/dose — flacon 100 mg/2 ml (50 mg/ml)` },
        { label: "Dilution IV — NaCl 0,9%", value: `+ ${volDil} ml`, sub: `Volume total : ${(ml + volDil).toFixed(1)} ml` },
        { label: "Durée", value: "3–5 min (urgence) ou 20–30 min (entretien)" },
      ];
    }
  },

  {
    id: "dexamethasone-inj", name: "Dexaméthasone", category: "Corticoïdes injectables", icon: "💉",
    description: "0,15 mg/kg/dose IV — flacon 4 mg/ml",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 100 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const ml = (p * 0.15) / 4; const mlFmt = ml < 1 ? ml.toFixed(2) : ml.toFixed(1);
      const volDil = Math.max(10, Math.round(p * 2));
      return [
        { label: "Dose à prélever", value: `${mlFmt} ml`, sub: `${(p*0.15).toFixed(2)} mg/dose — flacon 4 mg/ml` },
        { label: "Dilution IV — NaCl 0,9%", value: `+ ${volDil} ml`, sub: `Volume total : ${(ml + volDil).toFixed(1)} ml` },
        { label: "Durée", value: "IV lente 3–5 min" },
      ];
    }
  },

  // ══════════════════════════════════════════════════════════
  // ⚡ ANTICONVULSANTS INJECTABLES
  // ══════════════════════════════════════════════════════════

  {
    id: "diazepam-inj", name: "Diazépam", category: "Anticonvulsants injectables", icon: "💉",
    description: "IV 0,3 mg/kg — Intra-rectal 0,5 mg/kg — flacon 10 mg/2 ml (5 mg/ml)",
    fields: [
      { id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 100 },
      { id: "voie", label: "Voie", type: "select", options: ["IV", "Intra-rectal"] }
    ],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const mgKg = v.voie === "IV" ? 0.3 : 0.5;
      const mgDose = Math.min(p * mgKg, 10); const ml = mgDose / 5;
      const mlFmt = ml < 1 ? ml.toFixed(2) : ml.toFixed(1);
      const isMax = p * mgKg > 10;
      if (v.voie === "IV") return [
        { label: "Dose IV", value: `${mlFmt} ml`, sub: `${mgDose.toFixed(1)} mg — sans dilution — ${mgKg} mg/kg` },
        { label: "Administration", value: "IV lente 2–3 min", sub: isMax ? "⚠ Dose plafonnée à 10 mg" : "Peut répéter 1× après 10 min" },
      ];
      return [
        { label: "Dose intra-rectale", value: `${mlFmt} ml`, sub: `${mgDose.toFixed(1)} mg — ${mgKg} mg/kg` },
        { label: "Administration", value: "Seringue sans aiguille dans le rectum", sub: isMax ? "⚠ Dose plafonnée à 10 mg" : "Maintenir fesses serrées 1–2 min" },
      ];
    }
  },

  {
    id: "phenobarbital-inj", name: "Phénobarbital", category: "Anticonvulsants injectables", icon: "💉",
    description: "IV 20 mg/kg (charge) — IM 5 mg/kg/j (entretien) — flacon 200 mg/ml",
    fields: [
      { id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 100 },
      { id: "voie", label: "Voie", type: "select", options: ["IV — dose de charge", "IM — entretien"] }
    ],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const isIV = v.voie === "IV — dose de charge";
      const mgKg = isIV ? 20 : 5; const maxMg = isIV ? 1000 : 300;
      const mgDose = Math.min(p * mgKg, maxMg); const ml = mgDose / 200;
      const mlFmt = ml < 1 ? ml.toFixed(2) : ml.toFixed(1);
      const isMax = p * mgKg > maxMg;
      if (isIV) {
        const volDil = Math.max(10, Math.round(p * 2));
        return [
          { label: "Dose à prélever", value: `${mlFmt} ml`, sub: `${mgDose.toFixed(0)} mg — flacon 200 mg/ml` },
          { label: "Dilution IV — NaCl 0,9%", value: `+ ${volDil} ml`, sub: `Volume total : ${(ml + volDil).toFixed(1)} ml` },
          { label: "Durée", value: "Perfusion 20–30 min", sub: isMax ? "⚠ Dose plafonnée à 1000 mg" : "Max 1 mg/kg/min" },
        ];
      }
      return [
        { label: "Dose IM", value: `${mlFmt} ml`, sub: `${mgDose.toFixed(0)} mg — flacon 200 mg/ml` },
        { label: "Administration", value: "IM profonde — 1 fois/jour", sub: isMax ? "⚠ Dose plafonnée à 300 mg" : "" },
      ];
    }
  },

  // ══════════════════════════════════════════════════════════
  // 🌡️ ANTALGIQUES INJECTABLES
  // ══════════════════════════════════════════════════════════

  {
    id: "perfalgan-inj", name: "Perfalgan", category: "Antalgiques injectables", icon: "💉",
    description: "≥10 kg: 15 mg/kg — <10 kg: 7,5 mg/kg — 3 perfusions/j — 1000 mg/100 ml",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 100 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const mgKg = p >= 10 ? 15 : 7.5;
      const ml = (p * mgKg) / 10; const mlFmt = ml % 1 === 0 ? ml : ml.toFixed(1);
      return [
        { label: "Dose par perfusion", value: `${mlFmt} ml`, sub: `${(p*mgKg).toFixed(1)} mg — ${mgKg} mg/kg — ${p < 10 ? "⚠ Poids < 10 kg" : ""}` },
        { label: "Fréquence", value: "3 perfusions/j — toutes les 8 h" },
        { label: "Administration", value: "15 min — sans dilution — prêt à l'emploi" },
      ];
    }
  },

  // ══════════════════════════════════════════════════════════
  // 🧴 SOLUTÉS / PERFUSIONS
  // ══════════════════════════════════════════════════════════

  {
    id: "ssi", name: "SSI — Sérum Salé 0,9%", category: "Solutés / Perfusions", icon: "💧",
    description: "Remplissage vasculaire + Besoins journaliers (Holliday-Segar)",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 150 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const bj = p <= 10 ? p*100 : p <= 20 ? 1000+(p-10)*50 : 1500+(p-20)*20;
      return [
        { label: "Remplissage vasculaire", value: `${Math.min(Math.round(p*20),1000)} ml`, sub: "20 ml/kg en 20–30 min" },
        { label: "Besoins journaliers", value: `${Math.round(bj)} ml/j`, sub: "Holliday-Segar" },
        { label: "Débit horaire", value: `${Math.round(bj/24)} ml/h`, sub: "en continu" },
        { label: "Bolus déshydratation", value: `${Math.round(p*10)} ml`, sub: "10 ml/kg en 30–60 min" },
      ];
    }
  },

  {
    id: "sg5", name: "SG 5%", category: "Solutés / Perfusions", icon: "💧",
    description: "Besoins journaliers + bolus hypoglycémie 4 ml/kg",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 150 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const bj = p <= 10 ? p*100 : p <= 20 ? 1000+(p-10)*50 : 1500+(p-20)*20;
      return [
        { label: "Besoins journaliers", value: `${Math.round(bj)} ml/j`, sub: "Holliday-Segar" },
        { label: "Débit horaire", value: `${Math.round(bj/24)} ml/h`, sub: "en continu" },
        { label: "Bolus hypoglycémie", value: `${Math.round(p*4)} ml`, sub: "4 ml/kg IV" },
      ];
    }
  },

  {
    id: "sg10", name: "SG 10%", category: "Solutés / Perfusions", icon: "💧",
    description: "Besoins journaliers + bolus hypoglycémie 2 ml/kg",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 150 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const bj = p <= 10 ? p*100 : p <= 20 ? 1000+(p-10)*50 : 1500+(p-20)*20;
      return [
        { label: "Besoins journaliers", value: `${Math.round(bj)} ml/j`, sub: "Holliday-Segar" },
        { label: "Débit horaire", value: `${Math.round(bj/24)} ml/h`, sub: "en continu" },
        { label: "Bolus hypoglycémie", value: `${Math.round(p*2)} ml`, sub: "2 ml/kg IV — plus concentré" },
      ];
    }
  },

  {
    id: "ringer", name: "Ringer Lactate", category: "Solutés / Perfusions", icon: "💧",
    description: "Remplissage vasculaire + Besoins journaliers (Holliday-Segar)",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 150 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const bj = p <= 10 ? p*100 : p <= 20 ? 1000+(p-10)*50 : 1500+(p-20)*20;
      return [
        { label: "Remplissage vasculaire", value: `${Math.min(Math.round(p*20),1000)} ml`, sub: "20 ml/kg en 20–30 min" },
        { label: "Besoins journaliers", value: `${Math.round(bj)} ml/j`, sub: "Holliday-Segar" },
        { label: "Débit horaire", value: `${Math.round(bj/24)} ml/h`, sub: "en continu" },
      ];
    }
  },

  // ══════════════════════════════════════════════════════════
  // 💊 ANTIBIOTIQUES ORAUX
  // ══════════════════════════════════════════════════════════

  {
    id: "amoxicilline-oral", name: "Amoxicilline", category: "Antibiotiques oraux", icon: "💊",
    description: "50 mg/kg/j en 2 prises — suspension 125 ou 250 mg/5 ml",
    fields: [
      { id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 40 },
      { id: "susp", label: "Suspension", type: "select", options: ["125 mg/5 ml", "250 mg/5 ml"] }
    ],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const conc = v.susp === "125 mg/5 ml" ? 25 : 50;
      const ml = (p * 50 / 2) / conc;
      return [
        { label: "Dose par prise", value: `${ml < 1 ? ml.toFixed(2) : ml.toFixed(1)} ml`, sub: "2 prises par jour" },
        { label: "Dose en mg", value: `${Math.round(p*25)} mg/prise`, sub: `${Math.round(p*50)} mg/j — ${v.susp}` },
        { label: "Calcul", value: `${p} kg × 50 mg/kg ÷ 2 ÷ ${conc} mg/ml = ${ml.toFixed(2)} ml` },
      ];
    }
  },

  {
    id: "amoxiclav-oral", name: "Amoxicilline-Clavulanate", category: "Antibiotiques oraux", icon: "💊",
    description: "45 mg/kg/j en 2 prises — suspension 125 ou 250 mg/5 ml",
    fields: [
      { id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 40 },
      { id: "susp", label: "Suspension", type: "select", options: ["125 mg/5 ml", "250 mg/5 ml"] }
    ],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const conc = v.susp === "125 mg/5 ml" ? 25 : 50;
      const ml = (p * 45 / 2) / conc;
      return [
        { label: "Dose par prise", value: `${ml < 1 ? ml.toFixed(2) : ml.toFixed(1)} ml`, sub: "2 prises par jour" },
        { label: "Dose en mg", value: `${Math.round(p*45/2)} mg/prise`, sub: `${Math.round(p*45)} mg/j — ${v.susp}` },
        { label: "Calcul", value: `${p} kg × 45 mg/kg ÷ 2 ÷ ${conc} mg/ml = ${ml.toFixed(2)} ml` },
      ];
    }
  },

  {
    id: "azithromycine-oral", name: "Azithromycine", category: "Antibiotiques oraux", icon: "💊",
    description: "10 mg/kg/j en 1 prise × 3 jours — flacon 200 mg/15 ml",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 40 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      // Flacon 200 mg/15 ml = 13,33 mg/ml
      const CONC = 200 / 15;
      const mgDose = p * 10;
      const ml = mgDose / CONC;
      return [
        { label: "Dose par prise", value: `${ml < 1 ? ml.toFixed(2) : ml.toFixed(1)} ml`, sub: "1 prise par jour × 3 jours" },
        { label: "Dose en mg", value: `${mgDose.toFixed(1)} mg/j`, sub: "flacon 200 mg/15 ml" },
        { label: "Calcul", value: `${p} kg × 10 mg/kg ÷ 13,33 mg/ml = ${ml.toFixed(2)} ml` },
      ];
    }
  },

  {
    id: "metro-oral", name: "Métronidazole", category: "Antibiotiques oraux", icon: "💊",
    description: "30 mg/kg/j en 2 prises — suspension 250 mg/5 ml",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 40 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const ml = (p * 30 / 2) / 50;
      return [
        { label: "Dose par prise", value: `${ml < 1 ? ml.toFixed(2) : ml.toFixed(1)} ml`, sub: "2 prises par jour" },
        { label: "Dose en mg", value: `${(p*15).toFixed(1)} mg/prise`, sub: `${(p*30).toFixed(1)} mg/j — suspension 250 mg/5 ml` },
        { label: "Calcul", value: `${p} kg × 30 mg/kg ÷ 2 ÷ 50 mg/ml = ${ml.toFixed(2)} ml` },
      ];
    }
  },

  {
    id: "cefixime-oral", name: "Céfixime", category: "Antibiotiques oraux", icon: "💊",
    description: "4 mg/kg/j en 2 prises — suspension 100 mg/5 ml",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 50 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const ml = (p * 4 / 2) / 20;
      return [
        { label: "Dose par prise", value: `${ml < 1 ? ml.toFixed(2) : ml.toFixed(1)} ml`, sub: "2 prises par jour" },
        { label: "Dose en mg", value: `${(p*2).toFixed(1)} mg/prise`, sub: `${(p*4).toFixed(1)} mg/j — suspension 100 mg/5 ml` },
        { label: "Calcul", value: `${p} kg × 4 mg/kg ÷ 2 ÷ 20 mg/ml = ${ml.toFixed(2)} ml` },
      ];
    }
  },

  {
    id: "cotrimoxazole-oral", name: "Cotrimoxazole", category: "Antibiotiques oraux", icon: "💊",
    description: "6 mg TMP/kg/j en 2 prises — suspension 240 mg/5 ml (40+200)",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 40 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const ml = (p * 6 / 2) / 8;
      return [
        { label: "Dose par prise", value: `${ml < 1 ? ml.toFixed(2) : ml.toFixed(1)} ml`, sub: "2 prises par jour" },
        { label: "Dose TMP", value: `${(p*3).toFixed(1)} mg TMP/prise`, sub: `+ ${(p*15).toFixed(1)} mg SMX — suspension 240 mg/5 ml` },
        { label: "Calcul", value: `${p} kg × 6 mg TMP/kg ÷ 2 ÷ 8 mg TMP/ml = ${ml.toFixed(2)} ml` },
      ];
    }
  },

  // ══════════════════════════════════════════════════════════
  // 💊 ANALGÉSIQUES ORAUX
  // ══════════════════════════════════════════════════════════

  {
    id: "paracetamol-oral", name: "Paracétamol", category: "Analgésiques oraux", icon: "💊",
    description: "15 mg/kg/dose — sirop 120 mg/5 ml — toutes les 6 h",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 50 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const ml = (p * 15) / 24;
      return [
        { label: "Dose par prise", value: `${ml < 1 ? ml.toFixed(2) : ml.toFixed(1)} ml`, sub: "toutes les 6 h — max 4 prises/j" },
        { label: "Dose en mg", value: `${(p*15).toFixed(1)} mg/prise`, sub: "sirop 120 mg/5 ml" },
        { label: "Calcul", value: `${p} kg × 15 mg/kg ÷ 24 mg/ml = ${ml.toFixed(2)} ml` },
      ];
    }
  },

  {
    id: "ibuprofen-oral", name: "Ibuprofène", category: "Analgésiques oraux", icon: "💊",
    description: "10 mg/kg/dose — suspension 100 mg/5 ml — toutes les 8 h",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 6, max: 40 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      const ml = (p * 10) / 20;
      return [
        { label: "Dose par prise", value: `${ml < 1 ? ml.toFixed(2) : ml.toFixed(1)} ml`, sub: "toutes les 8 h — max 3 prises/j" },
        { label: "Dose en mg", value: `${(p*10).toFixed(1)} mg/prise`, sub: "suspension 100 mg/5 ml" },
        { label: "Calcul", value: `${p} kg × 10 mg/kg ÷ 20 mg/ml = ${ml.toFixed(2)} ml` },
        { label: "⚠ CI", value: "Contre-indiqué si poids < 6 kg" },
      ];
    }
  },

  // ══════════════════════════════════════════════════════════
  // 🦟 ANTIPALUDÉENS ORAUX
  // ══════════════════════════════════════════════════════════

  {
    id: "coartem-oral", name: "Coartem® (ACT)", category: "Antipaludéens oraux", icon: "🦟",
    description: "Comprimés 20/120 mg — selon tranche de poids — 2 prises/j × 3 jours",
    fields: [{ id: "poids", label: "Poids (kg)", type: "number", min: 5, max: 100 }],
    compute(v) {
      const p = parseFloat(v.poids); if (!p || p < 5) return null;
      const cp = p < 15 ? 1 : p < 25 ? 2 : p < 35 ? 3 : 4;
      const tranche = p < 15 ? "5–14 kg" : p < 25 ? "15–24 kg" : p < 35 ? "25–34 kg" : "≥ 35 kg";
      return [
        { label: "Comprimés par prise", value: `${cp} cp`, sub: `Tranche ${tranche} — 2 prises/j × 3 jours = 6 prises` },
        { label: "Dose artéméther", value: `${cp*20} mg/prise`, sub: `+ ${cp*120} mg luméfantrine` },
        { label: "Calcul", value: `${p} kg × 1 prise (forme commerciale)` },
      ];
    }
  },

  // ══════════════════════════════════════════════════════════
  // 💊 CORTICOÏDES ORAUX
  // ══════════════════════════════════════════════════════════

  {
    id: "betamethasone-oral", name: "Béthaméthasone", category: "Corticoïdes oraux", icon: "💊",
    description: "Gouttes: 10 gttes/kg × 1/j — Comprimés 2 mg: 0,1 mg/kg/j en 2 prises",
    fields: [
      { id: "poids", label: "Poids (kg)", type: "number", min: 1, max: 50 },
      { id: "forme", label: "Forme", type: "select", options: ["Gouttes (0,05 mg/goutte)", "Comprimés 2 mg"] }
    ],
    compute(v) {
      const p = parseFloat(v.poids); if (!p) return null;
      if (v.forme === "Gouttes (0,05 mg/goutte)") {
        const gouttes = Math.round(p * 10);
        return [
          { label: "Dose", value: `${gouttes} gouttes`, sub: "1 prise unique par jour" },
          { label: "Dose en mg", value: `${(gouttes * 0.05).toFixed(2)} mg/j`, sub: "0,05 mg/goutte" },
          { label: "Calcul", value: `${p} kg × 10 gouttes/kg = ${gouttes} gouttes` },
        ];
      }
      const cp = (p * 0.1 / 2) / 2;
      return [
        { label: "Dose par prise", value: `${cp.toFixed(2)} cp`, sub: "2 prises par jour" },
        { label: "Dose en mg", value: `${(p*0.05).toFixed(3)} mg/prise`, sub: `${(p*0.1).toFixed(3)} mg/j — comprimé 2 mg` },
        { label: "Calcul", value: `${p} kg × 0,1 mg/kg ÷ 2 prises ÷ 2 mg/cp = ${cp.toFixed(3)} cp` },
      ];
    }
  },

];
