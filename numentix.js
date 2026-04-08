(() => {
  const mapElement = document.querySelector("#numentix-map");
  const zonesLayer = document.querySelector("#numentix-zones");
  const chapterList = document.querySelector("#numentix-chapter-list");
  const viewerKicker = document.querySelector("#numentix-viewer-kicker");
  const viewerTitle = document.querySelector("#numentix-viewer-title");
  const viewerZone = document.querySelector("#numentix-viewer-zone");
  const viewerBody = document.querySelector("#numentix-viewer-body");
  const prevLink = document.querySelector("#numentix-prev");
  const nextLink = document.querySelector("#numentix-next");
  const progress = document.querySelector("#numentix-progress");
  const readerSection = document.querySelector("#numentix-reader");

  if (
    !mapElement ||
    !zonesLayer ||
    !chapterList ||
    !viewerKicker ||
    !viewerTitle ||
    !viewerZone ||
    !viewerBody ||
    !prevLink ||
    !nextLink ||
    !progress
  ) {
    return;
  }

  const STORY_PATH = "assets/numentix/hanh-trinh-numentix.md";
  const ACTS = [
    { id: "hoi-1", order: 1, title: "Hồi I: Cuộc Tháo Chạy", from: 1, to: 5 },
    { id: "hoi-2", order: 2, title: "Hồi II: Dấu Chân Trên Aeris", from: 6, to: 10 },
    { id: "hoi-3", order: 3, title: "Hồi III: Di Tích và Ký Ức", from: 11, to: 16 },
    { id: "hoi-4", order: 4, title: "Hồi IV: Dư Âm Phép Thuật", from: 17, to: 20 },
    { id: "hoi-5", order: 5, title: "Hồi V: Săn Đêm và Danh Dự", from: 21, to: 24 },
  ];

  const ZONES = [
    { id: "challib", chapterId: "chuong-1", x: 69, y: 25, label: "Dinh thự Challib" },
    { id: "green-despair", chapterId: "chuong-8", x: 45, y: 56, label: "Green Despair" },
    { id: "di-tich-co", chapterId: "chuong-11", x: 57, y: 64, label: "Di tích cổ" },
    { id: "desert-scream", chapterId: "chuong-10", x: 54, y: 86, label: "Desert Scream" },
    { id: "bloody-ice", chapterId: "chuong-22", x: 86, y: 70, label: "Bloody Ice" },
  ];

  const STRINGS = {
    eyebrow: "Aeris / Bản đồ truyện tương tác",
    title: "Hành Trình NumentiX được mở từ lục địa Aeris.",
    heroText:
      "Bấm vào từng điểm mốc trên bản đồ để mở chương tương ứng, sau đó đọc tiếp theo mạch truyện với điều hướng trước và sau.",
    primaryAction: "Xem bản đồ Aeris",
    secondaryAction: "Đi tới reader",
    ledgerLabel: "Bản thảo truyện",
    ledgerTitle: "Giữ nguyên tiếng Việt từ file nguồn",
    ledgerItems: [
      "Nội dung đọc trực tiếp từ file markdown gốc",
      "Chia theo Hồi và Chương rõ ràng trong giao diện",
      "Map Aeris .jpg dùng làm entry point",
      "Reader tuần tự cho toàn bộ hành trình",
    ],
    sectionTagMap: "Bản đồ Aeris",
    sectionTitleMap: "Chọn một địa điểm để mở đúng mạch truyện.",
    sectionCaptionMap: "Các điểm mốc trên map dẫn tới những chương bản lề của từng hồi.",
    sectionTagChapters: "Mục lục",
    sectionTitleChapters: "Toàn bộ chương được gom lại theo từng hồi.",
    sectionCaptionChapters: "Nội dung giữ nguyên bản tiếng Việt từ file .md bạn cung cấp.",
    readerTag: "Reader",
    readerTitle: "Đọc nguyên văn theo hành trình.",
    readerCaption: "Trang chỉ render text thuần, không dùng HTML raw.",
    chapterLabel: "Chương",
    zoneLabel: "Điểm mốc",
    actLabel: "Hồi",
    prevLabel: "← Chương trước",
    nextLabel: "Chương tiếp theo →",
    startLabel: "Đây là chương đầu tiên.",
    endLabel: "Đây là chương cuối cùng.",
    openChapter: "Mở chương",
    openFromMap: "Mở từ bản đồ",
  };

  let storyPromise = null;

  const applyStaticCopy = () => {
    const set = (selector, value) => {
      const node = document.querySelector(selector);
      if (node) {
        node.textContent = value;
      }
    };

    set("#numentix-eyebrow", STRINGS.eyebrow);
    set("#numentix-hero-title", STRINGS.title);
    set("#numentix-hero-text", STRINGS.heroText);
    set("#numentix-open-map", STRINGS.primaryAction);
    set("#numentix-open-reader", STRINGS.secondaryAction);
    set("#numentix-ledger-label", STRINGS.ledgerLabel);
    set("#numentix-ledger-title", STRINGS.ledgerTitle);
    set("#numentix-map-tag", STRINGS.sectionTagMap);
    set("#numentix-map-title", STRINGS.sectionTitleMap);
    set("#numentix-map-caption", STRINGS.sectionCaptionMap);
    set("#numentix-chapters-tag", STRINGS.sectionTagChapters);
    set("#numentix-chapters-title", STRINGS.sectionTitleChapters);
    set("#numentix-chapters-caption", STRINGS.sectionCaptionChapters);
    set("#numentix-reader-tag", STRINGS.readerTag);
    set("#numentix-reader-title", STRINGS.readerTitle);
    set("#numentix-reader-caption", STRINGS.readerCaption);

    document.querySelectorAll(".numentix-ledger-list li").forEach((item, index) => {
      if (STRINGS.ledgerItems[index]) {
        item.textContent = STRINGS.ledgerItems[index];
      }
    });
  };

  const getActForChapter = (order) =>
    ACTS.find((act) => order >= act.from && order <= act.to) || ACTS[0];

  const buildExcerpt = (paragraphs) => {
    const first = paragraphs.find(Boolean) || "";
    if (first.length <= 160) {
      return first;
    }

    return `${first.slice(0, 157).trim()}...`;
  };

  const parseStory = (markdown) => {
    const lines = markdown.replace(/\r/g, "").split("\n");
    const chapters = [];
    let current = null;
    let paragraphBuffer = [];

    const flushParagraph = () => {
      if (!current || paragraphBuffer.length === 0) {
        return;
      }

      current.content.push(paragraphBuffer.join(" ").trim());
      paragraphBuffer = [];
    };

    const flushChapter = () => {
      flushParagraph();
      if (!current) {
        return;
      }

      const act = getActForChapter(current.order);
      current.id = `chuong-${current.order}`;
      current.excerpt = buildExcerpt(current.content);
      current.act = act;
      chapters.push(current);
      current = null;
    };

    for (const rawLine of lines) {
      const line = rawLine.trim();
      const match = line.match(/^Ch\S+\s+(\d+):\s*(.+)$/);

      if (match) {
        flushChapter();
        current = {
          order: Number(match[1]),
          heading: line,
          title: match[2].trim(),
          content: [],
        };
        continue;
      }

      if (!current) {
        continue;
      }

      if (/^-{3,}$/.test(line)) {
        flushParagraph();
        continue;
      }

      if (line.length === 0) {
        flushParagraph();
        continue;
      }

      paragraphBuffer.push(line);
    }

    flushChapter();
    return chapters;
  };

  const loadStory = async () => {
    if (!storyPromise) {
      storyPromise = fetch(STORY_PATH, { cache: "no-store" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Không thể tải file truyện NumentiX.");
          }

          return response.text();
        })
        .then((markdown) => parseStory(markdown));
    }

    return storyPromise;
  };

  const getStoryById = (chapters, chapterId) =>
    chapters.find((chapter) => chapter.id === chapterId) || chapters[0];

  const getSelectedChapter = (chapters) => {
    const params = new URLSearchParams(window.location.search);
    return getStoryById(chapters, params.get("chapter"));
  };

  const setChapterInUrl = (chapterId, shouldJump = true) => {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("chapter", chapterId);
    nextUrl.hash = shouldJump ? "numentix-reader" : "";
    window.history.replaceState({}, "", nextUrl);
  };

  const buildChapterCard = (chapter, isActive) => {
    const item = document.createElement("a");
    item.className = `numentix-chapter-card${isActive ? " is-active" : ""}`;
    item.href = `numentix.html?chapter=${chapter.id}#numentix-reader`;

    const order = document.createElement("span");
    order.className = "numentix-chapter-order";
    order.textContent = `${STRINGS.chapterLabel} ${chapter.order}`;

    const title = document.createElement("strong");
    title.textContent = chapter.heading;

    const excerpt = document.createElement("span");
    excerpt.textContent = chapter.excerpt;

    item.append(order, title, excerpt);
    return item;
  };

  const renderChapterGroups = (chapters, activeChapterId) => {
    chapterList.innerHTML = "";

    ACTS.forEach((act) => {
      const actChapters = chapters.filter((chapter) => chapter.act.id === act.id);
      if (actChapters.length === 0) {
        return;
      }

      const group = document.createElement("section");
      group.className = "numentix-act-group";

      const heading = document.createElement("div");
      heading.className = "numentix-act-heading";

      const title = document.createElement("h3");
      title.textContent = act.title;

      const range = document.createElement("span");
      range.className = "numentix-act-range";
      range.textContent = `${STRINGS.chapterLabel} ${act.from} - ${act.to}`;

      heading.append(title, range);

      const grid = document.createElement("div");
      grid.className = "numentix-act-grid";
      actChapters.forEach((chapter) => {
        grid.appendChild(buildChapterCard(chapter, chapter.id === activeChapterId));
      });

      group.append(heading, grid);
      chapterList.appendChild(group);
    });
  };

  const renderZones = (activeChapterId) => {
    zonesLayer.innerHTML = "";
    ZONES.forEach((zone) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `numentix-zone${zone.chapterId === activeChapterId ? " is-active" : ""}`;
      button.style.left = `${zone.x}%`;
      button.style.top = `${zone.y}%`;
      button.setAttribute("aria-label", `${STRINGS.openFromMap}: ${zone.label}`);

      const label = document.createElement("span");
      label.textContent = zone.label;
      button.appendChild(label);

      button.addEventListener("click", async () => {
        const chapters = await loadStory();
        setChapterInUrl(zone.chapterId);
        renderExperience(chapters);
        readerSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      zonesLayer.appendChild(button);
    });
  };

  const updateNavLink = (node, chapter, fallbackText) => {
    if (chapter) {
      node.href = `numentix.html?chapter=${chapter.id}#numentix-reader`;
      node.textContent = chapter.order < 10 ? `${fallbackText} 0${chapter.order}` : `${fallbackText} ${chapter.order}`;
      node.classList.remove("is-disabled");
      node.setAttribute("aria-disabled", "false");
      return;
    }

    node.href = "#numentix-reader";
    node.textContent = fallbackText;
    node.classList.add("is-disabled");
    node.setAttribute("aria-disabled", "true");
  };

  const renderExperience = async (prefetchedChapters) => {
    applyStaticCopy();

    const chapters = prefetchedChapters || (await loadStory());
    if (!chapters.length) {
      viewerKicker.textContent = "Không có dữ liệu";
      viewerTitle.textContent = "Không thể tải nội dung truyện";
      viewerZone.textContent = "";
      viewerBody.innerHTML = "";
      return;
    }

    const chapter = getSelectedChapter(chapters);
    const index = chapters.findIndex((entry) => entry.id === chapter.id);
    const prevChapter = chapters[index - 1] || null;
    const nextChapter = chapters[index + 1] || null;
    const zone = ZONES.find((entry) => entry.chapterId === chapter.id);

    renderZones(chapter.id);
    renderChapterGroups(chapters, chapter.id);

    viewerKicker.textContent = chapter.act.title;
    viewerTitle.textContent = chapter.heading;
    viewerZone.textContent = `${STRINGS.zoneLabel}: ${zone ? zone.label : chapter.act.title}`;

    viewerBody.innerHTML = "";
    chapter.content.forEach((paragraph) => {
      const node = document.createElement("p");
      node.textContent = paragraph;
      viewerBody.appendChild(node);
    });

    progress.textContent = `${chapter.order} / ${chapters.length}`;
    updateNavLink(prevLink, prevChapter, STRINGS.startLabel);
    updateNavLink(nextLink, nextChapter, STRINGS.endLabel);
  };

  window.addEventListener("popstate", () => {
    renderExperience();
  });

  document.querySelector("#locale-select")?.addEventListener("change", () => {
    window.setTimeout(() => {
      renderExperience();
    }, 0);
    window.setTimeout(() => {
      renderExperience();
    }, 180);
  });

  renderExperience();
})();
