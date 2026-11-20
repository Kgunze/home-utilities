(() => {
  window.DOOMSDAY_BIOBEAST_FIRE_DATA = [
    {
      id: "kirin", name: "Kirin", badge: "Rare Biobeast · Fire Attribute · Lv.100 Awakened (Tier ★)",
      tags: "Detonate · CRIT · Combo", img: "assets/doomsday/biobeast/kirin.jpg",
      summary: "Explosive Rare <strong>Fire CRIT &amp; Detonate Nuke (88,100 HP · 4,600 ATK · 420 CRIT · +16.0% CRIT DMG)</strong> that blasts <strong>554% Flash Charge</strong> + <strong>guaranteed CRIT 304% follow-up</strong>, stacks <strong>172% Detonate</strong> explosions on every CRIT, grants <strong>+24% ATK &amp; +160 CRIT</strong> in Support, and boosts <strong>Squad Skill DMG by +5%</strong>!",
      stats: [
        ["HP / ATK / DEF (Lv.100)", "88,100 HP · 4,600 ATK · 4,148 DEF", "High-ATK Fire assassin archetype built to melt Grass-type & Shielded Biobeasts"],
        ["CRIT & CRIT DMG", "420 CRIT · +16.0% CRIT DMG", "Massive 420 CRIT (+130 from Flash Charge = 550 CRIT!) triggers nonstop Detonate stacks"],
        ["Combo & Combo DMG", "210 Combo · +8.0% Combo DMG", "Combo-triggered Flame Dance adds a 150% follow-up strike with CRIT +60"],
        ["Counter & Counter DMG", "0 Counter (0.0%) · 0.0% Counter DMG", "Pure offensive CRIT + Detonate + Combo burst engine"],
        ["Squad & Element Mitigation", "10.0% Element Reduction · 10.0% Squad DMG Reduction", "Standard 10% elemental & squad damage reduction at Lv.100"],
        ["Leader Deployment Buff", "+5% Squad Skill DMG (At Max Tier ★)", "Highest passive Squad Skill DMG buff (+5%), directly amplifying Hero Active & Rage nukes"],
      ],
      skills: [
        ["1. Flash Charge", "Leader Skill (Every 6s)", "At Max Tier ★: Deals 554% DMG every 6s and gains CRIT +130 for 3s. Also deals 202% follow-up DMG the next second.", "CRIT Upgrade: If Flash Charge lands a Critical Hit, follow-up DMG increases to 304% AND is guaranteed to CRIT! When deployed, Squad Skill DMG +5%."],
        ["2. Flame Dance", "Active Skill (Every 3s + Procs)", "[Leader · Max Tier] Deals 274% DMG every 3s. If triggered by a Combo, additionally deals 150% follow-up DMG the next second with CRIT +60!", "[Support · Max Tier] When Active Skill deals DMG, has a 50% chance to deal 234% follow-up DMG (enhanced on CRIT or Combo/Counter Active Skill triggers)."],
        ["3. Dust Explosion", "Passive Skill (Max Tier)", "[Leader · Max Tier] On dealing a Critical Hit, 100% chance to inflict 1 stack of Detonate (explodes after 1s for 172% DMG). Casting Leader Skill inflicts 2 stacks of Detonate!", "[Support · Max Tier] On dealing a CRIT or inflicting Detonate, grants Leader ATK +6% and CRIT +40 for 3s (stacks up to 4 times = +24% ATK & +160 CRIT, duration resets on refresh!)."],
        ["4. Meteor Power", "Passive Skill (Max Tier ★)", "[Leader · Max Tier ★] When Active Skill deals DMG to a Grass-type Biobeast, gains Active Skill DMG +27% and Leader Skill DMG +11% for 3s!", "[Support · Max Tier ★] When Leader Skill deals DMG to a target with a Shield, gains Combo +120 and DMG +8.5% for 3s!"],
      ],
      pairings: [
        ["Skill-Nuke Ranged & Rider Squads (S+ Leader Match)", "Charon + Sophie · Nova + Ethan · Metok Tso + Rubina", "+5% Squad Skill DMG supercharges high-multiplier Rage nukes while Kirin's 554% + 304% guaranteed-CRIT Flash Charge deletes enemy Biobeasts."],
        ["CRIT & Anti-Shield Support Partner (S+ Biobeast Pair)", "Leader: Otachi / Celestial-Eyed Lion + Support: Kirin", "Kirin's Support Dust Explosion grants up to +24% Leader ATK & +160 CRIT (4 stacks), while Meteor Power adds Combo +120 & +8.5% DMG against Shielded Biobeasts!"],
      ],
    },
  ];
})();
