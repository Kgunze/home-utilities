(() => {
  const rData = window.DLS_RIDER_DATA;
  if (!rData) return;

  const presetBar = document.querySelector("#rd-preset-combos"), leaderSel = document.querySelector("#rd-leader-select"), assistSel = document.querySelector("#rd-assist-select"), levelSel = document.querySelector("#rd-skill-level");
  const pairThead = document.querySelector("#rd-pair-thead"), pairTbody = document.querySelector("#rd-pair-tbody"), pairPerks = document.querySelector("#rd-pair-perks");
  const filterBar = document.querySelector("#rd-hero-filters"), heroesGrid = document.querySelector("#rd-riders-heroes-grid");
  const matrixThead = document.querySelector("#rd-matrix-thead"), matrixTbody = document.querySelector("#rd-matrix-tbody");
  const combosThead = document.querySelector("#rd-combos-thead"), combosTbody = document.querySelector("#rd-combos-tbody");
  const unitCards = document.querySelector("#rd-unit-cards"), tiersThead = document.querySelector("#rd-tiers-thead"), tiersTbody = document.querySelector("#rd-tiers-tbody");
  const fromSel = document.querySelector("#rd-tier-from"), toSel = document.querySelector("#rd-tier-to"), buffSel = document.querySelector("#rd-buff-profile");
  const compThead = document.querySelector("#rd-comp-thead"), compTbody = document.querySelector("#rd-comp-tbody"), deltaThead = document.querySelector("#rd-delta-thead"), deltaTbody = document.querySelector("#rd-delta-tbody");
  const csvThead = document.querySelector("#rd-csv-thead"), csvTbody = document.querySelector("#rd-csv-tbody");

  const CSV_BUFFS = [
    ["Basic", "Squad ATK", 0.8, 3.0, "All Troops ATK"], ["Basic", "Squad DEF", 0.8, 3.0, "All Troops DEF"], ["Basic", "Squad HP", 0.8, 3.0, "All Troops HP"],
    ["Basic", "Squad's basic attack DMG", 1.2, 4.5, "Normal Attack Output"], ["Basic", "Basic attack DMG taken", -1.2, -4.5, "Damage Mitigation"],
    ["Basic", "Squad counter DMG", 1.2, 4.5, "Retaliation Output"], ["Basic", "Counter DMG taken", -1.2, -4.5, "Counter Mitigation"],
    ["Basic", "Skill DMG dealt", 0.5, 2.0, "Hero Active Skill Output"], ["Basic", "Skill DMG taken by Troop", -0.5, -2.0, "Skill Mitigation"],
    ["Basic", "XY gathering speed", 2.4, null, "Economy / Resource Node"], ["Basic", "Skill DMG on zombie", 1.7, null, "PvE Infected / Cynthia Synergy"], ["Basic", "Zombie kill EXP", 2.4, null, "Hero Leveling Speed"],
    ["Advance", "Rider Squad DMG", 0.5, 5.5, "Direct Rider Total DMG"], ["Advance", "Rider Squad DMG RED", 0.5, 5.5, "Direct Rider DMG Reduction"],
    ["Advance", "Rider Squad ATK", 0.6, 7.0, "Class-Specific Rider ATK"], ["Advance", "Rider Squad DEF", 0.6, 7.0, "Class-Specific Rider DEF"],
    ["Advance", "Squad's basic attack DMG", 0.9, 10.5, "High-Roll Basic ATK Scaling"], ["Advance", "Squad counter DMG", 0.9, 10.5, "High-Roll Counter Scaling"],
    ["Advance", "Squad ATK", 0.6, 7.0, "Global Squad ATK"], ["Advance", "Squad DEF", 0.6, 7.0, "Global Squad DEF"],
  ];

  const COPY = {
    en: {
      tier: "Tier", unit: "Unit", atk: "ATK (Base + Bonus = Output)", def: "DEF (Base + Bonus = Output)", hp: "HP (Base + Bonus = Output)", spd: "Travel Speed", load: "Load", might: "Might",
      stat: "Attribute", rawDiff: "Output Diff", pctDiff: "% Difference", obtain: "Obtain from", priority: "Skill Priority",
      pickLeader: "Use as Leader", pickAssist: "Use as Assistant", leaderCol: "Leader", assistCol: "Assistant", totalCol: "Combined Pair Result", perksTitle: "Active Rider Pair Perks & Synergy",
      rAtk: "Rider Squad ATK", rDef: "Rider Squad DEF", rHp: "Rider Squad HP", rSpd: "Rider Travel Speed", rSkill: "Bonus DMG / Slow / Amp", rRed: "DMG Taken Reduction", rRage: "Skill DMG Factor (Rage)", rHeal: "Heal Factor / Rage Recovery",
      heroCol: "Hero", roleCol: "Role / Tier", srcCol: "Obtain Source", pairCol: "Rider Meta Pair", tagCol: "Tactical Role",
      type: "Type", name: "Buff Name", min: "Min %", max: "Max %", spread: "Spread (Max - Min)", t6Impact: "Rider Output Impact", fixed: "Fixed",
      step: "Tier Upgrade", atkDiff: "ATK Gain", defDiff: "DEF Gain", hpDiff: "HP Gain", spdDiff: "Speed Change", mightDiff: "Might Scaling",
      roles: [["all", "All Roles (13)"], ["leader", "Leaders (6)"], ["assistant", "Assistants (7)"]],
      tagsLabel: "Source & Specialty:", searchPlaceholder: "Search rider hero, skill, or effect...", reset: "Reset Filters", showing: (n) => `Showing ${n} of 13 Rider Commanders`,
      chips: [["all", "All Tags"], ["All-Star Night", "All-Star Night (6)"], ["Lucky Roulette", "Lucky Roulette (5)"], ["Police Station", "Police Station (3)"], ["Daily Booster Pack", "Booster / VIP (3)"], ["Siege / Rally", "Siege / Rally"], ["Garrison", "Garrison"], ["Peacekeeping", "Peacekeeping"], ["Mobility", "Mobility / Speed"], ["Support", "Support / Sustain"], ["Skills", "Skills / Burst"]],
    },
    vi: {
      tier: "Cấp", unit: "Đơn vị", atk: "ATK (Gốc + Cộng = Đầu ra)", def: "DEF (Gốc + Cộng = Đầu ra)", hp: "HP (Gốc + Cộng = Đầu ra)", spd: "Tốc độ chạy", load: "Tải trọng", might: "Lực chiến",
      stat: "Chỉ số", rawDiff: "Chênh lệch Đầu ra", pctDiff: "% Chênh lệch", obtain: "Nguồn nhận", priority: "Thứ tự Nâng kỹ năng",
      pickLeader: "Chọn làm Tướng Chính", pickAssist: "Chọn làm Tướng Phụ", leaderCol: "Tướng Chính", assistCol: "Tướng Phụ", totalCol: "Tổng Hiệu quả Cặp", perksTitle: "Nội tại Cặp Tướng Kỵ Binh & Cộng hưởng",
      rAtk: "ATK Kỵ binh", rDef: "DEF Kỵ binh", rHp: "HP Kỵ binh", rSpd: "Tốc độ Hành quân", rSkill: "Tăng Sát thương / Làm chậm", rRed: "Giảm Sát thương Nhận vào", rRage: "Hệ số Sát thương Kỹ năng", rHeal: "Hệ số Hồi máu / Hồi Nộ",
      heroCol: "Tướng", roleCol: "Vai trò / Bậc", srcCol: "Nguồn nhận", pairCol: "Cặp Kỵ Binh Meta", tagCol: "Chuyên môn Chiến thuật",
      type: "Loại", name: "Tên Chỉ số Buff", min: "Min %", max: "Max %", spread: "Biên độ (Max - Min)", t6Impact: "Tác động Kỵ binh", fixed: "Cố định",
      step: "Bước Nâng Cấp", atkDiff: "Tăng ATK", defDiff: "Tăng DEF", hpDiff: "Tăng HP", spdDiff: "Thay đổi Tốc chạy", mightDiff: "Hệ số Lực chiến",
      roles: [["all", "Tất cả Vai trò (13)"], ["leader", "Tướng Chính (6)"], ["assistant", "Tướng Phụ (7)"]],
      tagsLabel: "Nguồn & Chuyên môn:", searchPlaceholder: "Tìm tướng kỵ binh, kỹ năng hoặc hiệu ứng...", reset: "Xóa bộ lọc", showing: (n) => `Hiển thị ${n} / 13 Chỉ huy Kỵ binh`,
      chips: [["all", "Mọi Nhãn"], ["All-Star Night", "All-Star Night (6)"], ["Lucky Roulette", "Vòng Quay (5)"], ["Police Station", "Đồn Cảnh Sát (3)"], ["Daily Booster Pack", "Gói VIP / Ngày (3)"], ["Siege / Rally", "Tập kết / Công thành"], ["Garrison", "Đồn trú"], ["Peacekeeping", "Diệt Zombie"], ["Mobility", "Cơ động / Tốc độ"], ["Support", "Hỗ trợ / Hồi phục"], ["Skills", "Kỹ năng / Dồn sát thương"]],
    },
    es: {
      tier: "Nivel", unit: "Unidad", atk: "ATQ (Base + Bono = Salida)", def: "DEF (Base + Bono = Salida)", hp: "HP (Base + Bono = Salida)", spd: "Velocidad", load: "Carga", might: "Poder",
      stat: "Atributo", rawDiff: "Dif. de Salida", pctDiff: "% de Diferencia", obtain: "Obtención", priority: "Prioridad de Habilidad",
      pickLeader: "Usar como Líder", pickAssist: "Usar como Asistente", leaderCol: "Líder", assistCol: "Asistente", totalCol: "Resultado Combinado", perksTitle: "Ventajas Activas de la Pareja de Jinetes",
      rAtk: "ATQ de Jinetes", rDef: "DEF de Jinetes", rHp: "HP de Jinetes", rSpd: "Velocidad de Marcha", rSkill: "Daño Adicional / Ralentización", rRed: "Reducción de Daño Recibido", rRage: "Factor de Daño de Habilidad", rHeal: "Curación / Recuperación de Ira",
      heroCol: "Héroe", roleCol: "Rol / Nivel", srcCol: "Obtención", pairCol: "Pareja Meta de Jinetes", tagCol: "Rol Táctico",
      type: "Tipo", name: "Nombre del Bono", min: "Mín %", max: "Máx %", spread: "Rango (Máx - Mín)", t6Impact: "Impacto en Jinetes", fixed: "Fijo",
      step: "Mejora de Nivel", atkDiff: "Aumento ATQ", defDiff: "Aumento DEF", hpDiff: "Aumento HP", spdDiff: "Cambio Velocidad", mightDiff: "Escala de Poder",
      roles: [["all", "Todos los Roles (13)"], ["leader", "Líderes (6)"], ["assistant", "Asistentes (7)"]],
      tagsLabel: "Fuente y Especialidad:", searchPlaceholder: "Buscar héroe jinete, habilidad o efecto...", reset: "Restablecer", showing: (n) => `Mostrando ${n} de 13 Comandantes`,
      chips: [["all", "Todas"], ["All-Star Night", "All-Star Night (6)"], ["Lucky Roulette", "Ruleta (5)"], ["Police Station", "Estación de Policía (3)"], ["Daily Booster Pack", "Paquete VIP / Diario (3)"], ["Siege / Rally", "Asedio / Rally"], ["Garrison", "Guarnición"], ["Peacekeeping", "Caza de Zombis"], ["Mobility", "Movilidad / Velocidad"], ["Support", "Soporte / Curación"], ["Skills", "Habilidades / Explosivo"]],
    },
  };

  let activeRole = "all", activeChip = "all", searchQuery = "";
  const getLang = () => (["vi", "es"].includes(document.documentElement.lang) ? document.documentElement.lang : "en");
  const findHero = (id) => rData.heroes.find((h) => h.id === id) || rData.heroes[0];
  const pct = (a, b) => `${b >= a ? "+" : ""}${(((b - a) / a) * 100).toFixed(1)}%`;
  const calcOut = (base, bonus, prof, key) => (prof.id === "ingame" ? base + bonus : +(base * (1 + (prof[key] || 0) / 100)).toFixed(1));

  const renderPairCalc = () => {
    if (!leaderSel || !pairTbody) return;
    const lang = getLang(), c = COPY[lang], hL = findHero(leaderSel.value), hA = findHero(assistSel.value), lv = Math.max(0, Math.min(4, Number(levelSel.value) ?? 4));
    pairThead.innerHTML = `<tr><th>${c.stat}</th><th>${c.leaderCol}: ${hL.name}</th><th>${c.assistCol}: ${hA.name}</th><th>${c.totalCol}</th></tr>`;
    const keys = [[c.rAtk, "atk", "%"], [c.rDef, "def", "%"], [c.rHp, "hp", "%"], [c.rSpd, "spd", "%"], [c.rSkill, "skillDmg", "%"], [c.rRed, "dmgRed", "%"], [c.rRage, "rageFactor", ""], [c.rHeal, "healRage", ""]];
    pairTbody.innerHTML = keys.map(([label, k, unit]) => {
      const vL = hL.stats[k][lv] ?? 0, vA = hA.stats[k][lv] ?? 0, sum = +(vL + vA).toFixed(1), fmt = (v) => (unit === "%" ? `+${v}%` : v.toLocaleString());
      return `<tr><td><strong>${label}</strong></td><td>${fmt(vL)}</td><td>${fmt(vA)}</td><td><strong>${fmt(sum)}</strong></td></tr>`;
    }).join("");
    const cb = rData.combos.find((x) => x.leader === hL.id && x.assistant === hA.id);
    const perks = [...hL.perks.map((p) => `<strong>${hL.name}:</strong> ${p}`), ...hA.perks.map((p) => `<strong>${hA.name}:</strong> ${p}`)];
    pairPerks.innerHTML = `<p class="card-label">${c.perksTitle}${cb ? ` · ★ ${cb.tag}` : ""}</p>${cb ? `<p><strong>Meta Synergy:</strong> ${cb.note}</p>` : ""}<ul class="planner-list">${perks.map((p) => `<li>${p}</li>`).join("")}</ul>`;
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
      filterBar.innerHTML = `<div class="filter-toolbar-top"><div class="filter-segmented" role="tablist">${c.roles.map(([k, lbl]) => `<button type="button" class="filter-seg-btn${activeRole === k ? " is-active" : ""}" data-role="${k}">${lbl}</button>`).join("")}</div><div class="filter-search-wrap"><input type="search" class="filter-search-input" id="rd-search-input" placeholder="${c.searchPlaceholder}" value="${searchQuery}" /></div></div><div class="filter-toolbar-bottom"><div class="filter-chip-group"><span class="filter-group-label">${c.tagsLabel}</span>${c.chips.map(([k, lbl]) => `<button type="button" class="quick-btn${activeChip === k ? " is-active" : ""}" data-chip="${k}">${lbl}</button>`).join("")}</div><div class="filter-chip-group"><span class="filter-status-meta" id="rd-filter-count">${c.showing(list.length)}</span>${activeRole !== "all" || activeChip !== "all" || q ? `<button type="button" class="quick-btn" data-reset="1">${c.reset}</button>` : ""}</div></div>`;
    } else if (filterBar) {
      const cnt = filterBar.querySelector("#rd-filter-count");
      if (cnt) cnt.textContent = c.showing(list.length);
    }
    heroesGrid.innerHTML = list.map((h) => `<article class="planner-card dls-infantry-card"><div class="dls-hero-head"><img class="dls-infantry-portrait" src="${h.img}" alt="${h.name}" loading="lazy" /><div><p class="card-label">Tier ${h.tier} · ${c.obtain}: ${h.source}</p><h3>${h.name}</h3><p class="dls-hero-tags">${h.spec} · ${c.priority}: ${h.priority}</p></div></div><ul class="planner-list">${h.skills.map(([t, d]) => `<li><strong>${t}:</strong> ${d}</li>`).join("")}</ul><div class="button-row"><button type="button" class="quick-btn" data-pick-leader="${h.id}">${c.pickLeader}</button><button type="button" class="quick-btn" data-pick-assist="${h.id}">${c.pickAssist}</button></div></article>`).join("");
  };

  const renderComparator = () => {
    const lang = getLang(), c = COPY[lang], T = rData.tiers, tA = T[Number(fromSel.value) || 0], tB = T[Number(toSel.value) || 5], prof = rData.buffProfiles.find((p) => p.id === buffSel.value) || rData.buffProfiles[0];
    compThead.innerHTML = `<tr><th>${c.stat}</th><th>${tA.tier} ${tA.name}</th><th>${tB.tier} ${tB.name}</th><th>${c.rawDiff}</th><th>${c.pctDiff}</th></tr>`;
    const rows = [["ATK", calcOut(tA.atk[0], tA.atk[1], prof, "atkPct"), calcOut(tB.atk[0], tB.atk[1], prof, "atkPct")], ["DEF", calcOut(tA.def[0], tA.def[1], prof, "defPct"), calcOut(tB.def[0], tB.def[1], prof, "defPct")], ["HP", calcOut(tA.hp[0], tA.hp[1], prof, "hpPct"), calcOut(tB.hp[0], tB.hp[1], prof, "hpPct")], [c.spd, calcOut(tA.spd[0], tA.spd[1], prof, "spdPct"), calcOut(tB.spd[0], tB.spd[1], prof, "spdPct")], [c.load, tA.load, tB.load], [c.might, tA.might, tB.might]];
    compTbody.innerHTML = rows.map(([label, vA, vB]) => `<tr><td><strong>${label}</strong></td><td>${vA}</td><td><strong>${vB}</strong></td><td>${vB - vA >= 0 ? "+" : ""}${+(vB - vA).toFixed(1)}</td><td><strong>${pct(vA, vB)}</strong></td></tr>`).join("");
  };

  const renderAll = () => {
    const lang = getLang(), c = COPY[lang], T = rData.tiers;
    renderHeroesRoster(); renderPairCalc();
    matrixThead.innerHTML = `<tr><th>${c.heroCol}</th><th>${c.roleCol}</th><th>${c.srcCol}</th><th>${c.rAtk}</th><th>${c.rDef}</th><th>${c.rHp}</th><th>${c.rSpd}</th><th>${c.rSkill}</th><th>${c.rRed}</th><th>${c.rRage}</th><th>${c.rHeal}</th></tr>`;
    matrixTbody.innerHTML = rData.heroes.map((h) => `<tr><td><strong>${h.name}</strong></td><td>${h.role === "leader" ? c.leaderCol : c.assistCol} · <strong>${h.tier}</strong></td><td>${h.source}</td><td>+${h.stats.atk[4]}%</td><td>+${h.stats.def[4]}%</td><td>+${h.stats.hp[4]}%</td><td>+${h.stats.spd[4]}%</td><td>+${h.stats.skillDmg[4]}%</td><td>+${h.stats.dmgRed[4]}%</td><td><strong>${h.stats.rageFactor[4].toLocaleString()}</strong></td><td>${h.stats.healRage[4].toLocaleString()}</td></tr>`).join("");
    combosThead.innerHTML = `<tr><th>${c.pairCol}</th><th>${c.tagCol}</th><th>${c.rAtk}</th><th>${c.rDef}</th><th>${c.rHp}</th><th>${c.rSpd}</th><th>${c.rRed}</th><th>${c.rRage}</th><th>${c.rHeal}</th></tr>`;
    combosTbody.innerHTML = rData.combos.map((cb) => {
      const L = findHero(cb.leader), A = findHero(cb.assistant);
      return `<tr><td><strong>${L.name} + ${A.name}</strong></td><td>${cb.tag}</td><td><strong>+${L.stats.atk[4] + A.stats.atk[4]}%</strong></td><td>+${L.stats.def[4] + A.stats.def[4]}%</td><td>+${L.stats.hp[4] + A.stats.hp[4]}%</td><td>+${L.stats.spd[4] + A.stats.spd[4]}%</td><td>+${L.stats.dmgRed[4] + A.stats.dmgRed[4]}%</td><td><strong>${(L.stats.rageFactor[4] + A.stats.rageFactor[4]).toLocaleString()}</strong></td><td>${(L.stats.healRage[4] + A.stats.healRage[4]).toLocaleString()}</td></tr>`;
    }).join("");
    if (unitCards) unitCards.innerHTML = T.map((t) => `<article class="planner-card"><p class="card-label">${t.tier} · ${c.might}: ${t.might} · ${c.load}: ${t.load}</p><h3>${t.name}</h3><p>${t.desc[lang]}</p><img class="recipe-inline-image" src="${t.img}" alt="${t.tier} ${t.name}" loading="lazy" /></article>`).join("");
    tiersThead.innerHTML = `<tr><th>${c.tier}</th><th>${c.unit}</th><th>${c.atk}</th><th>${c.def}</th><th>${c.hp}</th><th>${c.spd}</th><th>${c.load}</th><th>${c.might}</th></tr>`;
    tiersTbody.innerHTML = T.map((t) => `<tr><td><strong>${t.tier}</strong></td><td><strong>${t.name}</strong></td><td>${t.atk[0]} +${t.atk[1]} = <strong>${t.atk[0] + t.atk[1]}</strong></td><td>${t.def[0]} +${t.def[1]} = <strong>${t.def[0] + t.def[1]}</strong></td><td>${t.hp[0]} +${t.hp[1]} = <strong>${t.hp[0] + t.hp[1]}</strong></td><td>${t.spd[0].toLocaleString()} +${t.spd[1]} = <strong>${(t.spd[0] + t.spd[1]).toLocaleString()}</strong></td><td>${t.load}</td><td><strong>${t.might}</strong></td></tr>`).join("");
    const prevFrom = fromSel.value || "0", prevTo = toSel.value || "5", prevBuff = buffSel.value || "ingame";
    fromSel.innerHTML = T.map((t, i) => `<option value="${i}">${t.tier} — ${t.name}</option>`).join("");
    toSel.innerHTML = T.map((t, i) => `<option value="${i}">${t.tier} — ${t.name}</option>`).join("");
    buffSel.innerHTML = rData.buffProfiles.map((p) => `<option value="${p.id}">${p.label[lang]}</option>`).join("");
    fromSel.value = prevFrom; toSel.value = prevTo; buffSel.value = prevBuff;
    renderComparator();
    if (deltaThead && deltaTbody) {
      deltaThead.innerHTML = `<tr><th>${c.step}</th><th>${c.atkDiff}</th><th>${c.defDiff}</th><th>${c.hpDiff}</th><th>${c.spdDiff}</th><th>${c.mightDiff}</th></tr>`;
      deltaTbody.innerHTML = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 5]].map(([i, j]) => {
        const a = T[i], b = T[j], aAtk = a.atk[0] + a.atk[1], bAtk = b.atk[0] + b.atk[1], aDef = a.def[0] + a.def[1], bDef = b.def[0] + b.def[1], aHp = a.hp[0] + a.hp[1], bHp = b.hp[0] + b.hp[1], aSpd = a.spd[0] + a.spd[1], bSpd = b.spd[0] + b.spd[1];
        return `<tr><td><strong>${a.tier} → ${b.tier}</strong></td><td>${pct(aAtk, bAtk)} (${aAtk}→${bAtk})</td><td>${pct(aDef, bDef)} (${aDef}→${bDef})</td><td>${pct(aHp, bHp)} (${aHp}→${bHp})</td><td>${pct(aSpd, bSpd)} (${aSpd}→${bSpd})</td><td>${a.might} → ${b.might} (${(b.might / a.might).toFixed(1)}×)</td></tr>`;
      }).join("");
    }
    csvThead.innerHTML = `<tr><th>${c.type}</th><th>${c.name}</th><th>${c.min}</th><th>${c.max}</th><th>${c.spread}</th><th>${c.t6Impact}</th></tr>`;
    csvTbody.innerHTML = CSV_BUFFS.map(([type, name, min, max, note]) => `<tr><td><strong>${type}</strong></td><td>${name}</td><td>${min}%</td><td>${max !== null ? `${max}%` : "—"}</td><td><strong>${max !== null ? `${max - min >= 0 ? "+" : ""}${(max - min).toFixed(1)}% (${(max / min).toFixed(1)}×)` : c.fixed}</strong></td><td>${note}</td></tr>`).join("");
  };

  if (leaderSel && assistSel) {
    leaderSel.innerHTML = rData.heroes.map((h) => `<option value="${h.id}">${h.name} (${h.tier} · ${h.spec.split(" · ")[1]})</option>`).join("");
    assistSel.innerHTML = rData.heroes.map((h) => `<option value="${h.id}">${h.name} (${h.tier} · ${h.spec.split(" · ")[1]})</option>`).join("");
    leaderSel.value = "metok-tso"; assistSel.value = "rubina";
  }
  if (presetBar) {
    presetBar.innerHTML = rData.combos.map((cb) => `<button type="button" class="combo-preset-chip" data-combo="${cb.id}"><span class="combo-preset-tag">★ ${cb.tag}</span><strong class="combo-preset-title">${findHero(cb.leader).name} + ${findHero(cb.assistant).name}</strong></button>`).join("");
    presetBar.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-combo]"), cb = btn && rData.combos.find((x) => x.id === btn.dataset.combo);
      if (cb) { leaderSel.value = cb.leader; assistSel.value = cb.assistant; renderPairCalc(); }
    });
  }
  [leaderSel, assistSel, levelSel].forEach((el) => el?.addEventListener("change", renderPairCalc));
  filterBar?.addEventListener("click", (e) => {
    const rBtn = e.target.closest("[data-role]"), cBtn = e.target.closest("[data-chip]"), rst = e.target.closest("[data-reset]");
    if (rBtn) activeRole = rBtn.dataset.role;
    if (cBtn) activeChip = cBtn.dataset.chip;
    if (rst) { activeRole = "all"; activeChip = "all"; searchQuery = ""; }
    if (rBtn || cBtn || rst) renderHeroesRoster();
  });
  filterBar?.addEventListener("input", (e) => { if (e.target.matches("#rd-search-input")) { searchQuery = e.target.value; renderHeroesRoster(true); } });
  heroesGrid?.addEventListener("click", (e) => {
    const lBtn = e.target.closest("[data-pick-leader]"), aBtn = e.target.closest("[data-pick-assist]");
    if (lBtn) leaderSel.value = lBtn.dataset.pickLeader;
    if (aBtn) assistSel.value = aBtn.dataset.pickAssist;
    if (lBtn || aBtn) { renderPairCalc(); document.querySelector("#rider-heroes-section")?.scrollIntoView({ behavior: "smooth" }); }
  });
  [fromSel, toSel, buffSel].forEach((el) => el?.addEventListener("change", renderComparator));
  renderAll();
  new MutationObserver(renderAll).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
