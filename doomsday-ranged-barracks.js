(() => {
  const rData = window.DLS_RANGED_DATA;
  const presetBar = document.querySelector("#rb-preset-combos"), leaderSel = document.querySelector("#rb-leader-select"), assistSel = document.querySelector("#rb-assist-select"), levelSel = document.querySelector("#rb-skill-level");
  const pairBPreset = document.querySelector("#rb-pair-b-preset"), leaderBSel = document.querySelector("#rb-leader-b-select"), assistBSel = document.querySelector("#rb-assist-b-select");
  const pairThead = document.querySelector("#rb-pair-thead"), pairTbody = document.querySelector("#rb-pair-tbody"), pairPerks = document.querySelector("#rb-pair-perks");
  const radarSection = document.querySelector("#rb-radar-section");
  const filterBar = document.querySelector("#rb-hero-filters"), heroesGrid = document.querySelector("#rb-ranged-heroes-grid"), unitCards = document.querySelector("#rb-unit-cards");
  const tiersThead = document.querySelector("#rb-tiers-thead"), tiersTbody = document.querySelector("#rb-tiers-tbody");
  const fromSelect = document.querySelector("#rb-tier-from"), toSelect = document.querySelector("#rb-tier-to"), buffSelect = document.querySelector("#rb-buff-profile");
  const compThead = document.querySelector("#rb-comp-thead"), compTbody = document.querySelector("#rb-comp-tbody");
  const deltaThead = document.querySelector("#rb-delta-thead"), deltaTbody = document.querySelector("#rb-delta-tbody"), csvThead = document.querySelector("#rb-csv-thead"), csvTbody = document.querySelector("#rb-csv-tbody");
  if (!unitCards || !tiersTbody || !rData) return;

  const TIERS = rData.tiers, BUFF_PROFILES = rData.buffProfiles, CSV_BUFFS = rData.csvBuffs;

  const COPY = {
    en: {
      tier: "Tier", unit: "Unit", atk: "ATK (Base + Bonus = Output)", def: "DEF (Base + Bonus = Output)", hp: "HP (Base + Bonus = Output)", spd: "Travel Speed", load: "Load", might: "Might",
      stat: "Attribute", rawDiff: "Output Diff", pctDiff: "% Difference", step: "Transition", atkDiff: "ATK % Diff (Output)", defDiff: "DEF % Diff (Output)", hpDiff: "HP % Diff (Output)", spdDiff: "Speed % Diff", mightDiff: "Might Ratio",
      type: "Type", name: "Buff Name", min: "Min %", max: "Max %", spread: "Spread (Max - Min)", t6Impact: "T6 Ace Output Impact", fixed: "Fixed", obtain: "Obtain from", priority: "Skill Priority",
      pickLeader: "Pair A Leader", pickAssist: "Pair A Assist", pickLeaderB: "Pair B Leader", pickAssistB: "Pair B Assist",
      pairACol: "Pair A", pairBCol: "Pair B", totalACol: "Pair A Total", totalBCol: "Pair B Total", diffCol: "Stat Diff (Pair A vs. Pair B)", tie: "0 (Tie)", customPair: "Custom Pair B Selection", perksTitle: "Active Ranged Pair-vs-Pair Perks & Synergy",
      rAtk: "Ranged Squad ATK", rDef: "Ranged Squad DEF", rHp: "Ranged Squad HP", rSpd: "Ranged Travel Speed", rSkill: "Bonus DMG / Skill DMG Amp", rRed: "DMG Taken Reduction", rRage: "Skill DMG Factor (Rage)", rHeal: "Heal Factor / Rage Recovery",
      roles: [["all", "All Roles (15)"], ["leader", "Leaders (7)"], ["assistant", "Assistants / Support (8)"]],
      tagsLabel: "Source & Specialty:", searchPlaceholder: "Search ranged hero, skill, or effect...", reset: "Reset Filters", showing: (n) => `Showing ${n} of 15 Ranged Commanders`,
      chips: [["all", "All Tags"], ["All-Star Night", "All-Star Night (6)"], ["Lucky Roulette", "Lucky Roulette (7)"], ["Police Station", "Police Station (2)"], ["Horde Defense", "Horde Defense (1)"], ["Siege / Rally", "Siege / Rally"], ["Garrison", "Garrison"], ["General", "General / Open Field"], ["Support / Heal", "Support / Heal"]],
    },
    vi: {
      tier: "Cấp", unit: "Đơn vị", atk: "ATK (Gốc + Cộng = Đầu ra)", def: "DEF (Gốc + Cộng = Đầu ra)", hp: "HP (Gốc + Cộng = Đầu ra)", spd: "Tốc độ chạy", load: "Tải trọng", might: "Lực chiến",
      stat: "Chỉ số", rawDiff: "Chênh lệch Đầu ra", pctDiff: "% Chênh lệch", step: "Bước chuyển", atkDiff: "% Tăng ATK (Đầu ra)", defDiff: "% Tăng DEF (Đầu ra)", hpDiff: "% Tăng HP (Đầu ra)", spdDiff: "% Tốc độ", mightDiff: "Tỷ lệ Lực chiến",
      type: "Loại", name: "Tên Chỉ số Buff", min: "Min %", max: "Max %", spread: "Biên độ (Max - Min)", t6Impact: "Tác động Đầu ra T6", fixed: "Cố định", obtain: "Nguồn nhận", priority: "Thứ tự Nâng kỹ năng",
      pickLeader: "Tướng Chính A", pickAssist: "Tướng Phụ A", pickLeaderB: "Tướng Chính B", pickAssistB: "Tướng Phụ B",
      pairACol: "Cặp A", pairBCol: "Cặp B", totalACol: "Tổng Cặp A", totalBCol: "Tổng Cặp B", diffCol: "Chênh lệch (Cặp A vs Cặp B)", tie: "0 (Bằng nhau)", customPair: "Tùy chỉnh Cặp B", perksTitle: "So sánh Nội tại & Cộng hưởng Cặp A vs Cặp B",
      rAtk: "ATK Tầm xa", rDef: "DEF Tầm xa", rHp: "HP Tầm xa", rSpd: "Tốc độ Hành quân", rSkill: "Tăng Sát thương / Kỹ năng", rRed: "Giảm Sát thương Nhận vào", rRage: "Hệ số Sát thương Kỹ năng", rHeal: "Hệ số Hồi máu / Hồi Nộ",
      roles: [["all", "Tất cả Vai trò (15)"], ["leader", "Tướng Chính (7)"], ["assistant", "Tướng Phụ / Hỗ trợ (8)"]],
      tagsLabel: "Nguồn & Chuyên môn:", searchPlaceholder: "Tìm tướng tầm xa, kỹ năng hoặc hiệu ứng...", reset: "Xóa bộ lọc", showing: (n) => `Hiển thị ${n} / 15 Chỉ huy Tầm xa`,
      chips: [["all", "Mọi Nhãn"], ["All-Star Night", "All-Star Night (6)"], ["Lucky Roulette", "Vòng Quay (7)"], ["Police Station", "Đồn Cảnh Sát (2)"], ["Horde Defense", "Horde Defense (1)"], ["Siege / Rally", "Tập kết / Công thành"], ["Garrison", "Đồn trú"], ["General", "Đa năng / Đánh đồng"], ["Support / Heal", "Hỗ trợ / Hồi máu"]],
    },
    es: {
      tier: "Nivel", unit: "Unidad", atk: "ATQ (Base + Bono = Salida)", def: "DEF (Base + Bono = Salida)", hp: "HP (Base + Bono = Salida)", spd: "Velocidad", load: "Carga", might: "Poder",
      stat: "Atributo", rawDiff: "Dif. de Salida", pctDiff: "% de Diferencia", step: "Transición", atkDiff: "% Dif. ATQ (Salida)", defDiff: "% Dif. DEF (Salida)", hpDiff: "% Dif. HP (Salida)", spdDiff: "% Velocidad", mightDiff: "Escala de Poder",
      type: "Tipo", name: "Nombre del Bono", min: "Mín %", max: "Máx %", spread: "Rango (Máx - Mín)", t6Impact: "Impacto en Salida T6", fixed: "Fijo", obtain: "Obtención", priority: "Prioridad de Habilidad",
      pickLeader: "Líder Par A", pickAssist: "Asist. Par A", pickLeaderB: "Líder Par B", pickAssistB: "Asist. Par B",
      pairACol: "Pareja A", pairBCol: "Pareja B", totalACol: "Total Par A", totalBCol: "Total Par B", diffCol: "Diferencia (Par A vs Par B)", tie: "0 (Empate)", customPair: "Selección Personalizada Par B", perksTitle: "Comparación de Ventajas y Sinergia (Par A vs Par B)",
      rAtk: "ATQ a Distancia", rDef: "DEF a Distancia", rHp: "HP a Distancia", rSpd: "Velocidad de Marcha", rSkill: "Daño Adicional / Habilidad", rRed: "Reducción de Daño Recibido", rRage: "Factor de Daño de Habilidad", rHeal: "Curación / Recuperación de Ira",
      roles: [["all", "Todos los Roles (15)"], ["leader", "Líderes (7)"], ["assistant", "Asistentes / Soporte (8)"]],
      tagsLabel: "Fuente y Especialidad:", searchPlaceholder: "Buscar héroe, habilidad o efecto...", reset: "Restablecer", showing: (n) => `Mostrando ${n} de 15 Comandantes`,
      chips: [["all", "Todas"], ["All-Star Night", "All-Star Night (6)"], ["Lucky Roulette", "Ruleta (7)"], ["Police Station", "Estación de Policía (2)"], ["Horde Defense", "Horde Defense (1)"], ["Siege / Rally", "Asedio / Rally"], ["Garrison", "Guarnición"], ["General", "General / Campo"], ["Support / Heal", "Soporte / Curación"]],
    },
  };

  let activeRole = "all", activeChip = "all", searchQuery = "";
  const getLang = () => (["vi", "es"].includes(document.documentElement.lang) ? document.documentElement.lang : "en");
  const findHero = (id) => rData.heroes.find((h) => h.id === id) || rData.heroes[0];
  const pct = (a, b) => `${b >= a ? "+" : ""}${(((b - a) / a) * 100).toFixed(1)}%`;
  const calcOut = (base, bonus, profile, key) => (profile.id === "ingame" ? base + bonus : +(base * (1 + (profile[key] || 0) / 100)).toFixed(1));

  const renderPairCalc = () => {
    if (!leaderSel || !pairTbody) return;
    const lang = getLang(), c = COPY[lang], lv = Math.max(0, Math.min(4, Number(levelSel.value) ?? 4));
    const hL = findHero(leaderSel.value), hA = findHero(assistSel.value);
    const hLB = findHero(leaderBSel?.value || "sebastian"), hAB = findHero(assistBSel?.value || "cedric");
    pairThead.innerHTML = `<tr><th>${c.stat}</th><th>${c.pairACol}: ${hL.name} + ${hA.name}</th><th>${c.totalACol}</th><th>${c.pairBCol}: ${hLB.name} + ${hAB.name}</th><th>${c.totalBCol}</th><th>${c.diffCol}</th></tr>`;
    const keys = [[c.rAtk, "atk", "%"], [c.rDef, "def", "%"], [c.rHp, "hp", "%"], [c.rSpd, "spd", "%"], [c.rSkill, "skillDmg", "%"], [c.rRed, "dmgRed", "%"], [c.rRage, "rageFactor", ""], [c.rHeal, "healRage", ""]];
    pairTbody.innerHTML = keys.map(([label, k, unit]) => {
      const vLA = hL.stats[k][lv] ?? 0, vAA = hA.stats[k][lv] ?? 0, sumA = +(vLA + vAA).toFixed(1);
      const vLB = hLB.stats[k][lv] ?? 0, vAB = hAB.stats[k][lv] ?? 0, sumB = +(vLB + vAB).toFixed(1);
      const diff = +(sumA - sumB).toFixed(1), fmt = (v) => (unit === "%" ? `+${v}%` : v.toLocaleString());
      const diffTxt = diff === 0 ? c.tie : `${diff > 0 ? "+" : ""}${unit === "%" ? `${diff}%` : diff.toLocaleString()} (${diff > 0 ? `${c.pairACol} ▲` : `${c.pairBCol} ▲`})`;
      return `<tr><td><strong>${label}</strong></td><td>${fmt(vLA)} + ${fmt(vAA)}</td><td><strong>${fmt(sumA)}</strong></td><td>${fmt(vLB)} + ${fmt(vAB)}</td><td><strong>${fmt(sumB)}</strong></td><td><strong>${diffTxt}</strong></td></tr>`;
    }).join("");
    const totalsA = {}, totalsB = {};
    keys.forEach(([, k]) => {
      totalsA[k] = +((hL.stats[k][lv] ?? 0) + (hA.stats[k][lv] ?? 0)).toFixed(1);
      totalsB[k] = +((hLB.stats[k][lv] ?? 0) + (hAB.stats[k][lv] ?? 0)).toFixed(1);
    });
    if (window.DLS_SQUAD_RADAR && radarSection) {
      window.DLS_SQUAD_RADAR.render(radarSection, { title: c.pairACol, subtitle: `${hL.name} + ${hA.name}`, values: totalsA }, { title: c.pairBCol, subtitle: `${hLB.name} + ${hAB.name}`, values: totalsB });
    }
    const cbA = rData.combos.find((x) => x.leader === hL.id && x.assistant === hA.id), cbB = rData.combos.find((x) => x.leader === hLB.id && x.assistant === hAB.id);
    if (pairBPreset) pairBPreset.value = cbB ? cbB.id : "custom";
    pairPerks.innerHTML = `<p class="card-label">${c.perksTitle}</p><p><strong>${c.pairACol} (${hL.name} + ${hA.name})${cbA ? ` · ★ ${cbA.tag}` : ""}:</strong> ${cbA ? cbA.note : `${hL.perks[0]} | ${hA.perks[0]}`}</p><p><strong>${c.pairBCol} (${hLB.name} + ${hAB.name})${cbB ? ` · ★ ${cbB.tag}` : ""}:</strong> ${cbB ? cbB.note : `${hLB.perks[0]} | ${hAB.perks[0]}`}</p><ul class="planner-list">${[...hL.perks.map((p) => `<li><strong>[${c.pairACol}] ${hL.name}:</strong> ${p}</li>`), ...hA.perks.map((p) => `<li><strong>[${c.pairACol}] ${hA.name}:</strong> ${p}</li>`), ...hLB.perks.map((p) => `<li><strong>[${c.pairBCol}] ${hLB.name}:</strong> ${p}</li>`), ...hAB.perks.map((p) => `<li><strong>[${c.pairBCol}] ${hAB.name}:</strong> ${p}</li>`)].join("")}</ul>`;
    presetBar?.querySelectorAll("[data-combo]").forEach((btn) => {
      const item = rData.combos.find((x) => x.id === btn.dataset.combo);
      btn.classList.toggle("is-active", Boolean(item && item.leader === hL.id && item.assistant === hA.id));
    });
  };

  const renderHeroesRoster = (preserveFocus = false) => {
    if (!heroesGrid) return;
    const lang = getLang(), c = COPY[lang], q = searchQuery.trim().toLowerCase();
    const list = rData.heroes.filter((h) => (activeRole === "all" || h.role === activeRole) && (activeChip === "all" || h.source.includes(activeChip) || h.spec.includes(activeChip)) && (!q || h.name.toLowerCase().includes(q) || h.source.toLowerCase().includes(q) || h.spec.toLowerCase().includes(q) || h.skills.some(([t, d]) => t.toLowerCase().includes(q) || d.toLowerCase().includes(q))));
    if (filterBar && !preserveFocus) {
      filterBar.innerHTML = `<div class="filter-toolbar-top"><div class="filter-segmented" role="tablist">${c.roles.map(([k, lbl]) => `<button type="button" class="filter-seg-btn${activeRole === k ? " is-active" : ""}" data-role="${k}">${lbl}</button>`).join("")}</div><div class="filter-search-wrap"><input type="search" class="filter-search-input" id="rb-search-input" placeholder="${c.searchPlaceholder}" value="${searchQuery}" /></div></div><div class="filter-toolbar-bottom"><div class="filter-chip-group"><span class="filter-group-label">${c.tagsLabel}</span>${c.chips.map(([k, lbl]) => `<button type="button" class="quick-btn${activeChip === k ? " is-active" : ""}" data-chip="${k}">${lbl}</button>`).join("")}</div><div class="filter-chip-group"><span class="filter-status-meta" id="rb-filter-count">${c.showing(list.length)}</span>${activeRole !== "all" || activeChip !== "all" || q ? `<button type="button" class="quick-btn" data-reset="1">${c.reset}</button>` : ""}</div></div>`;
    } else if (filterBar) {
      const cnt = filterBar.querySelector("#rb-filter-count");
      if (cnt) cnt.textContent = c.showing(list.length);
    }
    heroesGrid.innerHTML = list.map((h) => `<article class="planner-card dls-infantry-card"><div class="dls-hero-head"><img class="dls-infantry-portrait" src="${h.img}" alt="${h.name}" loading="lazy" /><div><p class="card-label">Tier ${h.tier} · ${c.obtain}: ${h.source}</p><h3>${h.name}</h3><p class="dls-hero-tags">${h.spec} · ${c.priority}: ${h.priority}</p></div></div><ul class="planner-list">${h.skills.map(([t, d]) => `<li><strong>${t}:</strong> ${d}</li>`).join("")}</ul><div class="button-row"><button type="button" class="quick-btn" data-pick-leader="${h.id}">${c.pickLeader}</button><button type="button" class="quick-btn" data-pick-assist="${h.id}">${c.pickAssist}</button><button type="button" class="quick-btn" data-pick-leader-b="${h.id}">${c.pickLeaderB}</button><button type="button" class="quick-btn" data-pick-assist-b="${h.id}">${c.pickAssistB}</button></div></article>`).join("");
  };

  const renderComparator = () => {
    const lang = getLang(), c = COPY[lang], tA = TIERS[Number(fromSelect.value) || 0], tB = TIERS[Number(toSelect.value) || 5], prof = BUFF_PROFILES.find((p) => p.id === buffSelect.value) || BUFF_PROFILES[0];
    compThead.innerHTML = `<tr><th>${c.stat}</th><th>${tA.tier} ${tA.name}</th><th>${tB.tier} ${tB.name}</th><th>${c.rawDiff}</th><th>${c.pctDiff}</th></tr>`;
    const rows = [["ATK", calcOut(tA.atk[0], tA.atk[1], prof, "atkPct"), calcOut(tB.atk[0], tB.atk[1], prof, "atkPct")], ["DEF", calcOut(tA.def[0], tA.def[1], prof, "defPct"), calcOut(tB.def[0], tB.def[1], prof, "defPct")], ["HP", calcOut(tA.hp[0], tA.hp[1], prof, "hpPct"), calcOut(tB.hp[0], tB.hp[1], prof, "hpPct")], [c.spd, prof.id === "ingame" ? tA.spd[0] + tA.spd[1] : tA.spd[0], prof.id === "ingame" ? tB.spd[0] + tB.spd[1] : tB.spd[0]], [c.load, tA.load, tB.load], [c.might, tA.might, tB.might]];
    compTbody.innerHTML = rows.map(([label, vA, vB]) => `<tr><td><strong>${label}</strong></td><td>${vA}</td><td><strong>${vB}</strong></td><td>${vB - vA >= 0 ? "+" : ""}${+(vB - vA).toFixed(1)}</td><td><strong>${pct(vA, vB)}</strong></td></tr>`).join("");
  };

  const renderAll = () => {
    const lang = getLang(), c = COPY[lang];
    if (pairBPreset) {
      const prevP = pairBPreset.value || "sebastian-cedric";
      pairBPreset.innerHTML = `<option value="custom">— ${c.customPair} —</option>` + rData.combos.map((cb) => `<option value="${cb.id}">★ ${findHero(cb.leader).name} + ${findHero(cb.assistant).name} (${cb.tag})</option>`).join("");
      pairBPreset.value = prevP;
    }
    renderHeroesRoster(); renderPairCalc();
    unitCards.innerHTML = TIERS.map((t) => `<article class="planner-card"><p class="card-label">${t.tier} · ${c.might}: ${t.might} · ${c.load}: ${t.load}</p><h3>${t.name}</h3><p>${t.desc[lang]}</p><img class="recipe-inline-image" src="${t.img}" alt="${t.tier} ${t.name}" loading="lazy" /></article>`).join("");
    tiersThead.innerHTML = `<tr><th>${c.tier}</th><th>${c.unit}</th><th>${c.atk}</th><th>${c.def}</th><th>${c.hp}</th><th>${c.spd}</th><th>${c.load}</th><th>${c.might}</th></tr>`;
    tiersTbody.innerHTML = TIERS.map((t) => `<tr><td><strong>${t.tier}</strong></td><td><strong>${t.name}</strong></td><td>${t.atk[0]} +${t.atk[1]} = <strong>${t.atk[0] + t.atk[1]}</strong></td><td>${t.def[0]} +${t.def[1]} = <strong>${t.def[0] + t.def[1]}</strong></td><td>${t.hp[0]} +${t.hp[1]} = <strong>${t.hp[0] + t.hp[1]}</strong></td><td>${t.spd[0]} +${t.spd[1]} = <strong>${t.spd[0] + t.spd[1]}</strong></td><td>${t.load}</td><td><strong>${t.might}</strong></td></tr>`).join("");
    const prevFrom = fromSelect.value || "0", prevTo = toSelect.value || "5", prevBuff = buffSelect.value || "ingame";
    fromSelect.innerHTML = TIERS.map((t, i) => `<option value="${i}">${t.tier} — ${t.name}</option>`).join("");
    toSelect.innerHTML = TIERS.map((t, i) => `<option value="${i}">${t.tier} — ${t.name}</option>`).join("");
    buffSelect.innerHTML = BUFF_PROFILES.map((p) => `<option value="${p.id}">${p.label[lang]}</option>`).join("");
    fromSelect.value = prevFrom; toSelect.value = prevTo; buffSelect.value = prevBuff;
    renderComparator();
    deltaThead.innerHTML = `<tr><th>${c.step}</th><th>${c.atkDiff}</th><th>${c.defDiff}</th><th>${c.hpDiff}</th><th>${c.spdDiff}</th><th>${c.mightDiff}</th></tr>`;
    deltaTbody.innerHTML = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 5]].map(([i, j]) => {
      const a = TIERS[i], b = TIERS[j], aAtk = a.atk[0] + a.atk[1], bAtk = b.atk[0] + b.atk[1], aDef = a.def[0] + a.def[1], bDef = b.def[0] + b.def[1], aHp = a.hp[0] + a.hp[1], bHp = b.hp[0] + b.hp[1];
      return `<tr><td><strong>${a.tier} → ${b.tier}</strong></td><td>${pct(aAtk, bAtk)} (${aAtk}→${bAtk})</td><td>${pct(aDef, bDef)} (${aDef}→${bDef})</td><td>${pct(aHp, bHp)} (${aHp}→${bHp})</td><td>${pct(a.spd[0], b.spd[0])}</td><td>${a.might} → ${b.might} (${(b.might / a.might).toFixed(1)}×)</td></tr>`;
    }).join("");
    csvThead.innerHTML = `<tr><th>${c.type}</th><th>${c.name}</th><th>${c.min}</th><th>${c.max}</th><th>${c.spread}</th><th>${c.t6Impact}</th></tr>`;
    csvTbody.innerHTML = CSV_BUFFS.map(([type, name, min, max, note]) => `<tr><td><strong>${type}</strong></td><td>${name}</td><td>${min}%</td><td>${max !== null ? `${max}%` : "—"}</td><td><strong>${max !== null ? `${max - min >= 0 ? "+" : ""}${(max - min).toFixed(1)}% (${(max / min).toFixed(1)}×)` : c.fixed}</strong></td><td>${note}</td></tr>`).join("");
  };

  if (leaderSel && assistSel) {
    const opts = rData.heroes.map((h) => `<option value="${h.id}">${h.name} (${h.tier} · ${h.spec.split(" · ")[1]})</option>`).join("");
    leaderSel.innerHTML = opts; assistSel.innerHTML = opts;
    if (leaderBSel && assistBSel) { leaderBSel.innerHTML = opts; assistBSel.innerHTML = opts; leaderBSel.value = "sebastian"; assistBSel.value = "cedric"; }
    leaderSel.value = "nova"; assistSel.value = "ethan";
  }
  if (presetBar) {
    presetBar.innerHTML = rData.combos.map((cb) => `<button type="button" class="combo-preset-chip" data-combo="${cb.id}"><span class="combo-preset-tag">★ ${cb.tag}</span><strong class="combo-preset-title">${findHero(cb.leader).name} + ${findHero(cb.assistant).name}</strong></button>`).join("");
    presetBar.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-combo]"), cb = btn && rData.combos.find((x) => x.id === btn.dataset.combo);
      if (cb) { leaderSel.value = cb.leader; assistSel.value = cb.assistant; renderPairCalc(); }
    });
  }
  pairBPreset?.addEventListener("change", () => {
    const cb = rData.combos.find((x) => x.id === pairBPreset.value);
    if (cb && leaderBSel && assistBSel) { leaderBSel.value = cb.leader; assistBSel.value = cb.assistant; renderPairCalc(); }
  });
  [leaderSel, assistSel, levelSel, leaderBSel, assistBSel].forEach((el) => el?.addEventListener("change", renderPairCalc));
  filterBar?.addEventListener("click", (e) => {
    const rBtn = e.target.closest("[data-role]"), cBtn = e.target.closest("[data-chip]"), rst = e.target.closest("[data-reset]");
    if (rBtn) activeRole = rBtn.dataset.role;
    if (cBtn) activeChip = cBtn.dataset.chip;
    if (rst) { activeRole = "all"; activeChip = "all"; searchQuery = ""; }
    if (rBtn || cBtn || rst) renderHeroesRoster();
  });
  filterBar?.addEventListener("input", (e) => { if (e.target.matches("#rb-search-input")) { searchQuery = e.target.value; renderHeroesRoster(true); } });
  heroesGrid?.addEventListener("click", (e) => {
    const lA = e.target.closest("[data-pick-leader]"), aA = e.target.closest("[data-pick-assist]"), lB = e.target.closest("[data-pick-leader-b]"), aB = e.target.closest("[data-pick-assist-b]");
    if (lA) leaderSel.value = lA.dataset.pickLeader;
    if (aA) assistSel.value = aA.dataset.pickAssist;
    if (lB && leaderBSel) leaderBSel.value = lB.dataset.pickLeaderB;
    if (aB && assistBSel) assistBSel.value = aB.dataset.pickAssistB;
    if (lA || aA || lB || aB) { renderPairCalc(); document.querySelector("#ranged-heroes-section")?.scrollIntoView({ behavior: "smooth" }); }
  });
  [fromSelect, toSelect, buffSelect].forEach((el) => el?.addEventListener("change", renderComparator));
  renderAll();
  new MutationObserver(renderAll).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
