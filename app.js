// ============================================================
// KalcDose — Logique principale
// ============================================================

const CATEGORY_ICONS = {
  "Antibiotiques pédiatriques": "🧪",
  "Analgésiques / Antidouleurs": "💊",
  "Antipaludéens": "🦟",
  "Solutés / Perfusions": "💉",
};

let activeCategory = "Tous";
let searchQuery = "";

function getCategories() {
  const cats = ["Tous", ...new Set(MEDICATIONS.map(m => m.category))];
  return cats;
}

function renderCategories() {
  const wrap = document.getElementById("categories");
  wrap.innerHTML = "";
  getCategories().forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "cat-btn" + (cat === activeCategory ? " active" : "");
    btn.textContent = (CATEGORY_ICONS[cat] || "") + " " + cat;
    btn.onclick = () => { activeCategory = cat; renderCategories(); renderGrid(); };
    wrap.appendChild(btn);
  });
}

function getFiltered() {
  return MEDICATIONS.filter(m => {
    const matchCat = activeCategory === "Tous" || m.category === activeCategory;
    const matchSearch = searchQuery === "" ||
      m.name.toLowerCase().includes(searchQuery) ||
      m.description.toLowerCase().includes(searchQuery) ||
      m.category.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });
}

function filterMeds() {
  searchQuery = document.getElementById("search").value.toLowerCase().trim();
  if (searchQuery !== "") {
    activeCategory = "Tous";
    renderCategories();
  }
  renderGrid();
}

function renderGrid() {
  const grid = document.getElementById("med-grid");
  const meds = getFiltered();
  if (meds.length === 0) {
    grid.innerHTML = `<div class="empty">Aucun médicament trouvé pour "<strong>${searchQuery}</strong>"</div>`;
    return;
  }
  grid.innerHTML = meds.map(m => `
    <div class="med-card" onclick="openModal('${m.id}')">
      <div class="med-icon">${m.icon}</div>
      <div class="med-info">
        <div class="med-name">${m.name}</div>
        <div class="med-cat">${m.category}</div>
        <div class="med-desc">${m.description}</div>
      </div>
      <div class="med-arrow">›</div>
    </div>
  `).join("");
}

// ── MODAL ────────────────────────────────────────────────

function openModal(id) {
  const med = MEDICATIONS.find(m => m.id === id);
  if (!med) return;
  const modal = document.getElementById("modal-content");
  modal.innerHTML = buildModalHTML(med);
  document.getElementById("modal-backdrop").classList.add("visible");
  // Live update
  modal.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", () => updateResult(med));
  });
}

function buildModalHTML(med) {
  const fields = med.fields.map(f => {
    if (f.type === "select") {
      const opts = f.options.map(o => `<option>${o}</option>`).join("");
      return `
        <div class="field-group">
          <label for="field-${f.id}">${f.label}</label>
          <select id="field-${f.id}" data-field="${f.id}">${opts}</select>
        </div>`;
    }
    return `
      <div class="field-group">
        <label for="field-${f.id}">${f.label}</label>
        <input type="${f.type}" id="field-${f.id}" data-field="${f.id}"
          placeholder="Entrez une valeur"
          ${f.min !== undefined ? `min="${f.min}"` : ""}
          ${f.max !== undefined ? `max="${f.max}"` : ""} />
      </div>`;
  }).join("");

  return `
    <div class="modal-header">
      <span class="modal-icon">${med.icon}</span>
      <div>
        <h2>${med.name}</h2>
        <div class="modal-cat">${med.category}</div>
      </div>
    </div>
    <p class="modal-desc">${med.description}</p>
    <div class="fields">${fields}</div>
    <div id="result-block" class="result-block hidden"></div>
  `;
}

function getFieldValues(med) {
  const values = {};
  med.fields.forEach(f => {
    const el = document.getElementById("field-" + f.id);
    if (el) values[f.id] = el.value;
  });
  return values;
}

function updateResult(med) {
  const values = getFieldValues(med);
  const result = med.compute(values);
  const block = document.getElementById("result-block");
  if (!result) {
    block.classList.add("hidden");
    return;
  }
  block.classList.remove("hidden");
  block.innerHTML = `
    <h3>📋 Résultat du calcul</h3>
    <div class="result-rows">
      ${result.map(r => `
        <div class="result-row ${r.label.includes("⚠") ? "warning" : ""}">
          <div class="result-label">${r.label}</div>
          <div class="result-value">
            <strong>${r.value}</strong>
            ${r.sub ? `<span class="result-sub">${r.sub}</span>` : ""}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function closeModal() {
  document.getElementById("modal-backdrop").classList.remove("visible");
}

// ── INIT ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderGrid();
});
