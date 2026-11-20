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
    {
      id: "acnologia", name: "Acnologia", badge: "Fairy Tail Collab · Fire Attribute · Lv.100 Awakened (Tier ★)",
      tags: "Counter DMG · Counter · Detonate", img: "assets/doomsday/biobeast/acnologia.jpg",
      summary: "The Dragon King from the <strong>Fairy Tail Collab</strong>! A terrifying <strong>Fire Counter &amp; Detonate Juggernaut (88,550 HP · 525 Counter · +20.0% Counter DMG)</strong> that blasts <strong>688% Black Dragon Roar</strong> (+30% with Detonate stacks!), guarantees <strong>100% Counter Detonate</strong>, grants <strong>+200 Counter &amp; +30% Leader Skill DMG</strong> in Support, and adds <strong>+4% Squad Skill DMG Reduction</strong>.",
      stats: [
        ["HP / ATK / DEF (Lv.100)", "88,550 HP · 4,525 ATK · 4,200 DEF", "Balanced Fire frontline dragon built to absorb hits and unleash massive Counter nukes"],
        ["Counter & Counter DMG", "525 Counter (~51.5%) · +20.0% Counter DMG", "Elite 525 Counter (+150 from Roar, +55 from Dominance, +200 in Support!)"],
        ["Combo / CRIT", "0 Combo (0.0%) · 0 CRIT (0.0%)", "Pure Counter-Attack & Detonate Dragon-Slayer specialist"],
        ["Magic-Devouring Dragon", "+18% ATK & +10% DEF (reset on Counter/Leader Skill)", "100% chance on Leader Skill or Counter to gain +16% current attack DMG and refresh buff duration!"],
        ["Exclusive Talent (Dominance)", "+6.5% Counter DMG on Counter · +55 Counter (3s) on Miss", "Guarantees relentless retaliation scaling whether a counterattack triggers or not"],
        ["Leader Deployment Buff", "+4% Squad Skill DMG Reduction (At Max Tier ★)", "Cuts incoming enemy Hero Rage & Active Skill nukes while deployed"],
      ],
      skills: [
        ["1. Black Dragon Roar", "Leader Skill (Every 6s)", "At Max Tier ★: Deals 688% DMG every 6s (+10% per Detonate stack applied in battle, max +30%) and gains Counter +150 for 3s.", "Fallback Nuke: If no counterattack triggers during those 3s, deals 264% follow-up DMG! When deployed, Squad Skill DMG Reduction +4%."],
        ["2. Black Dragon Claw Strike", "Active Skill (Every 3s + Procs)", "[Leader · Max Tier] Deals 232% DMG every 3s; 50% chance to apply 1 Detonate stack (explodes after 1s for 124% DMG). If triggered by Counterattack, Detonate chance jumps to 100%!", "[Support · Max Tier] On triggering a Counterattack, increases target DMG taken by +15% for 3s, then applies 1 Detonate stack (explodes after 1s for 248% DMG)!"],
        ["3. Magic-Devouring Dragon", "Passive Skill (Max Tier)", "[Leader · Max Tier] Gains ATK +18% & DEF +10% for 3s on entering battle. Using Leader Skill or triggering Counterattack has 100% chance to boost current attack DMG by +16% and reset duration!", "[Support · Max Tier] When attacked, grants Leader Counter +40 (stacks up to 5 times = +200 Counter!). On triggering a Counterattack, increases Leader Skill DMG by +30% for 6s!"],
        ["4. Dragon-Slaying Power", "Passive Skill (Max Tier ★)", "[Leader · Max Tier ★] When Active Skill hits a Grass-type Biobeast, gains DMG +20% for current attack, then gains Counter +70 for 3s!", "[Support · Max Tier ★] When taking Leader Skill DMG vs. a Grass-type Biobeast team, grants Leader ATK +22% and Counter DMG +17.5% for 3s!"],
        ["5. Black Dragon's Dominance", "Exclusive Talent (Max Tier)", "[Leader] When attacked: if a counterattack triggers, gains Counter DMG +6.5%. Otherwise, gains Counter +55 for 3s.", "[Support] When attacked: if a counterattack triggers, gains Counter DMG +6.5%. Otherwise, gains Counter +55 for 3s."],
      ],
      pairings: [
        ["Garrison & Anti-Skill Tank Squads (S+ Leader Match)", "Nova + Ethan · Stella + Charlie · Daryl + Chasey", "+4% Squad Skill DMG Reduction + 525 Counter (+150 from Roar) melts enemy Rally Biobeasts while protecting your Garrison from Rage nukes."],
        ["Ultimate Counter Support Partner (S+ Biobeast Pair)", "Leader: Fraudrin / Dirgewing + Support: Acnologia", "Acnologia's Support kit stacks +200 Leader Counter, +30% Leader Skill DMG (6s), +15% enemy DMG taken debuff, and 248% Detonate on every Counter!"],
      ],
    },
    {
      id: "kong", name: "Kong", badge: "Godzilla x Kong Collab · Fire Attribute · Lv.100 Awakened (Tier ★)",
      tags: "Combo DMG · Combo · Detonate", img: "assets/doomsday/biobeast/kong.jpg",
      summary: "The Titan King from <strong>Godzilla x Kong: The New Empire</strong>! A devastating <strong>Fire Combo &amp; Detonate Bruiser (88,550 HP · 4,600 ATK · 525 Combo · +20.0% Combo DMG)</strong> that unleashes <strong>658% Hollow Strike (Combo +150)</strong>, stacks <strong>[Charge] (+102% Active Skill DMG!)</strong>, grants <strong>+65% Combo DMG &amp; +50 Combo</strong> in Support, and boosts <strong>Squad Skill DMG by +4%</strong>.",
      stats: [
        ["HP / ATK / DEF (Lv.100)", "88,550 HP · 4,600 ATK · 4,125 DEF", "High-ATK Fire Titan built for explosive Combo chains and Detonate bursts"],
        ["Combo & Combo DMG", "525 Combo (~51.5%) · +20.0% Combo DMG", "Massive 525 Combo (+150 on Hollow Strike, +65 on Pounding Strike, +65% Combo DMG in Support!)"],
        ["CRIT / Counter", "0 CRIT (0.0%) · 0 Counter (0.0%)", "Pure Combo + [Charge] + Detonate offensive powerhouse"],
        ["Squad & Element Mitigation", "10.0% Element Reduction · 10.0% Squad DMG Reduction", "Standard 10% elemental & squad damage reduction at Lv.100"],
        ["Exclusive Talent (Colossal Fury)", "+6.5% Combo DMG on Combo · +2.5% Leader Skill DMG otherwise", "Continuously amps either Combo burst or the next 658% Hollow Strike nuke"],
        ["Leader Deployment Buff", "+4% Squad Skill DMG (At Max Tier ★)", "Amplifies Hero Active & Rage Skill damage across your entire deployed squad"],
      ],
      skills: [
        ["1. Hollow Strike", "Leader Skill (Every 6s)", "At Max Tier ★: Deals 658% DMG every 6s with additional Combo +150 for this attack + 50% chance for 1 Detonate stack (132% DMG after 1s).", "Combo Bonus: If Hollow Strike triggers a Combo, applies 1 additional Detonate stack! When deployed, Squad Skill DMG +4%."],
        ["2. Pounding Strike", "Active Skill (Every 3s + Procs)", "[Leader · Max Tier] Deals 236% DMG every 3s with additional Combo +65. When triggered through Combos, DMG increases by an additional +20%!", "[Support · Max Tier] When a Combo is triggered, deals 244% follow-up DMG with a 50% chance to apply 1 Detonate stack (86% DMG after 1s)!"],
        ["3. Energy Diffusion", "Passive Skill (Max Tier)", "[Leader · Max Tier] Gains [Charge] (+34% next Active Skill DMG, stacks up to 3× = +102%!). Using Leader Skill or inflicting Detonate has 100% chance to gain 1 [Charge] stack.", "[Support · Max Tier] For every Combo or Detonate inflicted in battle, grants Combo DMG +13% and Combo +10 (stacks up to 5× = +65% Combo DMG & +50 Combo!)."],
        ["4. Titan's Power", "Passive Skill (Max Tier ★)", "[Leader · Max Tier ★] When Leader Skill hits a Grass-type Biobeast, gains Leader Skill DMG +22% and Combo +70 for the next attack!", "[Support · Max Tier ★] When taking Counter DMG, reduces current attack DMG taken by -5% and grants Leader ATK +21.5% (3s) vs. Grass-type Biobeast teams!"],
        ["5. Colossal Fury", "Exclusive Talent (Max Tier)", "[Leader] On direct DMG: if a Combo triggers, Combo DMG +6.5%. Otherwise, next Leader Skill DMG +2.5%.", "[Support] On direct DMG: if a Combo triggers, Combo DMG +6.5%. Otherwise, next Leader Skill DMG +2.5%."],
      ],
      pairings: [
        ["Skill-Burst Rally & Open-Field Squads (S+ Leader Match)", "Metok Tso + Rubina · Charon + Sophie · Sakura + Ammara", "+4% Squad Skill DMG + 525 Combo (+150 Hollow Strike) melts Grass & Water Biobeasts to trigger excess Troop DMG conversion."],
        ["Hyper-Combo Fire/Physical Duo (S+ Support Partner)", "Leader: Celestial-Eyed Lion / General Crab / Kirin + Support: Kong", "Kong's Support kit adds 244% follow-up DMG + Detonate on every Combo and stacks +65% Combo DMG & +50 Combo!"],
      ],
    },
  ];
})();
