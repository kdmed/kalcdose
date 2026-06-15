# KalcDose — Calculateur de Doses Médicales (PWA)

Application installable sur PC et téléphone — fonctionne aussi hors-ligne.

## 📁 Structure du projet

```
KalcDose/
├── index.html      → Page principale + PWA
├── style.css       → Mise en forme
├── meds.js         → Base de données des médicaments
├── app.js          → Logique de calcul
├── manifest.json   → Manifeste PWA (nom, icônes, couleurs)
├── sw.js           → Service Worker (cache hors-ligne)
├── icons/          → Icônes pour toutes tailles (72→512px)
└── README.md       → Ce fichier
```

---

## 🖥️ INSTALLATION SUR PC (Windows / Mac / Linux)

### Étape 1 — Lancer un serveur local dans VS Code
Installer l'extension **Live Server** (Ritwick Dey), puis :
- Clic droit sur `index.html` → **"Open with Live Server"**
- L'application s'ouvre à l'adresse `http://127.0.0.1:5500`

### Étape 2 — Installer l'application
Dans Chrome/Edge, une icône apparaît dans la barre d'adresse :
- **Chrome** : icône "⊕" en haut à droite → "Installer KalcDose"
- **Edge** : icône "➕" → "Installer"
- L'app s'installe comme une vraie application Windows/Mac

> ✅ Une fois installée, elle apparaît dans le menu Démarrer / Applications.

---

## 📱 INSTALLATION SUR TÉLÉPHONE

### Option A — Avec votre réseau local (recommandée)
1. PC et téléphone sur le **même WiFi**
2. Trouver l'adresse IP du PC : `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)
3. Dans Live Server VS Code : cliquer sur "Go Live" et noter le port (ex: 5500)
4. Sur le téléphone, ouvrir Chrome et taper : `http://192.168.X.X:5500`
5. Menu Chrome (⋮) → **"Ajouter à l'écran d'accueil"**

### Option B — Hébergement en ligne (GitHub Pages gratuit)
1. Créer un repo GitHub et y mettre les fichiers
2. Activer GitHub Pages dans les paramètres
3. Partager le lien https:// avec n'importe quel téléphone
4. Sur iPhone (Safari) : bouton Partager → "Sur l'écran d'accueil"
5. Sur Android (Chrome) : bannière automatique ou menu → "Ajouter"

---

## 📴 Fonctionnement HORS-LIGNE
Une fois installée, KalcDose fonctionne **sans connexion internet** grâce au Service Worker (sw.js) qui met en cache tous les fichiers.

---

## 💊 Médicaments inclus (14)

| Catégorie | Médicaments |
|---|---|
| 🧪 Antibiotiques pédiatriques | Amoxicilline, Augmentin, Azithromycine, Ceftriaxone, Métronidazole |
| 💊 Analgésiques / Antidouleurs | Paracétamol, Ibuprofène, Tramadol, Morphine |
| 🦟 Antipaludéens | Artéméther-Luméfantrine, Quinine IV, Doxycycline |
| 💉 Solutés / Perfusions | Sérum Salé, SG5%, Ringer Lactate, Transfusion CGR |

---

## ➕ Ajouter un médicament
Ouvrir `meds.js` et ajouter un objet à la liste `MEDICATIONS`. Voir les exemples existants.

---

⚠️ Outil d'aide à la décision uniquement. Vérifier avec un référentiel validé.
