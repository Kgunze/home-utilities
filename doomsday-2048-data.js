(() => {
  window.DOOMSDAY_2048_DATA = {
    TIERS: [
      { level: 1, name: "9mm Pistol Ammo", sub: "Basic Lead Round", img: "assets/doomsday/2048/tile-1.png", value: 2 },
      { level: 2, name: "7.62mm Rifle Ammo", sub: "Standard Ball Box", img: "assets/doomsday/2048/tile-2.png", value: 4 },
      { level: 3, name: "5.56mm Armor-Piercing", sub: "Enhanced Penetrator", img: "assets/doomsday/2048/tile-3.png", value: 8 },
      { level: 4, name: ".50 Cal Stripper Clip", sub: "High-Caliber Link", img: "assets/doomsday/2048/tile-4.png", value: 16 },
      { level: 5, name: "Bio-Green Service Pistol", sub: "Survivor Sidearm", img: "assets/doomsday/2048/tile-5.png", value: 32 },
      { level: 6, name: "Tactical SMG", sub: "Close-Quarters Submachine", img: "assets/doomsday/2048/tile-6.png", value: 64 },
      { level: 7, name: "Assault Carbine", sub: "Rapid Combat Rifle", img: "assets/doomsday/2048/tile-7.png", value: 128 },
      { level: 8, name: "Heavy Combat PDW", sub: "Armored Burst Blaster", img: "assets/doomsday/2048/tile-8.png", value: 256 },
      { level: 9, name: "Anti-Materiel Sniper", sub: "Scope & Drum Nuke", img: "assets/doomsday/2048/tile-9.png", value: 512 },
      { level: 10, name: "Vulcan Gatling Minigun", sub: "Heavy Flame Rotary Cannon", img: "assets/doomsday/2048/tile-10.png", value: 1024 },
      { level: 11, name: "Dual Vulcan Minigun", sub: "Twin Overkill Barrels (×2)", img: "assets/doomsday/2048/tile-11.png", value: 2048 },
      { level: 12, name: "Triple Gatling Overlord", sub: "Tri-Cannon Doom Engine (×3)", img: "assets/doomsday/2048/tile-12.png", value: 4096 },
    ],
    STORAGE_KEY: "dls_2048_best_score",
    SAVE_KEY: "dls_2048_game_save_v1",
    SAVE_TTL_MS: 24 * 60 * 60 * 1000, // 24 hours
    BOARD_SIZE: 4,
  };
})();