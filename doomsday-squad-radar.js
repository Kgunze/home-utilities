(() => {
  const RADAR_AXES = [
    { key: "atk", max: 150, label: "ATK" },
    { key: "def", max: 140, label: "DEF" },
    { key: "hp", max: 80, label: "HP" },
    { key: "spd", max: 50, label: "Speed" },
    { key: "skillDmg", max: 70, label: "Skill Amp" },
    { key: "dmgRed", max: 70, label: "DMG Red" },
    { key: "rageFactor", max: 45000, label: "Skill Rage" },
    { key: "healRage", max: 6000, label: "Heal/Rage" },
  ];

  const buildPolygon = (values, cx, cy, r) => {
    const n = RADAR_AXES.length;
    return RADAR_AXES.map((axis, i) => {
      const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
      const ratio = Math.max(0.08, Math.min(1, (values[axis.key] || 0) / axis.max));
      const x = (cx + r * ratio * Math.cos(angle)).toFixed(1);
      const y = (cy + r * ratio * Math.sin(angle)).toFixed(1);
      return `${x},${y}`;
    }).join(" ");
  };

  const drawRadar = (title, subtitle, values, strokeColor, fillColor) => {
    const cx = 160, cy = 160, r = 100, n = RADAR_AXES.length;
    const rings = [0.25, 0.5, 0.75, 1].map((scale) => {
      const pts = RADAR_AXES.map((_, i) => {
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        return `${(cx + r * scale * Math.cos(angle)).toFixed(1)},${(cy + r * scale * Math.sin(angle)).toFixed(1)}`;
      }).join(" ");
      return `<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />`;
    }).join("");

    const axes = RADAR_AXES.map((axis, i) => {
      const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
      const x2 = (cx + r * Math.cos(angle)).toFixed(1);
      const y2 = (cy + r * Math.sin(angle)).toFixed(1);
      const lx = (cx + (r + 20) * Math.cos(angle)).toFixed(1);
      const ly = (cy + (r + 14) * Math.sin(angle)).toFixed(1);
      return `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.12)" stroke-width="1" /><text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="central" fill="#c7b9a5" font-size="10" font-weight="600">${axis.label}</text>`;
    }).join("");

    const poly = buildPolygon(values, cx, cy, r);

    return `
      <div class="ih-radar-card">
        <div class="ih-radar-header">
          <span class="card-label">${title}</span>
          <h4>${subtitle}</h4>
        </div>
        <svg viewBox="0 0 320 320" class="ih-radar-svg">
          ${rings}
          ${axes}
          <polygon points="${poly}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" />
        </svg>
      </div>`;
  };

  window.DLS_SQUAD_RADAR = {
    render: (container, dataA, dataB) => {
      if (!container) return;
      container.innerHTML = `
        <div class="ih-radar-container">
          ${drawRadar(dataA.title, dataA.subtitle, dataA.values, "#48bb78", "rgba(72,187,120,0.28)")}
          ${drawRadar(dataB.title, dataB.subtitle, dataB.values, "#ed8936", "rgba(237,137,54,0.28)")}
        </div>`;
    },
  };
})();
