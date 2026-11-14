(() => {
  const D = window.DOOMSDAY_BIOBEAST_DATA;
  if (!D) return;
  const stepsGrid = document.querySelector("#bb-battle-steps-grid");
  const attrThead = document.querySelector("#bb-attr-thead"), attrTbody = document.querySelector("#bb-attr-tbody");
  const pStatsThead = document.querySelector("#bb-pluto-stats-thead"), pStatsTbody = document.querySelector("#bb-pluto-stats-tbody");
  const pSkillsThead = document.querySelector("#bb-pluto-skills-thead"), pSkillsTbody = document.querySelector("#bb-pluto-skills-tbody");
  const pPairingsGrid = document.querySelector("#bb-pluto-pairings-grid");
  const modeSel = document.querySelector("#bb-mode-select"), troopSel = document.querySelector("#bb-troop-select"), targetSel = document.querySelector("#bb-target-select");
  const simThead = document.querySelector("#bb-sim-thead"), simTbody = document.querySelector("#bb-sim-tbody"), simNote = document.querySelector("#bb-sim-note");

  const MODES = [
    { id: "field", mult: 1.0, heal: 0, label: { en: "Open-Field Squad (1.0× Pluto Jellyfish Base HP = 90,050)", vi: "Đánh Đồng Mở (1.0× HP Gốc Pluto Jellyfish = 90,050)", es: "Campo Abierto (1.0× HP Base Pluto Jellyfish = 90,050)" } },
    { id: "rally", mult: 3.2, heal: 45000, label: { en: "Alliance Siege Rally (3.2× Boosted HP + Reinforce Heal)", vi: "Tập Kết Công Thành (3.2× HP Tăng cường + Hồi HP Tiếp viện)", es: "Rally de Alianza (3.2× HP Aumentado + Curación por Refuerzos)" } },
    { id: "garrison", mult: 3.5, heal: 55000, label: { en: "Flag / Shelter Garrison (3.5× Boosted HP + Reinforce Heal)", vi: "Đồn Trú Cờ / Nhà Chính (3.5× HP Tăng cường + Hồi HP Tiếp viện)", es: "Guarnición de Bandera / Refugio (3.5× HP Aumentado + Refuerzos)" } },
  ];
  const TROOPS = [
    { id: "t4", baseHp: 90050, beastAtk: 5000, convRate: 620, label: { en: "Lv.100 Pluto Jellyfish + T4 Elite Squad (90,050 Base HP / 5,000 ATK)", vi: "Pluto Jellyfish Lv.100 + Đội T4 Elite (90,050 HP / 5,000 ATK)", es: "Pluto Jellyfish Nv.100 + Escuadrón T4 (90,050 HP / 5,000 ATQ)" } },
    { id: "t5", baseHp: 135000, beastAtk: 7500, convRate: 920, label: { en: "Lv.100 Pluto Jellyfish + T5 Armored Squad (Boosted Rally/Tech)", vi: "Pluto Jellyfish Lv.100 + Đội T5 Armored (Có Buff Công nghệ)", es: "Pluto Jellyfish Nv.100 + Escuadrón T5 (Con Bono Tecnológico)" } },
    { id: "t6", baseHp: 180100, beastAtk: 10500, convRate: 1350, label: { en: "Lv.100 Pluto Jellyfish + T6 Ace Trailblazer Squad (Max Scaling)", vi: "Pluto Jellyfish Lv.100 + Đội T6 Ace Trailblazer (Tối đa)", es: "Pluto Jellyfish Nv.100 + Escuadrón T6 Ace (Escalado Máx.)" } },
  ];
  const TARGETS = [
    { id: "active", enemyHp: 90050, label: { en: "Enemy Biobeast Active (90,050 HP → Beast-vs-Beast Duel)", vi: "Biobeast Địch Còn Máu (90,050 HP → Đấu Thú)", es: "Bestia Enemiga Activa (90,050 HP → Duelo de Bestias)" } },
    { id: "gray", enemyHp: 0, label: { en: "Enemy Biobeast Depleted (Gray Icon → 100% Excess Troop DMG!)", vi: "Biobeast Địch Cạn HP (Biểu tượng Xám → Chuyển Hóa Sát Thương Lính!)", es: "Bestia Enemiga Agotada (Icono Gris → ¡100% Exceso de Daño a Tropas!)" } },
  ];

  const getLang = () => (["vi", "es"].includes(document.documentElement.lang) ? document.documentElement.lang : "en");

  const renderSim = () => {
    if (!simTbody) return;
    const m = MODES.find((x) => x.id === modeSel.value) || MODES[0], tr = TROOPS.find((x) => x.id === troopSel.value) || TROOPS[0], tg = TARGETS.find((x) => x.id === targetSel.value) || TARGETS[0];
    const effHp = Math.round(tr.baseHp * m.mult), dps = Math.round(tr.beastAtk * 1.45);
    const duelSec = tg.enemyHp > 0 ? +(tg.enemyHp / dps).toFixed(1) : 0;
    const troopKillPer10s = tg.enemyHp === 0 ? tr.convRate * 10 : Math.round(tr.convRate * Math.max(0, 10 - duelSec / 2));
    simThead.innerHTML = `<tr><th>Pluto Jellyfish (Lv.100) Metric</th><th>Calculated Value</th><th>Official Mechanism</th></tr>`;
    simTbody.innerHTML = [
      ["Effective Biobeast HP Pool", `<strong>${effHp.toLocaleString()} HP</strong> (${m.mult}× Scaling)`, m.mult > 1 ? "Boosted by Rally/Garrison troop count & T1–T6 strength (disappears after leaving)" : "Base Lv.100 Pluto Jellyfish HP (90,050 HP, 4,300 DEF)"],
      ["Combo & Counter Free Casts", "<strong>41.2% Combo Rate</strong> · <strong>25.9% Counter Rate</strong>", "Each trigger auto-casts Invisible Whip 1 extra time (ignores cooldown, max 1/s) + +16% Combo DMG / +8% Counter DMG"],
      ["Squad Buffs While Deployed", "<strong>+10% Squad Basic Attack DMG</strong> · <strong>+10% Squad DMG Reduction</strong>", "Toxic Tide (Tier ★) buffs Squad Basic Attack DMG by +10%; Special Attributes reduce Squad DMG taken by 10%"],
      ["Beast Duel & Excess Troop DMG (10s)", tg.enemyHp > 0 ? `<strong>~${duelSec}s</strong> to Gray Icon → <strong>~${troopKillPer10s.toLocaleString()}</strong> Troop DMG` : `<strong>0s (Already Gray!)</strong> → <strong>~${troopKillPer10s.toLocaleString()}</strong> Troop DMG`, "Excess DMG beyond enemy Biobeast HP converts directly into damage dealt to enemy troops"],
    ].map(([k, v, n]) => `<tr><td><strong>${k}</strong></td><td>${v}</td><td>${n}</td></tr>`).join("");
    simNote.innerHTML = `<p class="card-label">Battlefield Takeaway</p><p>${tg.enemyHp === 0 ? "<strong>Excess Damage Conversion Active:</strong> Because the enemy Biobeast has 0 HP (Gray Icon), 100% of Pluto Jellyfish's Direct (Toxic Tide / Invisible Whip) and Indirect (Corrosion) excess damage converts directly into enemy troop casualties!" : `<strong>Corrosion + Combo Loop:</strong> Pluto Jellyfish (${effHp.toLocaleString()} HP) procs Invisible Whip every 3s plus 41.2% Combo & 25.9% Counter procs, stacking Corrosion to deplete the enemy Biobeast in ~${duelSec}s.`}</p>`;
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
    if (pStatsThead && pStatsTbody) {
      pStatsThead.innerHTML = `<tr><th>Attribute</th><th>Lv.100 Value</th><th>Combat Impact</th></tr>`;
      pStatsTbody.innerHTML = D.PLUTO.stats.map(([k, v, n]) => `<tr><td><strong>${k}</strong></td><td><strong>${v}</strong></td><td>${n}</td></tr>`).join("");
    }
    if (pSkillsThead && pSkillsTbody) {
      pSkillsThead.innerHTML = `<tr><th>Skill Name</th><th>Type & Cooldown</th><th>Leader / Early Tiers</th><th>Awakened (Tier ★) / Support Scaling</th></tr>`;
      pSkillsTbody.innerHTML = D.PLUTO.skills.map(([n, t, l, s]) => `<tr><td><strong>${n}</strong></td><td>${t}</td><td>${l.replace(/\n/g, "<br>")}</td><td>${s}</td></tr>`).join("");
    }
    if (pPairingsGrid) {
      pPairingsGrid.innerHTML = D.PLUTO.pairings.map((p) => `<article class="planner-card"><p class="card-label">${p.unit}</p><h3>${p.heroes}</h3><p>${p.why}</p></article>`).join("");
    }
    if (modeSel && troopSel && targetSel) {
      const pm = modeSel.value || "field", pt = troopSel.value || "t4", pg = targetSel.value || "active";
      modeSel.innerHTML = MODES.map((x) => `<option value="${x.id}">${x.label[lang]}</option>`).join("");
      troopSel.innerHTML = TROOPS.map((x) => `<option value="${x.id}">${x.label[lang]}</option>`).join("");
      targetSel.innerHTML = TARGETS.map((x) => `<option value="${x.id}">${x.label[lang]}</option>`).join("");
      modeSel.value = pm; troopSel.value = pt; targetSel.value = pg;
      renderSim();
    }
  };

  [modeSel, troopSel, targetSel].forEach((el) => el?.addEventListener("change", renderSim));
  renderAll();
  new MutationObserver(renderAll).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
