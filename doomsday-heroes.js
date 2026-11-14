(() => {
  const heroGrid = document.querySelector("#dls-hero-grid");
  const filterBar = document.querySelector("#dls-hero-filters");
  if (!heroGrid) return;

  const HEROES = [
    {
      name: "Peggy", rarity: "legendary", squad: "support", level: 36, stars: 4, image: "assets/doomsday/heroes/peggy.jpg",
      tags: { en: "Garrison · Infected · Support", vi: "Đồn trú · Zombie · Hỗ trợ", es: "Guarnición · Infectados · Apoyo" },
      note: {
        en: "Skills: Summons Automated Turret in Explore + Garrison DEF & Infected DMG bonus.",
        vi: "Kỹ năng: Gọi Trụ Súng Tự Động trong Explore + tăng DEF Đồn trú & sát thương lên Zombie.",
        es: "Habilidades: Invoca Torreta en Explore + bono DEF de Guarnición y daño a Infectados.",
      },
    },
    {
      name: "Jaden", rarity: "legendary", squad: "support", level: 1, stars: 2, image: "assets/doomsday/heroes/jaden.jpg",
      tags: { en: "Infected · Control · Tactical", vi: "Zombie · Khống chế · Chiến thuật", es: "Infectados · Control · Táctico" },
      note: {
        en: "Skills: Summons zombie decoys, slows waves in Z-Virus, and boosts Peacekeeping DMG.",
        vi: "Kỹ năng: Triệu hồi mồi nhử zombie, làm chậm đàn quái Z-Virus và tăng sát thương PvE.",
        es: "Habilidades: Invoca señuelos, ralentiza oleadas en Z-Virus y aumenta daño PvE.",
      },
    },
    {
      name: "Catherine", rarity: "legendary", squad: "rider", level: 1, stars: 1, image: "assets/doomsday/heroes/catherine.jpg",
      tags: { en: "Rider · Rally · Mobility", vi: "Kỵ binh · Tập kết · Cơ động", es: "Jinetes · Rally · Movilidad" },
      note: {
        en: "Skills: High-burst active skill DMG + Rider Squad ATK & Travel Speed bonus.",
        vi: "Kỹ năng: Sát thương kỹ năng chủ động cực lớn + tăng ATK và tốc độ chạy Kỵ binh.",
        es: "Habilidades: Alto daño explosivo activo + bono de ATQ y velocidad para Jinetes.",
      },
    },
    {
      name: "Martin", rarity: "legendary", squad: "support", level: 1, stars: 1, image: "assets/doomsday/heroes/martin.jpg",
      tags: { en: "General · Rally · Support", vi: "Đa dụng · Tập kết · Hỗ trợ", es: "General · Rally · Apoyo" },
      note: {
        en: "Skills: Squad healing + all-troop ATK/DEF/HP buff and counter DMG reduction.",
        vi: "Kỹ năng: Hồi phục quân số + tăng ATK/DEF/HP toàn đội và giảm sát thương phản đòn.",
        es: "Habilidades: Curación de escuadrón + bono ATQ/DEF/HP general y reducción de contraataque.",
      },
    },
    {
      name: "Cynthia", rarity: "legendary", squad: "rider", level: 1, stars: 1, image: "assets/doomsday/heroes/cynthia.jpg",
      tags: { en: "Rider · Peacekeeping · Speed", vi: "Kỵ binh · Diệt Zombie · Tốc độ", es: "Jinetes · Pacificación · Velocidad" },
      note: {
        en: "Skills: Rider Squad ATK & March Speed + extra Skill DMG on Zombies (+1.7% CSV synergy).",
        vi: "Kỹ năng: Tăng ATK & Tốc độ Kỵ binh + tăng sát thương kỹ năng lên Zombie (+1.7% CSV).",
        es: "Habilidades: ATQ y Velocidad de Jinetes + daño extra de habilidad contra Zombies.",
      },
    },
    {
      name: "Angela", rarity: "elite", squad: "ranged", level: 24, stars: 3, image: "assets/doomsday/heroes/angela.jpg",
      tags: { en: "Ranged · Skirmish Core · AoE", vi: "Cung thủ · Chủ lực Skirmish · AoE", es: "Tiradores · Núcleo Escaramuza · AoE" },
      note: {
        en: "Skills: Multi-target AoE volley + Ranged Squad ATK/DEF. Level to 32 with Kris & Michele.",
        vi: "Kỹ năng: Mưa đạn AoE + tăng ATK/DEF Cung thủ. Nâng lên Lv 32 cùng Kris & Michele.",
        es: "Habilidades: Descarga AoE + ATQ/DEF de Tiradores. Subir a Nv. 32 con Kris y Michele.",
      },
    },
    {
      name: "Jintae", rarity: "elite", squad: "infantry", level: 21, stars: 3, image: "assets/doomsday/heroes/jintae.jpg",
      tags: { en: "Infantry · Melee · Frontline", vi: "Bộ binh · Cận chiến · Tiên phong", es: "Infantería · Cuerpo a cuerpo · Tanque" },
      note: {
        en: "Skills: Katana frontal cleave + Infantry Squad ATK/DEF (+0.6%–7% CSV) & Counter DMG (+1.2%–10.5% CSV).",
        vi: "Kỹ năng: Chém kiếm diện rộng + tăng ATK/DEF Bộ binh (+0.6%–7% CSV) & Phản đòn (+1.2%–10.5% CSV).",
        es: "Habilidades: Corte frontal + ATQ/DEF de Infantería (+0.6%–7% CSV) y Contraataque (+1.2%–10.5% CSV).",
      },
    },
    {
      name: "Liam", rarity: "elite", squad: "infantry", level: 15, stars: 2, image: "assets/doomsday/heroes/liam.jpg",
      tags: { en: "Infantry · Garrison · Barricade", vi: "Bộ binh · Đồn trú · Rào chắn", es: "Infantería · Guarnición · Barricada" },
      note: {
        en: "Skills: Deploys Barricade in Explore + Infantry Squad DEF/HP & DMG Reduction (+0.5%–5.5% CSV).",
        vi: "Kỹ năng: Đặt Rào Chắn trong Explore + tăng DEF/HP Bộ binh & Giảm sát thương (+0.5%–5.5% CSV).",
        es: "Habilidades: Coloca Barricada en Explore + DEF/HP de Infantería y Reducción de Daño (+0.5%–5.5% CSV).",
      },
    },
    {
      name: "Norah", rarity: "elite", squad: "ranged", level: 10, stars: 2, image: "assets/doomsday/heroes/norah.jpg",
      tags: { en: "Ranged Squad · Siege · Attack", vi: "Cung thủ · Công thành · Tấn công", es: "Tiradores · Asedio · Ataque" },
      note: {
        en: "Skills (5-1-0-0): Dawn Companion (42,780 Might), Ranged Squad ATK & Siege DMG. Rescue after 6 Stim Packs!",
        vi: "Kỹ năng (5-1-0-0): Dawn Companion (42.780 lực chiến), tăng ATK Cung thủ & Công thành. Giải cứu sau 6 ống tiêm!",
        es: "Habilidades (5-1-0-0): Dawn Companion (42,780 Poder), ATQ Tiradores y Asedio. ¡Rescatar tras 6 Stim Packs!",
      },
    },
    {
      name: "Charlie", rarity: "elite", squad: "ranged", level: 1, stars: 1, image: "assets/doomsday/heroes/charlie.jpg",
      tags: { en: "Ranged · Garrison · Turret", vi: "Cung thủ · Đồn trú · Pháo đài", es: "Tiradores · Guarnición · Torreta" },
      note: {
        en: "Skills: Explosive ranged blast + Ranged Squad DEF & Shelter Garrison DMG mitigation.",
        vi: "Kỹ năng: Đạn nổ tầm xa + tăng DEF Cung thủ & giảm sát thương khi đồn trú giữ nhà.",
        es: "Habilidades: Disparo explosivo + DEF de Tiradores y mitigación de daño en Guarnición.",
      },
    },
    {
      name: "Kris", rarity: "uncommon", squad: "support", level: 21, stars: 2, image: "assets/doomsday/heroes/kris.jpg",
      tags: { en: "Skirmish Trio · Support · Control", vi: "Bộ ba Skirmish · Hỗ trợ · Khống chế", es: "Trío de Escaramuza · Apoyo · Control" },
      note: {
        en: "Skills: Crowd-control grenade + Adventure ATK synergy for the Lv 32 Angela–Kris–Michele trio.",
        vi: "Kỹ năng: Lựu đạn khống chế + cộng hưởng ATK Thám hiểm cho bộ 3 Angela–Kris–Michele Lv 32.",
        es: "Habilidades: Granada de control + sinergia ATQ de Aventura para el trío Nv. 32.",
      },
    },
    {
      name: "Michele", rarity: "uncommon", squad: "support", level: 20, stars: 2, image: "assets/doomsday/heroes/michele.jpg",
      tags: { en: "Skirmish Trio · Gathering · Utility", vi: "Bộ ba Skirmish · Thu thập · Đa dụng", es: "Trío de Escaramuza · Recolección · Utilidad" },
      note: {
        en: "Skills: Completes the Lv 32 Skirmish trio + boosts XY Gathering Speed (+2.4% CSV) & Load.",
        vi: "Kỹ năng: Hoàn thiện bộ 3 Skirmish Lv 32 + tăng Tốc độ Thu thập (+2.4% CSV) & Tải trọng.",
        es: "Habilidades: Completa el trío Nv. 32 + aumenta Velocidad de Recolección (+2.4% CSV).",
      },
    },
  ];

  const LABELS = {
    en: { all: "All (12)", infantry: "Infantry (2)", ranged: "Ranged (3)", rider: "Rider (2)", legendary: "Legendary (5)", elite: "Elite (5)", uncommon: "Uncommon (2)", lv: "Lv" },
    vi: { all: "Tất cả (12)", infantry: "Bộ binh (2)", ranged: "Cung thủ (3)", rider: "Kỵ binh (2)", legendary: "Huyền thoại (5)", elite: "Tinh anh (5)", uncommon: "Phổ thông (2)", lv: "Cấp" },
    es: { all: "Todos (12)", infantry: "Infantería (2)", ranged: "Tiradores (3)", rider: "Jinetes (2)", legendary: "Legendario (5)", elite: "Élite (5)", uncommon: "Común (2)", lv: "Nv." },
  };

  let activeFilter = "all";
  const getLang = () => (["vi", "es"].includes(document.documentElement.lang) ? document.documentElement.lang : "en");

  const renderHeroes = () => {
    const lang = getLang();
    const copy = LABELS[lang];
    if (filterBar) {
      filterBar.innerHTML = ["all", "infantry", "ranged", "rider", "legendary", "elite", "uncommon"]
        .map((k) => `<button type="button" class="quick-btn${activeFilter === k ? " is-active" : ""}" data-filter="${k}">${copy[k]}</button>`)
        .join("");
    }
    const list = activeFilter === "all"
      ? HEROES
      : HEROES.filter((h) => h.rarity === activeFilter || h.squad === activeFilter);
    heroGrid.innerHTML = list
      .map(
        (h) => `
      <article class="note-card dls-hero-card dls-rarity-${h.rarity}">
        <div class="dls-hero-head">
          <img class="dls-hero-avatar" src="${h.image}" alt="${h.name}" loading="lazy" />
          <div>
            <p class="card-label">${copy[h.rarity]} · ${copy.lv} ${h.level} · ${"★".repeat(h.stars)}</p>
            <h3>${h.name}</h3>
            <p class="dls-hero-tags">${h.tags[lang]}</p>
          </div>
        </div>
        <p>${h.note[lang]}</p>
      </article>`,
      )
      .join("");
  };

  filterBar?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (btn) {
      activeFilter = btn.dataset.filter;
      renderHeroes();
    }
  });

  renderHeroes();
  new MutationObserver(renderHeroes).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
