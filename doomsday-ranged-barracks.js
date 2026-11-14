(() => {
  const rData = window.DLS_RANGED_DATA;
  const presetBar = document.querySelector("#rb-preset-combos"), leaderSel = document.querySelector("#rb-leader-select"), assistSel = document.querySelector("#rb-assist-select"), levelSel = document.querySelector("#rb-skill-level");
  const pairThead = document.querySelector("#rb-pair-thead"), pairTbody = document.querySelector("#rb-pair-tbody"), pairPerks = document.querySelector("#rb-pair-perks");
  const filterBar = document.querySelector("#rb-hero-filters"), heroesGrid = document.querySelector("#rb-ranged-heroes-grid"), unitCards = document.querySelector("#rb-unit-cards");
  const tiersThead = document.querySelector("#rb-tiers-thead"), tiersTbody = document.querySelector("#rb-tiers-tbody");
  const fromSelect = document.querySelector("#rb-tier-from"), toSelect = document.querySelector("#rb-tier-to"), buffSelect = document.querySelector("#rb-buff-profile");
  const compThead = document.querySelector("#rb-comp-thead"), compTbody = document.querySelector("#rb-comp-tbody");
  const deltaThead = document.querySelector("#rb-delta-thead"), deltaTbody = document.querySelector("#rb-delta-tbody"), csvThead = document.querySelector("#rb-csv-thead"), csvTbody = document.querySelector("#rb-csv-tbody");
  if (!unitCards || !tiersTbody || !rData) return;

  const TIERS = [
    { tier: "T1", name: "Ranger", atk: [99, 83], def: [94, 59], hp: [95, 41], spd: [880, 321], load: 7, might: 1, img: "assets/doomsday/ranged/t1-ranger.jpg", desc: { en: "Armed with simple wooden bows, these survivors kill passers-by with silent arrows.", vi: "Trang bị cung gỗ đơn giản, tiêu diệt mục tiêu bằng những mũi tên lặng lẽ.", es: "Armados con arcos de madera simples, eliminan objetivos con flechas silenciosas." } },
    { tier: "T2", name: "Rogue", atk: [129, 109], def: [122, 77], hp: [124, 54], spd: [840, 307], load: 9, might: 2, img: "assets/doomsday/ranged/t2-rogue.jpg", desc: { en: "More combat-capable than the average archer, they use compound bows to improve their accuracy.", vi: "Thiện chiến hơn cung thủ thường, dùng cung trợ lực để tăng độ chính xác.", es: "Más capaces en combate, usan arcos compuestos para mejorar su precisión." } },
    { tier: "T3", name: "Archer", atk: [158, 133], def: [150, 95], hp: [154, 67], spd: [800, 292], load: 10, might: 3, img: "assets/doomsday/ranged/t3-archer.jpg", desc: { en: "Equipped with precision compound crossbows, they often strike at difficult-to-defend areas.", vi: "Trang bị nỏ trợ lực chính xác, chuyên bắn phá các vị trí hiểm yếu khó phòng thủ.", es: "Equipados con ballestas compuestas de precisión, atacan puntos difíciles de defender." } },
    { tier: "T4", name: "Elite Heart Piercer", atk: [178, 150], def: [169, 107], hp: [173, 75], spd: [760, 277], load: 11, might: 5, img: "assets/doomsday/ranged/t4-elite-heart-piercer.jpg", desc: { en: "They can detect every movement, and their sniper rifles pose a threat to rear targets.", vi: "Phát hiện mọi chuyển động, súng bắn tỉa của họ đe dọa trực tiếp hàng sau của địch.", es: "Detectan cada movimiento y sus rifles de francotirador amenazan la retaguardia." } },
    { tier: "T5", name: "Armored Heart Piercer", atk: [220, 185], def: [188, 119], hp: [192, 83], spd: [725, 265], load: 12, might: 9, img: "assets/doomsday/ranged/t5-armored-heart-piercer.jpg", desc: { en: "Outstanding snipers excelling at long-range combat, equipped with powerful firearms.", vi: "Xạ thủ bọc thép xuất sắc trong tác chiến tầm xa với hỏa lực súng trường mạnh mẽ.", es: "Francotiradores blindados sobresalientes a larga distancia con armas potentes." } },
    { tier: "T6", name: "Ace Heart Piercer", atk: [254, 214], def: [207, 131], hp: [222, 96], spd: [690, 252], load: 14, might: 15, img: "assets/doomsday/ranged/t6-ace-heart-piercer.jpg", desc: { en: "With their heavy sniper rifles and unparalleled shooting skills, they're an unstoppable force!", vi: "Sở hữu súng bắn tỉa hạng nặng và kỹ năng thiện xạ đỉnh cao không thể cản phá!", es: "¡Con rifles pesados de francotirador y puntería sin igual, son una fuerza imparable!" } },
  ];

  const BUFF_PROFILES = [
    { id: "ingame", atkPct: 84.2, defPct: 63.1, hpPct: 43.2, label: { en: "In-Game Screenshot Bonus (+84.2% ATK)", vi: "Chỉ số Cộng thêm trong Ảnh (+84.2% ATK)", es: "Bono de Captura en Juego (+84.2% ATQ)" } },
    { id: "nova_ethan", atkPct: 92.0, defPct: 73.0, hpPct: 76.0, label: { en: "Nova + Ethan Garrison Pair (+92% ATK, +73% DEF, +76% HP)", vi: "Cặp Nova + Ethan (+92% ATK, +73% DEF, +76% HP)", es: "Pareja Nova + Ethan (+92% ATQ, +73% DEF, +76% HP)" } },
    { id: "seb_cedric", atkPct: 70.0, defPct: 60.0, hpPct: 70.0, label: { en: "Sebastian + Cedric S+ Rally Pair (+70% ATK, +60% DEF, +70% HP)", vi: "Cặp Sebastian + Cedric (+70% ATK, +60% DEF, +70% HP)", es: "Pareja Sebastian + Cedric (+70% ATQ, +60% DEF, +70% HP)" } },
    { id: "julia_bard", atkPct: 50.0, defPct: 45.0, hpPct: 65.0, label: { en: "Julia + Bard Silence/Siege Pair (+50% ATK, +45% DEF, +65% HP)", vi: "Cặp Julia + Bard (+50% ATK, +45% DEF, +65% HP)", es: "Pareja Julia + Bard (+50% ATQ, +45% DEF, +65% HP)" } },
    { id: "ethan_sophie", atkPct: 84.0, defPct: 38.0, hpPct: 68.0, label: { en: "Ethan + Sophie Burst Pair (+84% ATK, +38% DEF, +68% HP)", vi: "Cặp Ethan + Sophie (+84% ATK, +38% DEF, +68% HP)", es: "Pareja Ethan + Sophie (+84% ATQ, +38% DEF, +68% HP)" } },
    { id: "nakano_louis", atkPct: 95.0, defPct: 0.0, hpPct: 10.0, label: { en: "Nakano Maaya + Louis Pair (+95% ATK, +30% Skill DMG)", vi: "Cặp Nakano + Louis (+95% ATK, +30% Sát thương Kỹ năng)", es: "Pareja Nakano + Louis (+95% ATQ, +30% Daño Habilidad)" } },
    { id: "base", atkPct: 0, defPct: 0, hpPct: 0, label: { en: "Raw Base Stats (0% Buff)", vi: "Chỉ số Gốc (0% Buff)", es: "Estadísticas Base (0% Bono)" } },
    { id: "basic_max", atkPct: 3.0, defPct: 3.0, hpPct: 3.0, label: { en: "Basic Roll Max (+3.0% ATK/DEF/HP)", vi: "Basic Tối đa (+3.0% ATK/DEF/HP)", es: "Básico Máx. (+3.0% ATQ/DEF/HP)" } },
    { id: "adv_max", atkPct: 14.0, defPct: 14.0, hpPct: 3.0, label: { en: "Advance Roll Max (+14% Ranger+Squad ATK/DEF)", vi: "Advance Tối đa (+14% ATK/DEF)", es: "Avanzado Máx. (+14% ATQ/DEF)" } },
  ];

  const CSV_BUFFS = [
    ["Basic", "Squad ATK", 0.8, 3.0, "All Troops ATK"], ["Basic", "Squad DEF", 0.8, 3.0, "All Troops DEF"], ["Basic", "Squad HP", 0.8, 3.0, "All Troops HP"],
    ["Basic", "Squad's basic attack DMG", 1.2, 4.5, "Normal Attack Output"], ["Basic", "Basic attack DMG taken", -1.2, -4.5, "Damage Mitigation"],
    ["Basic", "Squad counter DMG", 1.2, 4.5, "Retaliation Output"], ["Basic", "Counter DMG taken", -1.2, -4.5, "Counter Mitigation"],
    ["Basic", "Skill DMG dealt", 0.5, 2.0, "Hero Active Skill Output"], ["Basic", "Skill DMG taken by Troop", -0.5, -2.0, "Skill Mitigation"],
    ["Basic", "XY gathering speed", 2.4, null, "Economy / Resource Node"], ["Basic", "Skill DMG on zombie", 1.7, null, "PvE Infected / Hive Mind"], ["Basic", "Zombie kill EXP", 2.4, null, "Hero Leveling Speed"],
    ["Advance", "Infantry / Rider / Ranger Squad DMG", 0.5, 5.5, "Direct Ranger Total DMG"], ["Advance", "Infantry / Rider / Ranger Squad DMG RED", 0.5, 5.5, "Direct Ranger DMG Reduction"],
    ["Advance", "Infantry / Rider / Ranger Squad ATK", 0.6, 7.0, "Class-Specific Ranger ATK"], ["Advance", "Infantry / Rider / Ranger Squad DEF", 0.6, 7.0, "Class-Specific Ranger DEF"],
    ["Advance", "Squad's basic attack DMG", 0.9, 10.5, "High-Roll Basic ATK Scaling"], ["Advance", "Squad counter DMG", 0.9, 10.5, "High-Roll Counter Scaling"],
    ["Advance", "Squad ATK", 0.6, 7.0, "Global Squad ATK"], ["Advance", "Squad DEF", 0.6, 7.0, "Global Squad DEF"],
  ];

  const COPY = {
    en: {
      tier: "Tier", unit: "Unit", atk: "ATK (Base + Bonus = Output)", def: "DEF (Base + Bonus = Output)", hp: "HP (Base + Bonus = Output)", spd: "Travel Speed", load: "Load", might: "Might",
      stat: "Attribute", rawDiff: "Output Diff", pctDiff: "% Difference", step: "Transition", atkDiff: "ATK % Diff (Output)", defDiff: "DEF % Diff (Output)", hpDiff: "HP % Diff (Output)", spdDiff: "Speed % Diff", mightDiff: "Might Ratio",
      type: "Type", name: "Buff Name", min: "Min %", max: "Max %", spread: "Spread (Max - Min)", t6Impact: "T6 Ace Output Impact", fixed: "Fixed", obtain: "Obtain from", priority: "Skill Priority",
      pickLeader: "Use as Leader", pickAssist: "Use as Assistant", leaderCol: "Leader", assistCol: "Assistant", totalCol: "Combined Pair Result", perksTitle: "Active Ranged Pair Perks & Synergy",
      rAtk: "Ranged Squad ATK", rDef: "Ranged Squad DEF", rHp: "Ranged Squad HP", rSpd: "Ranged Travel Speed", rSkill: "Bonus DMG / Skill DMG Amp", rRed: "DMG Taken Reduction", rRage: "Skill DMG Factor (Rage)", rHeal: "Heal Factor / Rage Recovery",
      roles: [["all", "All Roles (15)"], ["leader", "Leaders (7)"], ["assistant", "Assistants / Support (8)"]],
      tagsLabel: "Source & Specialty:", searchPlaceholder: "Search ranged hero, skill, or effect...", reset: "Reset Filters", showing: (n) => `Showing ${n} of 15 Ranged Commanders`,
      chips: [["all", "All Tags"], ["All-Star Night", "All-Star Night (6)"], ["Lucky Roulette", "Lucky Roulette (7)"], ["Police Station", "Police Station (2)"], ["Horde Defense", "Horde Defense (1)"], ["Siege / Rally", "Siege / Rally"], ["Garrison", "Garrison"], ["General", "General / Open Field"], ["Support / Heal", "Support / Heal"]],
    },
    vi: {
      tier: "Cấp", unit: "Đơn vị", atk: "ATK (Gốc + Cộng = Đầu ra)", def: "DEF (Gốc + Cộng = Đầu ra)", hp: "HP (Gốc + Cộng = Đầu ra)", spd: "Tốc độ chạy", load: "Tải trọng", might: "Lực chiến",
      stat: "Chỉ số", rawDiff: "Chênh lệch Đầu ra", pctDiff: "% Chênh lệch", step: "Bước chuyển", atkDiff: "% Tăng ATK (Đầu ra)", defDiff: "% Tăng DEF (Đầu ra)", hpDiff: "% Tăng HP (Đầu ra)", spdDiff: "% Tốc độ", mightDiff: "Tỷ lệ Lực chiến",
      type: "Loại", name: "Tên Chỉ số Buff", min: "Min %", max: "Max %", spread: "Biên độ (Max - Min)", t6Impact: "Tác động Đầu ra T6", fixed: "Cố định", obtain: "Nguồn nhận", priority: "Thứ tự Nâng kỹ năng",
      pickLeader: "Chọn làm Tướng Chính", pickAssist: "Chọn làm Tướng Phụ", leaderCol: "Tướng Chính", assistCol: "Tướng Phụ", totalCol: "Tổng Hiệu quả Cặp", perksTitle: "Nội tại Cặp Tướng Tầm Xa & Cộng hưởng",
      rAtk: "ATK Tầm xa", rDef: "DEF Tầm xa", rHp: "HP Tầm xa", rSpd: "Tốc độ Hành quân", rSkill: "Tăng Sát thương / Kỹ năng", rRed: "Giảm Sát thương Nhận vào", rRage: "Hệ số Sát thương Kỹ năng", rHeal: "Hệ số Hồi máu / Hồi Nộ",
      roles: [["all", "Tất cả Vai trò (15)"], ["leader", "Tướng Chính (7)"], ["assistant", "Tướng Phụ / Hỗ trợ (8)"]],
      tagsLabel: "Nguồn & Chuyên môn:", searchPlaceholder: "Tìm tướng tầm xa, kỹ năng hoặc hiệu ứng...", reset: "Xóa bộ lọc", showing: (n) => `Hiển thị ${n} / 15 Chỉ huy Tầm xa`,
      chips: [["all", "Mọi Nhãn"], ["All-Star Night", "All-Star Night (6)"], ["Lucky Roulette", "Vòng Quay (7)"], ["Police Station", "Đồn Cảnh Sát (2)"], ["Horde Defense", "Horde Defense (1)"], ["Siege / Rally", "Tập kết / Công thành"], ["Garrison", "Đồn trú"], ["General", "Đa năng / Đánh đồng"], ["Support / Heal", "Hỗ trợ / Hồi máu"]],
    },
    es: {
      tier: "Nivel", unit: "Unidad", atk: "ATQ (Base + Bono = Salida)", def: "DEF (Base + Bono = Salida)", hp: "HP (Base + Bono = Salida)", spd: "Velocidad", load: "Carga", might: "Poder",
      stat: "Atributo", rawDiff: "Dif. de Salida", pctDiff: "% de Diferencia", step: "Transición", atkDiff: "% Dif. ATQ (Salida)", defDiff: "% Dif. DEF (Salida)", hpDiff: "% Dif. HP (Salida)", spdDiff: "% Velocidad", mightDiff: "Escala de Poder",
      type: "Tipo", name: "Nombre del Bono", min: "Mín %", max: "Máx %", spread: "Rango (Máx - Mín)", t6Impact: "Impacto en Salida T6", fixed: "Fijo", obtain: "Obtención", priority: "Prioridad de Habilidad",
      pickLeader: "Usar como Líder", pickAssist: "Usar como Asistente", leaderCol: "Líder", assistCol: "Asistente", totalCol: "Resultado Combinado", perksTitle: "Ventajas Activas de la Pareja y Sinergia",
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
      filterBar.innerHTML = `<div class="filter-toolbar-top"><div class="filter-segmented" role="tablist">${c.roles.map(([k, lbl]) => `<button type="button" class="filter-seg-btn${activeRole === k ? " is-active" : ""}" data-role="${k}">${lbl}</button>`).join("")}</div><div class="filter-search-wrap"><input type="search" class="filter-search-input" id="rb-search-input" placeholder="${c.searchPlaceholder}" value="${searchQuery}" /></div></div><div class="filter-toolbar-bottom"><div class="filter-chip-group"><span class="filter-group-label">${c.tagsLabel}</span>${c.chips.map(([k, lbl]) => `<button type="button" class="quick-btn${activeChip === k ? " is-active" : ""}" data-chip="${k}">${lbl}</button>`).join("")}</div><div class="filter-chip-group"><span class="filter-status-meta" id="rb-filter-count">${c.showing(list.length)}</span>${activeRole !== "all" || activeChip !== "all" || q ? `<button type="button" class="quick-btn" data-reset="1">${c.reset}</button>` : ""}</div></div>`;
    } else if (filterBar) {
      const cnt = filterBar.querySelector("#rb-filter-count");
      if (cnt) cnt.textContent = c.showing(list.length);
    }
    heroesGrid.innerHTML = list.map((h) => `<article class="planner-card dls-infantry-card"><div class="dls-hero-head"><img class="dls-infantry-portrait" src="${h.img}" alt="${h.name}" loading="lazy" /><div><p class="card-label">Tier ${h.tier} · ${c.obtain}: ${h.source}</p><h3>${h.name}</h3><p class="dls-hero-tags">${h.spec} · ${c.priority}: ${h.priority}</p></div></div><ul class="planner-list">${h.skills.map(([t, d]) => `<li><strong>${t}:</strong> ${d}</li>`).join("")}</ul><div class="button-row"><button type="button" class="quick-btn" data-pick-leader="${h.id}">${c.pickLeader}</button><button type="button" class="quick-btn" data-pick-assist="${h.id}">${c.pickAssist}</button></div></article>`).join("");
  };

  const renderComparator = () => {
    const lang = getLang(), c = COPY[lang], tA = TIERS[Number(fromSelect.value) || 0], tB = TIERS[Number(toSelect.value) || 5], prof = BUFF_PROFILES.find((p) => p.id === buffSelect.value) || BUFF_PROFILES[0];
    compThead.innerHTML = `<tr><th>${c.stat}</th><th>${tA.tier} ${tA.name}</th><th>${tB.tier} ${tB.name}</th><th>${c.rawDiff}</th><th>${c.pctDiff}</th></tr>`;
    const rows = [["ATK", calcOut(tA.atk[0], tA.atk[1], prof, "atkPct"), calcOut(tB.atk[0], tB.atk[1], prof, "atkPct")], ["DEF", calcOut(tA.def[0], tA.def[1], prof, "defPct"), calcOut(tB.def[0], tB.def[1], prof, "defPct")], ["HP", calcOut(tA.hp[0], tA.hp[1], prof, "hpPct"), calcOut(tB.hp[0], tB.hp[1], prof, "hpPct")], [c.spd, prof.id === "ingame" ? tA.spd[0] + tA.spd[1] : tA.spd[0], prof.id === "ingame" ? tB.spd[0] + tB.spd[1] : tB.spd[0]], [c.load, tA.load, tB.load], [c.might, tA.might, tB.might]];
    compTbody.innerHTML = rows.map(([label, vA, vB]) => `<tr><td><strong>${label}</strong></td><td>${vA}</td><td><strong>${vB}</strong></td><td>${vB - vA >= 0 ? "+" : ""}${+(vB - vA).toFixed(1)}</td><td><strong>${pct(vA, vB)}</strong></td></tr>`).join("");
  };

  const renderAll = () => {
    const lang = getLang(), c = COPY[lang];
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
    leaderSel.innerHTML = rData.heroes.map((h) => `<option value="${h.id}">${h.name} (${h.tier} · ${h.spec.split(" · ")[1]})</option>`).join("");
    assistSel.innerHTML = rData.heroes.map((h) => `<option value="${h.id}">${h.name} (${h.tier} · ${h.spec.split(" · ")[1]})</option>`).join("");
    leaderSel.value = "nova"; assistSel.value = "ethan";
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
  filterBar?.addEventListener("input", (e) => { if (e.target.matches("#rb-search-input")) { searchQuery = e.target.value; renderHeroesRoster(true); } });
  heroesGrid?.addEventListener("click", (e) => {
    const lBtn = e.target.closest("[data-pick-leader]"), aBtn = e.target.closest("[data-pick-assist]");
    if (lBtn) leaderSel.value = lBtn.dataset.pickLeader;
    if (aBtn) assistSel.value = aBtn.dataset.pickAssist;
    if (lBtn || aBtn) { renderPairCalc(); document.querySelector("#ranged-heroes-section")?.scrollIntoView({ behavior: "smooth" }); }
  });
  [fromSelect, toSelect, buffSelect].forEach((el) => el?.addEventListener("change", renderComparator));
  renderAll();
  new MutationObserver(renderAll).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
