(() => {
  const data = window.DLS_INFANTRY_DATA;
  if (!data) return;

  const leaderSel = document.querySelector("#ih-leader-select"), assistSel = document.querySelector("#ih-assist-select"), levelSel = document.querySelector("#ih-skill-level");
  const pairBPreset = document.querySelector("#ih-pair-b-preset"), leaderBSel = document.querySelector("#ih-leader-b-select"), assistBSel = document.querySelector("#ih-assist-b-select");
  const presetBar = document.querySelector("#ih-preset-combos"), comboThead = document.querySelector("#ih-combo-thead"), comboTbody = document.querySelector("#ih-combo-tbody");
  const transcendWrap = document.querySelector("#ih-transcend-wrap"), comboPerks = document.querySelector("#ih-combo-perks");
  const filterBar = document.querySelector("#ih-hero-filters"), heroGrid = document.querySelector("#ih-hero-grid");
  const unitCards = document.querySelector("#ih-unit-cards"), tiersThead = document.querySelector("#ih-tiers-thead"), tiersTbody = document.querySelector("#ih-tiers-tbody");
  const fromSel = document.querySelector("#ih-tier-from"), toSel = document.querySelector("#ih-tier-to"), buffSel = document.querySelector("#ih-buff-profile");
  const compThead = document.querySelector("#ih-comp-thead"), compTbody = document.querySelector("#ih-comp-tbody"), deltaThead = document.querySelector("#ih-delta-thead"), deltaTbody = document.querySelector("#ih-delta-tbody");
  if (!leaderSel || !heroGrid) return;

  const COPY = {
    en: {
      stat: "Combined Attribute / Effect", pairACol: "Pair A", pairBCol: "Pair B", totalACol: "Pair A Total", totalBCol: "Pair B Total", diffCol: "Stat Diff (Pair A vs. Pair B)", tie: "0 (Tie)", customPair: "Custom Pair B Selection",
      transCol: "✦ Pair A Transcend", transTitle: "✦ Sakura Transcend Mode — Skill Additions & Pair Impact",
      skillCol: "Sakura Skill", lv5Col: "Normal Lv 5 (Awakened)", trCol: "✦ Transcend Addition", gainCol: "Transcend Gain (+Δ)",
      atk: "Infantry Squad ATK", def: "Infantry Squad DEF", hp: "Infantry Squad HP", spd: "Infantry Travel Speed",
      counter: "Squad Counter DMG", dmgRed: "DMG Taken Reduction", rageFactor: "Skill DMG Factor (Rage + Awakened)", shieldHeal: "Shield / Heal Factor",
      perksTitle: "Active Infantry Pair-vs-Pair Perks & Synergy", roleLeader: "Leader", roleAssist: "Assistant", obtain: "Obtain",
      pickLeader: "Pair A Leader", pickAssist: "Pair A Assist", pickLeaderB: "Pair B Leader", pickAssistB: "Pair B Assist",
      roles: [["all", "All Roles (16)"], ["leader", "Leaders (8)"], ["assistant", "Assistants / General (8)"]],
      tagsLabel: "Source & Specialty:", searchPlaceholder: "Search hero, skill, or effect...", reset: "Reset Filters",
      showing: (n) => `Showing ${n} of 16 Commanders`,
      chips: [["all", "All Tags"], ["All-Star Night", "All-Star Night (7)"], ["Lucky Roulette", "Lucky Roulette (7)"], ["Horde Defense", "Horde Defense (2)"], ["Rally", "Rally"], ["Garrison", "Garrison"], ["Open Field", "Open Field"], ["Counter DMG", "Counter DMG"], ["Shield / Heal", "Shield / Heal"], ["Transcend", "✦ Transcend"]],
      tier: "Tier", unit: "Unit", uAtk: "ATK (Base + Bonus = Output)", uDef: "DEF (Base + Bonus = Output)", uHp: "HP (Base + Bonus = Output)", uSpd: "Travel Speed", load: "Load", might: "Might",
      rawDiff: "Output Diff", pctDiff: "% Difference", step: "Transition", atkDiff: "ATK % Diff (Output)", defDiff: "DEF % Diff (Output)", hpDiff: "HP % Diff (Output)", spdDiff: "Speed % Diff", mightDiff: "Might Ratio",
    },
    vi: {
      stat: "Chỉ số / Hiệu ứng Kết hợp", pairACol: "Cặp A", pairBCol: "Cặp B", totalACol: "Tổng Cặp A", totalBCol: "Tổng Cặp B", diffCol: "Chênh lệch (Cặp A vs Cặp B)", tie: "0 (Bằng nhau)", customPair: "Tùy chỉnh Cặp B",
      transCol: "✦ Cặp A Transcend", transTitle: "✦ Chế độ Transcend của Sakura — Chi tiết Kỹ năng & Cộng hưởng Cặp",
      skillCol: "Kỹ năng của Sakura", lv5Col: "Lv 5 Thường (Thức tỉnh)", trCol: "✦ Hiệu ứng Transcend", gainCol: "Mức tăng Transcend (+Δ)",
      atk: "ATK Bộ binh", def: "DEF Bộ binh", hp: "HP Bộ binh", spd: "Tốc độ Hành quân",
      counter: "Sát thương Phản đòn", dmgRed: "Giảm Sát thương Nhận vào", rageFactor: "Hệ số Sát thương Kỹ năng", shieldHeal: "Hệ số Khiên / Hồi máu",
      perksTitle: "So sánh Nội tại & Cộng hưởng Cặp A vs Cặp B", roleLeader: "Tướng Chính", roleAssist: "Tướng Phụ", obtain: "Nguồn nhận",
      pickLeader: "Tướng Chính A", pickAssist: "Tướng Phụ A", pickLeaderB: "Tướng Chính B", pickAssistB: "Tướng Phụ B",
      roles: [["all", "Tất cả Vai trò (16)"], ["leader", "Tướng Chính (8)"], ["assistant", "Tướng Phụ / Đa năng (8)"]],
      tagsLabel: "Nguồn & Chuyên môn:", searchPlaceholder: "Tìm tên tướng, kỹ năng hoặc hiệu ứng...", reset: "Xóa bộ lọc",
      showing: (n) => `Hiển thị ${n} / 16 Chỉ huy`,
      chips: [["all", "Mọi Nhãn"], ["All-Star Night", "All-Star Night (7)"], ["Lucky Roulette", "Vòng Quay (7)"], ["Horde Defense", "Horde Defense (2)"], ["Rally", "Tập kết"], ["Garrison", "Đồn trú"], ["Open Field", "Đánh đồng"], ["Counter DMG", "Phản đòn"], ["Shield / Heal", "Khiên / Hồi phục"], ["Transcend", "✦ Transcend"]],
      tier: "Cấp", unit: "Đơn vị", uAtk: "ATK (Gốc + Cộng = Đầu ra)", uDef: "DEF (Gốc + Cộng = Đầu ra)", uHp: "HP (Gốc + Cộng = Đầu ra)", uSpd: "Tốc độ chạy", load: "Tải trọng", might: "Lực chiến",
      rawDiff: "Chênh lệch Đầu ra", pctDiff: "% Chênh lệch", step: "Bước chuyển", atkDiff: "% Tăng ATK (Đầu ra)", defDiff: "% Tăng DEF (Đầu ra)", hpDiff: "% Tăng HP (Đầu ra)", spdDiff: "% Tốc độ", mightDiff: "Tỷ lệ Lực chiến",
    },
    es: {
      stat: "Atributo / Efecto Combinado", pairACol: "Pareja A", pairBCol: "Pareja B", totalACol: "Total Par A", totalBCol: "Total Par B", diffCol: "Diferencia (Par A vs Par B)", tie: "0 (Empate)", customPair: "Selección Personalizada Par B",
      transCol: "✦ Pareja A Transcend", transTitle: "✦ Modo Transcend de Sakura — Adiciones por Habilidad e Impacto",
      skillCol: "Habilidad de Sakura", lv5Col: "Nv. 5 Normal (Despertar)", trCol: "✦ Adición Transcend", gainCol: "Mejora Transcend (+Δ)",
      atk: "ATQ de Infantería", def: "DEF de Infantería", hp: "HP de Infantería", spd: "Velocidad de Marcha",
      counter: "Daño de Contraataque", dmgRed: "Reducción de Daño Recibido", rageFactor: "Factor de Daño de Habilidad", shieldHeal: "Factor de Escudo / Curación",
      perksTitle: "Comparación de Ventajas y Sinergia (Par A vs Par B)", roleLeader: "Líder", roleAssist: "Asistente", obtain: "Obtención",
      pickLeader: "Líder Par A", pickAssist: "Asist. Par A", pickLeaderB: "Líder Par B", pickAssistB: "Asist. Par B",
      roles: [["all", "Todos los Roles (16)"], ["leader", "Líderes (8)"], ["assistant", "Asistentes / General (8)"]],
      tagsLabel: "Fuente y Especialidad:", searchPlaceholder: "Buscar héroe, habilidad o efecto...", reset: "Restablecer",
      showing: (n) => `Mostrando ${n} de 16 Comandantes`,
      chips: [["all", "Todas"], ["All-Star Night", "All-Star Night (7)"], ["Lucky Roulette", "Ruleta (7)"], ["Horde Defense", "Horde Defense (2)"], ["Rally", "Rally"], ["Garrison", "Guarnición"], ["Open Field", "Campo Abierto"], ["Counter DMG", "Contraataque"], ["Shield / Heal", "Escudo / Curación"], ["Transcend", "✦ Transcend"]],
      tier: "Nivel", unit: "Unidad", uAtk: "ATQ (Base + Bono = Salida)", uDef: "DEF (Base + Bono = Salida)", uHp: "HP (Base + Bono = Salida)", uSpd: "Velocidad", load: "Carga", might: "Poder",
      rawDiff: "Dif. de Salida", pctDiff: "% de Diferencia", step: "Transición", atkDiff: "% Dif. ATQ (Salida)", defDiff: "% Dif. DEF (Salida)", hpDiff: "% Dif. HP (Salida)", spdDiff: "% Velocidad", mightDiff: "Escala de Poder",
    },
  };

  let activeRole = "all", activeChip = "all", searchQuery = "";
  const getLang = () => (["vi", "es"].includes(document.documentElement.lang) ? document.documentElement.lang : "en");
  const findHero = (id) => data.heroes.find((h) => h.id === id) || data.heroes[0];
  const valAt = (arr, idx) => arr[Math.min(idx, arr.length - 1)] ?? 0;
  const pct = (a, b) => `${b >= a ? "+" : ""}${(((b - a) / a) * 100).toFixed(1)}%`;
  const calcOut = (base, bonus, prof, key) => (prof.id === "ingame" ? base + bonus : +(base * (1 + (prof[key] || 0) / 100)).toFixed(1));

  const renderCalculator = () => {
    const lang = getLang(), c = COPY[lang], lvIdx = Math.max(0, Math.min(5, Number(levelSel.value) ?? 5));
    const hLA = findHero(leaderSel.value), hAA = findHero(assistSel.value);
    const hLB = findHero(leaderBSel?.value || "julien"), hAB = findHero(assistBSel?.value || "miyamoto-doichi");
    comboThead.innerHTML = `<tr><th>${c.stat}</th><th>${c.pairACol}: ${hLA.name} + ${hAA.name}</th><th>${c.totalACol}</th><th>${c.pairBCol}: ${hLB.name} + ${hAB.name}</th><th>${c.totalBCol}</th><th>${c.diffCol}</th></tr>`;
    const keys = [[c.atk, "atk", "%"], [c.def, "def", "%"], [c.hp, "hp", "%"], [c.spd, "spd", "%"], [c.counter, "counter", "%"], [c.dmgRed, "dmgRed", "%"], [c.rageFactor, "rageFactor", ""], [c.shieldHeal, "shieldHeal", ""]];
    comboTbody.innerHTML = keys.map(([label, k, unit]) => {
      const vLA = valAt(hLA.stats[k], lvIdx), vAA = valAt(hAA.stats[k], lvIdx), sumA = +(vLA + vAA).toFixed(1);
      const vLB = valAt(hLB.stats[k], lvIdx), vAB = valAt(hAB.stats[k], lvIdx), sumB = +(vLB + vAB).toFixed(1);
      const diff = +(sumA - sumB).toFixed(1), fmt = (v) => (unit === "%" ? `+${v}%` : v.toLocaleString());
      const diffTxt = diff === 0 ? c.tie : `${diff > 0 ? "+" : ""}${unit === "%" ? `${diff}%` : diff.toLocaleString()} (${diff > 0 ? `${c.pairACol} ▲` : `${c.pairBCol} ▲`})`;
      return `<tr><td><strong>${label}</strong></td><td>${fmt(vLA)} + ${fmt(vAA)}</td><td><strong>${fmt(sumA)}</strong></td><td>${fmt(vLB)} + ${fmt(vAB)}</td><td><strong>${fmt(sumB)}</strong></td><td><strong>${diffTxt}</strong></td></tr>`;
    }).join("");
    const trHero = hLA.transcend ? hLA : hAA.transcend ? hAA : null;
    if (transcendWrap) {
      transcendWrap.innerHTML = trHero ? `<p class="card-label" style="margin-top:1.1rem">${c.transTitle}</p><table class="summary-table"><thead><tr><th>${c.skillCol}</th><th>${c.lv5Col}</th><th>${c.trCol}</th><th>${c.gainCol}</th></tr></thead><tbody>${trHero.transcend.map(([sk, n5, tr, d]) => `<tr><td><strong>${sk}</strong></td><td>${n5}</td><td><strong>${tr}</strong></td><td><span class="dls-hero-tags">${d}</span></td></tr>`).join("")}</tbody></table>` : "";
    }
    const cbA = data.combos.find((cb) => cb.leader === hLA.id && cb.assistant === hAA.id), cbB = data.combos.find((cb) => cb.leader === hLB.id && cb.assistant === hAB.id);
    if (pairBPreset) pairBPreset.value = cbB ? cbB.id : "custom";
    comboPerks.innerHTML = `<p class="card-label">${c.perksTitle}</p><p><strong>${c.pairACol} (${hLA.name} + ${hAA.name})${cbA ? ` · ★ ${cbA.tag}` : ""}:</strong> ${cbA ? cbA.note : `${hLA.perks[0]} | ${hAA.perks[0]}`}</p><p><strong>${c.pairBCol} (${hLB.name} + ${hAB.name})${cbB ? ` · ★ ${cbB.tag}` : ""}:</strong> ${cbB ? cbB.note : `${hLB.perks[0]} | ${hAB.perks[0]}`}</p><ul class="planner-list">${[...hLA.perks.map((p) => `<li><strong>[${c.pairACol}] ${hLA.name}:</strong> ${p}</li>`), ...hAA.perks.map((p) => `<li><strong>[${c.pairACol}] ${hAA.name}:</strong> ${p}</li>`), ...hLB.perks.map((p) => `<li><strong>[${c.pairBCol}] ${hLB.name}:</strong> ${p}</li>`), ...hAB.perks.map((p) => `<li><strong>[${c.pairBCol}] ${hAB.name}:</strong> ${p}</li>`)].join("")}</ul>`;
    presetBar?.querySelectorAll("[data-combo]").forEach((btn) => {
      const cb = data.combos.find((x) => x.id === btn.dataset.combo);
      btn.classList.toggle("is-active", Boolean(cb && cb.leader === hLA.id && cb.assistant === hAA.id));
    });
  };

  const renderRoster = (preserveSearchFocus = false) => {
    const lang = getLang(), c = COPY[lang], q = searchQuery.trim().toLowerCase();
    const list = data.heroes.filter((h) => (activeRole === "all" || h.role === activeRole) && (activeChip === "all" || h.source === activeChip || h.tags.includes(activeChip)) && (!q || h.name.toLowerCase().includes(q) || h.source.toLowerCase().includes(q) || h.skills.some(([t, d]) => t.toLowerCase().includes(q) || d.toLowerCase().includes(q))));
    if (!preserveSearchFocus) {
      filterBar.innerHTML = `<div class="filter-toolbar-top"><div class="filter-segmented" role="tablist">${c.roles.map(([k, lbl]) => `<button type="button" class="filter-seg-btn${activeRole === k ? " is-active" : ""}" data-role="${k}">${lbl}</button>`).join("")}</div><div class="filter-search-wrap"><input type="search" class="filter-search-input" id="ih-search-input" placeholder="${c.searchPlaceholder}" value="${searchQuery}" /></div></div><div class="filter-toolbar-bottom"><div class="filter-chip-group"><span class="filter-group-label">${c.tagsLabel}</span>${c.chips.map(([k, lbl]) => `<button type="button" class="quick-btn${activeChip === k ? " is-active" : ""}" data-chip="${k}">${lbl}</button>`).join("")}</div><div class="filter-chip-group"><span class="filter-status-meta" id="ih-filter-count">${c.showing(list.length)}</span>${activeRole !== "all" || activeChip !== "all" || q ? `<button type="button" class="quick-btn" data-reset="1">${c.reset}</button>` : ""}</div></div>`;
    } else {
      const countNode = filterBar.querySelector("#ih-filter-count");
      if (countNode) countNode.textContent = c.showing(list.length);
    }
    heroGrid.innerHTML = list.map((h) => `<article class="planner-card dls-infantry-card"><div class="dls-hero-head"><img class="dls-infantry-portrait" src="${h.img}" alt="${h.name}" loading="lazy" /><div><p class="card-label">${h.role === "leader" ? c.roleLeader : c.roleAssist} · Tier ${h.tier} · ${c.obtain}: ${h.source}</p><h3>${h.name}</h3><p class="dls-hero-tags">${h.tags.join(" · ")}</p></div></div><ul class="planner-list">${h.skills.map(([title, desc]) => `<li><strong>${title}:</strong> ${desc}</li>`).join("")}</ul><div class="button-row"><button type="button" class="quick-btn" data-pick-leader="${h.id}">${c.pickLeader}</button><button type="button" class="quick-btn" data-pick-assist="${h.id}">${c.pickAssist}</button><button type="button" class="quick-btn" data-pick-leader-b="${h.id}">${c.pickLeaderB}</button><button type="button" class="quick-btn" data-pick-assist-b="${h.id}">${c.pickAssistB}</button></div></article>`).join("");
  };

  const renderComparator = () => {
    if (!compTbody || !data.tiers) return;
    const lang = getLang(), c = COPY[lang], tA = data.tiers[Number(fromSel.value) || 0], tB = data.tiers[Number(toSel.value) || 5];
    const prof = data.buffProfiles.find((p) => p.id === buffSel.value) || data.buffProfiles[0];
    compThead.innerHTML = `<tr><th>${c.stat}</th><th>${tA.tier} ${tA.name}</th><th>${tB.tier} ${tB.name}</th><th>${c.rawDiff}</th><th>${c.pctDiff}</th></tr>`;
    const rows = [["ATK", calcOut(tA.atk[0], tA.atk[1], prof, "atkPct"), calcOut(tB.atk[0], tB.atk[1], prof, "atkPct")], ["DEF", calcOut(tA.def[0], tA.def[1], prof, "defPct"), calcOut(tB.def[0], tB.def[1], prof, "defPct")], ["HP", calcOut(tA.hp[0], tA.hp[1], prof, "hpPct"), calcOut(tB.hp[0], tB.hp[1], prof, "hpPct")], [c.uSpd, prof.id === "ingame" ? tA.spd[0] + tA.spd[1] : tA.spd[0], prof.id === "ingame" ? tB.spd[0] + tB.spd[1] : tB.spd[0]], [c.load, tA.load, tB.load], [c.might, tA.might, tB.might]];
    compTbody.innerHTML = rows.map(([label, vA, vB]) => `<tr><td><strong>${label}</strong></td><td>${vA}</td><td><strong>${vB}</strong></td><td>${vB - vA >= 0 ? "+" : ""}${+(vB - vA).toFixed(1)}</td><td><strong>${pct(vA, vB)}</strong></td></tr>`).join("");
  };

  const renderUnits = () => {
    if (!unitCards || !data.tiers) return;
    const lang = getLang(), c = COPY[lang], T = data.tiers;
    if (pairBPreset) {
      const prevP = pairBPreset.value || "julien-doichi";
      pairBPreset.innerHTML = `<option value="custom">— ${c.customPair} —</option>` + data.combos.map((cb) => `<option value="${cb.id}">★ ${findHero(cb.leader).name} + ${findHero(cb.assistant).name} (${cb.tag})</option>`).join("");
      pairBPreset.value = prevP;
    }
    unitCards.innerHTML = T.map((t) => `<article class="planner-card"><p class="card-label">${t.tier} · ${c.might}: ${t.might} · ${c.load}: ${t.load}</p><h3>${t.name}</h3><p>${t.desc[lang]}</p><img class="recipe-inline-image" src="${t.img}" alt="${t.tier} ${t.name}" loading="lazy" /></article>`).join("");
    tiersThead.innerHTML = `<tr><th>${c.tier}</th><th>${c.unit}</th><th>${c.uAtk}</th><th>${c.uDef}</th><th>${c.uHp}</th><th>${c.uSpd}</th><th>${c.load}</th><th>${c.might}</th></tr>`;
    tiersTbody.innerHTML = T.map((t) => `<tr><td><strong>${t.tier}</strong></td><td><strong>${t.name}</strong></td><td>${t.atk[0]} +${t.atk[1]} = <strong>${t.atk[0] + t.atk[1]}</strong></td><td>${t.def[0]} +${t.def[1]} = <strong>${t.def[0] + t.def[1]}</strong></td><td>${t.hp[0]} +${t.hp[1]} = <strong>${t.hp[0] + t.hp[1]}</strong></td><td>${t.spd[0]} +${t.spd[1]} = <strong>${t.spd[0] + t.spd[1]}</strong></td><td>${t.load}</td><td><strong>${t.might}</strong></td></tr>`).join("");
    const prevFrom = fromSel.value || "0", prevTo = toSel.value || "5", prevBuff = buffSel.value || "ingame";
    fromSel.innerHTML = T.map((t, i) => `<option value="${i}">${t.tier} — ${t.name}</option>`).join("");
    toSel.innerHTML = T.map((t, i) => `<option value="${i}">${t.tier} — ${t.name}</option>`).join("");
    buffSel.innerHTML = data.buffProfiles.map((p) => `<option value="${p.id}">${p.label[lang]}</option>`).join("");
    fromSel.value = prevFrom; toSel.value = prevTo; buffSel.value = prevBuff;
    renderComparator();
    deltaThead.innerHTML = `<tr><th>${c.step}</th><th>${c.atkDiff}</th><th>${c.defDiff}</th><th>${c.hpDiff}</th><th>${c.spdDiff}</th><th>${c.mightDiff}</th></tr>`;
    deltaTbody.innerHTML = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 5]].map(([i, j]) => {
      const a = T[i], b = T[j], aAtk = a.atk[0] + a.atk[1], bAtk = b.atk[0] + b.atk[1], aDef = a.def[0] + a.def[1], bDef = b.def[0] + b.def[1], aHp = a.hp[0] + a.hp[1], bHp = b.hp[0] + b.hp[1];
      return `<tr><td><strong>${a.tier} → ${b.tier}</strong></td><td>${pct(aAtk, bAtk)} (${aAtk}→${bAtk})</td><td>${pct(aDef, bDef)} (${aDef}→${bDef})</td><td>${pct(aHp, bHp)} (${aHp}→${bHp})</td><td>${pct(a.spd[0], b.spd[0])}</td><td>${a.might} → ${b.might} (${(b.might / a.might).toFixed(1)}×)</td></tr>`;
    }).join("");
  };

  const opts = data.heroes.map((h) => `<option value="${h.id}">${h.name} (${h.role === "leader" ? "Leader" : "Assistant"} · ${h.tier})</option>`).join("");
  leaderSel.innerHTML = opts; assistSel.innerHTML = opts;
  if (leaderBSel && assistBSel) { leaderBSel.innerHTML = opts; assistBSel.innerHTML = opts; leaderBSel.value = "julien"; assistBSel.value = "miyamoto-doichi"; }
  leaderSel.value = "sakura"; assistSel.value = "ammara";
  if (presetBar) {
    presetBar.innerHTML = data.combos.map((cb) => `<button type="button" class="combo-preset-chip" data-combo="${cb.id}"><span class="combo-preset-tag">★ ${cb.tag}</span><strong class="combo-preset-title">${findHero(cb.leader).name} + ${findHero(cb.assistant).name}</strong></button>`).join("");
  }
  [leaderSel, assistSel, levelSel, leaderBSel, assistBSel].forEach((el) => el?.addEventListener("change", renderCalculator));
  [fromSel, toSel, buffSel].forEach((el) => el?.addEventListener("change", renderComparator));
  presetBar?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-combo]"), cb = btn && data.combos.find((x) => x.id === btn.dataset.combo);
    if (cb) { leaderSel.value = cb.leader; assistSel.value = cb.assistant; renderCalculator(); }
  });
  pairBPreset?.addEventListener("change", () => {
    const cb = data.combos.find((x) => x.id === pairBPreset.value);
    if (cb && leaderBSel && assistBSel) { leaderBSel.value = cb.leader; assistBSel.value = cb.assistant; renderCalculator(); }
  });
  filterBar?.addEventListener("click", (e) => {
    const rBtn = e.target.closest("[data-role]"), cBtn = e.target.closest("[data-chip]"), rst = e.target.closest("[data-reset]");
    if (rBtn) activeRole = rBtn.dataset.role;
    if (cBtn) activeChip = cBtn.dataset.chip;
    if (rst) { activeRole = "all"; activeChip = "all"; searchQuery = ""; }
    if (rBtn || cBtn || rst) renderRoster();
  });
  filterBar?.addEventListener("input", (e) => { if (e.target.matches("#ih-search-input")) { searchQuery = e.target.value; renderRoster(true); } });
  heroGrid.addEventListener("click", (e) => {
    const lA = e.target.closest("[data-pick-leader]"), aA = e.target.closest("[data-pick-assist]"), lB = e.target.closest("[data-pick-leader-b]"), aB = e.target.closest("[data-pick-assist-b]");
    if (lA) leaderSel.value = lA.dataset.pickLeader;
    if (aA) assistSel.value = aA.dataset.pickAssist;
    if (lB && leaderBSel) leaderBSel.value = lB.dataset.pickLeaderB;
    if (aB && assistBSel) assistBSel.value = aB.dataset.pickAssistB;
    if (lA || aA || lB || aB) { renderCalculator(); document.querySelector("#combo-calculator-section")?.scrollIntoView({ behavior: "smooth" }); }
  });
  renderCalculator(); renderRoster(); renderUnits();
})();