(() => {
  const D = window.DOOMSDAY_BIOBEAST_DATA;
  if (!D) return;
  const stepsGrid = document.querySelector("#bb-battle-steps-grid");
  const attrThead = document.querySelector("#bb-attr-thead"), attrTbody = document.querySelector("#bb-attr-tbody");
  const beastFilter = document.querySelector("#bb-beast-filter"), beastsContainer = document.querySelector("#bb-beasts-container");
  const modeSel = document.querySelector("#bb-mode-select"), troopSel = document.querySelector("#bb-troop-select"), targetSel = document.querySelector("#bb-target-select");
  const simThead = document.querySelector("#bb-sim-thead"), simTbody = document.querySelector("#bb-sim-tbody"), simNote = document.querySelector("#bb-sim-note");
  let activeBeast = "all";

  const MODES = [
    { id: "field", mult: 1.0, heal: 0, label: { en: "Open-Field Squad (1.0× Base Biobeast HP)", vi: "Đánh Đồng Mở (1.0× HP Thú Gốc)", es: "Campo Abierto (1.0× HP Base Biobeast)" } },
    { id: "rally", mult: 3.2, heal: 45000, label: { en: "Alliance Siege Rally (3.2× Boosted HP + Reinforce Heal)", vi: "Tập Kết Công Thành (3.2× HP Tăng cường + Hồi HP Tiếp viện)", es: "Rally de Alianza (3.2× HP Aumentado + Curación por Refuerzos)" } },
    { id: "garrison", mult: 3.5, heal: 55000, label: { en: "Flag / Shelter Garrison (3.5× Boosted HP + Reinforce Heal)", vi: "Đồn Trú Cờ / Nhà Chính (3.5× HP Tăng cường + Hồi HP Tiếp viện)", es: "Guarnición de Bandera / Refugio (3.5× HP Aumentado + Refuerzos)" } },
  ];
  const TROOPS = [
    { id: "pluto", baseHp: 90050, beastAtk: 7250, convRate: 850, buff: "+10% Squad Basic Attack DMG · +10% Squad DMG Reduction", proc: "420 Combo (41.2%) + 210 Counter (25.9%)", label: { en: "Pluto Jellyfish Lv.100 Leader (90,050 HP / 5,000 ATK / 420 Combo)", vi: "Pluto Jellyfish Lv.100 Leader (90,050 HP / 5,000 ATK / 420 Combo)", es: "Pluto Jellyfish Nv.100 Líder (90,050 HP / 5,000 ATQ / 420 Combo)" } },
    { id: "fraudrin", baseHp: 89900, beastAtk: 8400, convRate: 980, buff: "+4% Squad Skill DMG Reduction · +10% Squad DMG Reduction", proc: "525 Counter (~51.5%) + +20% Counter DMG + Full Size (+30% ATK)", label: { en: "Fraudrin Lv.100 Leader (89,900 HP / 4,955 ATK / 525 Counter / Full Size)", vi: "Fraudrin Lv.100 Leader (89,900 HP / 4,955 ATK / 525 Counter / Full Size)", es: "Fraudrin Nv.100 Líder (89,900 HP / 4,955 ATQ / 525 Contraataque)" } },
    { id: "duo", baseHp: 180000, beastAtk: 12800, convRate: 1450, buff: "+4% Skill DMG Red (or +10% Basic ATK) · +33% Corrosion Amp · +50% Counter DMG", proc: "525 Counter + 100% Counter Corrosion + +33% Stinging Echo T12", label: { en: "Fraudrin + Pluto Jellyfish Water Duo + T6 Ace Squad (Max Synergy)", vi: "Bộ đôi Fraudrin + Pluto Jellyfish + Đội T6 Ace (Cộng hưởng Tối đa)", es: "Dúo Fraudrin + Pluto Jellyfish + Escuadrón T6 Ace (Sinergia Máx.)" } },
  ];
  const TARGETS = [
    { id: "active", enemyHp: 90000, label: { en: "Enemy Biobeast Active (90,000 HP → Beast-vs-Beast Duel)", vi: "Biobeast Địch Còn Máu (90,000 HP → Đấu Thú)", es: "Bestia Enemiga Activa (90,000 HP → Duelo de Bestias)" } },
    { id: "gray", enemyHp: 0, label: { en: "Enemy Biobeast Depleted (Gray Icon → 100% Excess Troop DMG!)", vi: "Biobeast Địch Cạn HP (Biểu tượng Xám → Chuyển Hóa Sát Thương Lính!)", es: "Bestia Enemiga Agotada (Icono Gris → ¡100% Exceso de Daño a Tropas!)" } },
  ];

  const getLang = () => (["vi", "es"].includes(document.documentElement.lang) ? document.documentElement.lang : "en");

  const renderBeasts = () => {
    if (!beastsContainer) return;
    if (beastFilter) {
      const chips = [["all", "All Biobeasts (2)", "Pluto Jellyfish + Fraudrin"], ["pluto", "Rare · Corrode / Combo / Counter", "Pluto Jellyfish (Lv.100)"], ["fraudrin", "Seven Deadly Sins · Counter DMG / Full Size", "Fraudrin (Lv.100)"]];
      beastFilter.innerHTML = chips.map(([id, tag, title]) => `<button type="button" class="combo-preset-chip${activeBeast === id ? " is-active" : ""}" data-beast="${id}"><span class="combo-preset-tag">★ ${tag}</span><strong class="combo-preset-title">${title}</strong></button>`).join("");
    }
    const list = D.BEASTS.filter((b) => activeBeast === "all" || b.id === activeBeast);
    beastsContainer.innerHTML = list.map((b) => `
      <div class="planner-columns" style="margin-top: 1.25rem">
        <article class="planner-card">
          <p class="card-label">${b.badge}</p>
          <h3>${b.name} — ${b.tags}</h3>
          <p>${b.summary}</p>
          <img class="recipe-inline-image" src="${b.img}" alt="${b.name} Lv.100 Biobeast" loading="lazy" />
        </article>
        <article class="planner-card">
          <p class="card-label">Lv.100 Basic & Special Attributes</p>
          <h3>${b.name} Stat Breakdown</h3>
          <div class="table-wrap"><table class="summary-table"><thead><tr><th>Attribute</th><th>Lv.100 Value</th><th>Combat Impact</th></tr></thead><tbody>${b.stats.map(([k, v, n]) => `<tr><td><strong>${k}</strong></td><td><strong>${v}</strong></td><td>${n}</td></tr>`).join("")}</tbody></table></div>
        </article>
      </div>
      <article class="planner-card" style="margin-top: 1.25rem">
        <p class="card-label">Leader & Support Skill Tier Progression (Tier 0 → Tier 12 / Tier ★)</p>
        <h3>${b.name} — All 4 Skills & Tier Multipliers</h3>
        <div class="table-wrap"><table class="summary-table"><thead><tr><th>Skill Name</th><th>Type & Cooldown</th><th>Leader / Early Tiers</th><th>Awakened (Tier ★) / Support Scaling</th></tr></thead><tbody>${b.skills.map(([n, t, l, s]) => `<tr><td><strong>${n}</strong></td><td>${t}</td><td>${l.replace(/\n/g, "<br>")}</td><td>${s}</td></tr>`).join("")}</tbody></table></div>
      </article>
      <div class="planner-columns" style="margin-top: 1.25rem">${b.pairings.map(([u, h, w]) => `<article class="planner-card"><p class="card-label">${u}</p><h3>${h}</h3><p>${w}</p></article>`).join("")}</div>
    `).join("");
  };

  const renderSim = () => {
    if (!simTbody) return;
    const m = MODES.find((x) => x.id === modeSel.value) || MODES[0], tr = TROOPS.find((x) => x.id === troopSel.value) || TROOPS[1], tg = TARGETS.find((x) => x.id === targetSel.value) || TARGETS[0];
    const effHp = Math.round(tr.baseHp * m.mult), duelSec = tg.enemyHp > 0 ? +(tg.enemyHp / tr.beastAtk).toFixed(1) : 0;
    const troopKillPer10s = tg.enemyHp === 0 ? tr.convRate * 10 : Math.round(tr.convRate * Math.max(0, 10 - duelSec / 2));
    simThead.innerHTML = `<tr><th>Biobeast Combat Metric</th><th>Calculated Value</th><th>Official Mechanism</th></tr>`;
    simTbody.innerHTML = [
      ["Effective Biobeast HP Pool", `<strong>${effHp.toLocaleString()} HP</strong> (${m.mult}× Scaling)`, m.mult > 1 ? `Boosted by Rally/Garrison troop strength (+${m.heal.toLocaleString()} HP per reinforce wave)` : "Standard Open-Field Biobeast HP"],
      ["Active Proc Profile", `<strong>${tr.proc}</strong>`, "Auto-casts Active Skill (Invisible Whip / Demonic Claw) ignoring cooldown (max 1/s) to stack Corrosion"],
      ["Squad Buffs While Deployed", `<strong>${tr.buff}</strong>`, "Pluto buffs Squad Basic Attack DMG (+10%); Fraudrin cuts Squad Skill DMG taken (+4%) + 10% Squad DMG Reduction"],
      ["Beast Duel & Excess Troop DMG (10s)", tg.enemyHp > 0 ? `<strong>~${duelSec}s</strong> to Gray Icon → <strong>~${troopKillPer10s.toLocaleString()}</strong> Troop DMG` : `<strong>0s (Already Gray!)</strong> → <strong>~${troopKillPer10s.toLocaleString()}</strong> Troop DMG`, "Excess DMG beyond enemy Biobeast HP converts directly into damage dealt to enemy troops"],
    ].map(([k, v, n]) => `<tr><td><strong>${k}</strong></td><td>${v}</td><td>${n}</td></tr>`).join("");
    simNote.innerHTML = `<p class="card-label">Battlefield Takeaway</p><p>${tg.enemyHp === 0 ? "<strong>Excess Damage Conversion Active:</strong> Because the enemy Biobeast has 0 HP (Gray Icon), 100% of your Biobeast's Direct and Corrosion excess damage converts directly into enemy troop casualties!" : `<strong>Beast Duel in Progress:</strong> Your Biobeast (${effHp.toLocaleString()} HP) duels the enemy Biobeast for ~${duelSec}s before turning the enemy attribute icon gray.`}</p>`;
  };

  const renderAll = () => {
    const lang = getLang();
    if (stepsGrid) {
      stepsGrid.innerHTML = D.STEPS.map((s) => `<article class="planner-card"><p class="card-label">Phase ${s.step} · Official Guide</p><h3>${s.title[lang]}</h3><p><em>"${s.quote[lang]}"</em></p><p>${s.tip[lang]}</p><img class="recipe-inline-image" src="${s.img}" alt="${s.title.en}" loading="lazy" /></article>`).join("");
    }
    if (attrThead && attrTbody) {
      attrThead.innerHTML = `<tr><th>Attribute / Mechanic</th><th>Trigger / Conversion</th><th>Official In-Game Rule</th></tr>`;
      attrTbody.innerHTML = D.ATTR_RULES.map(([a, t, r]) => `<tr><td><strong>${a}</strong></td><td>${t}</td><td>${r}</td></tr>`).join("");
    }
    renderBeasts();
    if (modeSel && troopSel && targetSel) {
      const pm = modeSel.value || "field", pt = troopSel.value || "fraudrin", pg = targetSel.value || "active";
      modeSel.innerHTML = MODES.map((x) => `<option value="${x.id}">${x.label[lang]}</option>`).join("");
      troopSel.innerHTML = TROOPS.map((x) => `<option value="${x.id}">${x.label[lang]}</option>`).join("");
      targetSel.innerHTML = TARGETS.map((x) => `<option value="${x.id}">${x.label[lang]}</option>`).join("");
      modeSel.value = pm; troopSel.value = pt; targetSel.value = pg;
      renderSim();
    }
  };

  beastFilter?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-beast]");
    if (btn) { activeBeast = btn.dataset.beast; renderBeasts(); }
  });
  [modeSel, troopSel, targetSel].forEach((el) => el?.addEventListener("change", renderSim));
  renderAll();
  new MutationObserver(renderAll).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
