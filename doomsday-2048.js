(() => {
  const cfg = window.DOOMSDAY_2048_DATA;
  if (!cfg) return;

  const boardWrapper = document.querySelector(".g2048-board-wrapper") || document.querySelector("#g2048-board");
  const boardEl = document.querySelector("#g2048-board");
  const scoreEl = document.querySelector("#g2048-score");
  const bestEl = document.querySelector("#g2048-best");
  const statusEl = document.querySelector("#g2048-status");
  const restartBtn = document.querySelector("#g2048-restart");
  const armoryList = document.querySelector("#g2048-armory-list");
  if (!boardEl || !scoreEl || !bestEl) return;

  const SIZE = cfg.BOARD_SIZE || 4;
  let grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  let score = 0, bestScore = Number(localStorage.getItem(cfg.STORAGE_KEY) || 0);
  let isGameOver = false, hasWon = false;

  const tierMap = new Map(cfg.TIERS.map((t) => [t.level, t]));
  bestEl.textContent = bestScore.toLocaleString();

  const getEmptyCells = () => {
    const empty = [];
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (grid[r][c] === 0) empty.push({ r, c });
      }
    }
    return empty;
  };

  const spawnTile = () => {
    const empty = getEmptyCells();
    if (!empty.length) return false;
    const { r, c } = empty[Math.floor(Math.random() * empty.length)];
    grid[r][c] = Math.random() < 0.9 ? 1 : 2;
    return true;
  };

  const renderBoard = () => {
    scoreEl.textContent = score.toLocaleString();
    if (score > bestScore) {
      bestScore = score;
      bestEl.textContent = bestScore.toLocaleString();
      localStorage.setItem(cfg.STORAGE_KEY, String(bestScore));
    }
    boardEl.innerHTML = "";
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const val = grid[r][c];
        if (val > 0) {
          const t = tierMap.get(val) || { name: `Tier ${val}`, img: cfg.TIERS[0].img };
          const tile = document.createElement("div");
          tile.className = `g2048-tile g2048-tier-${val}`;
          tile.style.gridRowStart = String(r + 1);
          tile.style.gridColumnStart = String(c + 1);
          tile.innerHTML = `<img src="${t.img}" alt="${t.name}" draggable="false" loading="lazy" /><span class="g2048-tile-num">${val}</span>`;
          boardEl.appendChild(tile);
        }
      }
    }
  };

  const slideRow = (row) => {
    let arr = row.filter((v) => v !== 0), gained = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] += 1;
        gained += Math.pow(2, arr[i]);
        if (arr[i] >= 11) hasWon = true;
        arr.splice(i + 1, 1);
      }
    }
    while (arr.length < SIZE) arr.push(0);
    return { row: arr, gained };
  };

  const rotate = (m) => m[0].map((_, i) => m.map((r) => r[i]).reverse());

  const move = (dir) => {
    if (isGameOver) return;
    let rotated = grid.map((r) => [...r]);
    const turns = dir === "left" ? 0 : dir === "down" ? 1 : dir === "right" ? 2 : 3;
    for (let i = 0; i < turns; i++) rotated = rotate(rotated);

    let moved = false, roundGained = 0;
    for (let r = 0; r < SIZE; r++) {
      const orig = [...rotated[r]];
      const res = slideRow(rotated[r]);
      rotated[r] = res.row;
      roundGained += res.gained;
      if (orig.some((v, idx) => v !== res.row[idx])) moved = true;
    }

    const unturns = (4 - turns) % 4;
    for (let i = 0; i < unturns; i++) rotated = rotate(rotated);

    if (moved) {
      grid = rotated;
      score += roundGained;
      spawnTile();
      checkGameStatus();
      renderBoard();
    }
  };

  const canMove = () => {
    if (getEmptyCells().length > 0) return true;
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const v = grid[r][c];
        if (r + 1 < SIZE && grid[r + 1][c] === v) return true;
        if (c + 1 < SIZE && grid[r][c + 1] === v) return true;
      }
    }
    return false;
  };

  const checkGameStatus = () => {
    if (!canMove()) {
      isGameOver = true;
      if (statusEl) statusEl.textContent = "Out of Ammo! No more valid merges. Tap Restart to try again!";
    } else if (hasWon && statusEl) {
      statusEl.textContent = "★ Mission Accomplished: You unlocked the Dual/Triple Gatling Overlord!";
    } else if (statusEl) {
      statusEl.textContent = "Swipe with mouse/touch or use Arrow Keys / WASD to merge weapons!";
    }
  };

  const initGame = () => {
    grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
    score = 0; isGameOver = false; hasWon = false;
    spawnTile(); spawnTile();
    checkGameStatus();
    renderBoard();
  };

  const renderArmory = () => {
    if (!armoryList) return;
    armoryList.innerHTML = cfg.TIERS.map(
      (t) => `
      <article class="planner-card g2048-armory-card">
        <div class="g2048-armory-thumb"><img src="${t.img}" alt="${t.name}" loading="lazy" /></div>
        <div>
          <p class="card-label">Tier ${t.level} · 2048 Value: ${t.value}</p>
          <h4>${t.name}</h4>
          <p class="dls-hero-tags">${t.sub}</p>
        </div>
      </article>`
    ).join("");
  };

  window.addEventListener("keydown", (e) => {
    if (["ArrowUp", "KeyW"].includes(e.code)) { e.preventDefault(); move("up"); }
    else if (["ArrowDown", "KeyS"].includes(e.code)) { e.preventDefault(); move("down"); }
    else if (["ArrowLeft", "KeyA"].includes(e.code)) { e.preventDefault(); move("left"); }
    else if (["ArrowRight", "KeyD"].includes(e.code)) { e.preventDefault(); move("right"); }
  });

  const handleSwipe = (dx, dy) => {
    const absX = Math.abs(dx), absY = Math.abs(dy);
    if (Math.max(absX, absY) < 24) return;
    if (absX > absY) move(dx > 0 ? "right" : "left");
    else move(dy > 0 ? "down" : "up");
  };

  let tStartX = 0, tStartY = 0;
  boardWrapper.addEventListener("touchstart", (e) => {
    if (!e.touches.length) return;
    tStartX = e.touches[0].clientX; tStartY = e.touches[0].clientY;
  }, { passive: true });
  boardWrapper.addEventListener("touchend", (e) => {
    if (!e.changedTouches.length) return;
    handleSwipe(e.changedTouches[0].clientX - tStartX, e.changedTouches[0].clientY - tStartY);
  }, { passive: true });

  let isMouseDown = false, mStartX = 0, mStartY = 0;
  boardWrapper.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    mStartX = e.clientX; mStartY = e.clientY;
  });
  window.addEventListener("mouseup", (e) => {
    if (!isMouseDown) return;
    isMouseDown = false;
    handleSwipe(e.clientX - mStartX, e.clientY - mStartY);
  });

  document.querySelectorAll("[data-g2048-dir]").forEach((btn) => {
    btn.addEventListener("click", () => move(btn.dataset.g2048Dir));
  });

  restartBtn?.addEventListener("click", initGame);

  renderArmory();
  initGame();
})();