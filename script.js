const filterButtons = document.querySelectorAll(".filter-button");
const recipeCards = document.querySelectorAll(".recipe-card");
const treeToggles = document.querySelectorAll(".tree-toggle");
const backToTopButton = document.querySelector(".back-to-top");
const marketDateInput = document.querySelector("#market-date");
const marketTimeInput = document.querySelector("#market-time");
const marketDurationInput = document.querySelector("#market-duration");
const saveMarketButton = document.querySelector("#bookmark-market-time");
const addGoogleCalendarButton = document.querySelector("#add-google-calendar");
const savedMarketBooking = document.querySelector("#saved-market-booking");
const monthCalendarTitle = document.querySelector("#month-calendar-title");
const monthGrid = document.querySelector("#month-grid");
const ptsdParallaxLayers = document.querySelectorAll(".ptsd-parallax-layer");
const chapterSpreads = document.querySelectorAll(".chapter-spread");
const storyModal = document.querySelector("#story-modal");
const storyModalTitle = document.querySelector("#story-modal-title");
const storyModalKicker = document.querySelector("#story-modal-kicker");
const storyModalYears = document.querySelector("#story-modal-years");
const storyModalIntro = document.querySelector("#story-modal-intro");
const storyModalBody = document.querySelector("#story-modal-body");
const storyModalCloseButtons = document.querySelectorAll("[data-story-close]");

const MARKET_BOOKING_KEY = "home-utilities-market-booking";

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    for (const item of filterButtons) {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    }

    for (const card of recipeCards) {
      const shouldShow =
        filter === "all" || card.dataset.category === filter;

      card.classList.toggle("is-hidden", !shouldShow);
    }
  });
}

for (const toggle of treeToggles) {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    const next = toggle.nextElementSibling;

    toggle.setAttribute("aria-expanded", String(!expanded));

    if (next) {
      next.hidden = expanded;
    }
  });
}

const syncBackToTopButton = () => {
  if (!backToTopButton) {
    return;
  }

  const shouldShow = window.scrollY > 420;
  backToTopButton.classList.toggle("is-visible", shouldShow);
};

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", syncBackToTopButton, { passive: true });
  syncBackToTopButton();
}

const formatMarketBooking = (dateValue, timeValue, durationValue) => {
  if (!dateValue || !timeValue || !durationValue) {
    return "No saved Binh Dien market visit yet.";
  }

  const start = new Date(`${dateValue}T${timeValue}:00`);
  const dateText = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(start);

  const timeText = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(start);

  const hours = Number(durationValue);
  const durationText = `${hours} hour${hours === 1 ? "" : "s"}`;

  return `${dateText} at ${timeText} for ${durationText}`;
};

const renderSavedMarketBooking = () => {
  if (!savedMarketBooking) {
    return;
  }

  const raw = window.localStorage.getItem(MARKET_BOOKING_KEY);

  if (!raw) {
    savedMarketBooking.textContent = "No saved Binh Dien market visit yet.";
    return;
  }

  try {
    const booking = JSON.parse(raw);
    savedMarketBooking.textContent = formatMarketBooking(
      booking.date,
      booking.time,
      booking.duration,
    );
  } catch {
    savedMarketBooking.textContent = "No saved Binh Dien market visit yet.";
  }
};

const getMarketSelection = () => {
  if (!marketDateInput || !marketTimeInput || !marketDurationInput) {
    return null;
  }

  return {
    date: marketDateInput.value,
    time: marketTimeInput.value,
    duration: marketDurationInput.value,
  };
};

const toGoogleCalendarDate = (date) =>
  date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

const renderMonthCalendar = (dateValue) => {
  if (!monthGrid || !monthCalendarTitle) {
    return;
  }

  const baseDate = dateValue ? new Date(`${dateValue}T00:00:00`) : new Date();
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const selectedDay =
    dateValue &&
    baseDate.getFullYear() === year &&
    baseDate.getMonth() === month
      ? baseDate.getDate()
      : null;

  monthCalendarTitle.textContent = new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(baseDate);

  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthGrid.innerHTML = "";

  for (let i = 0; i < startOffset; i += 1) {
    const filler = document.createElement("div");
    filler.className = "month-day is-muted";
    monthGrid.appendChild(filler);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const cell = document.createElement("div");
    cell.className = "month-day";
    cell.textContent = String(day);

    if (selectedDay === day) {
      cell.classList.add("is-selected");
    }

    monthGrid.appendChild(cell);
  }
};

if (marketDateInput && marketTimeInput && marketDurationInput) {
  const today = new Date();
  marketDateInput.value = today.toISOString().slice(0, 10);
  renderMonthCalendar(marketDateInput.value);
  marketDateInput.addEventListener("input", () => {
    renderMonthCalendar(marketDateInput.value);
  });
}

if (saveMarketButton) {
  saveMarketButton.addEventListener("click", () => {
    const booking = getMarketSelection();

    if (!booking || !booking.date || !booking.time || !booking.duration) {
      return;
    }

    window.localStorage.setItem(MARKET_BOOKING_KEY, JSON.stringify(booking));
    renderSavedMarketBooking();
  });
}

if (addGoogleCalendarButton) {
  addGoogleCalendarButton.addEventListener("click", () => {
    const booking = getMarketSelection();

    if (!booking || !booking.date || !booking.time || !booking.duration) {
      return;
    }

    const start = new Date(`${booking.date}T${booking.time}:00`);
    const end = new Date(start.getTime() + Number(booking.duration) * 60 * 60 * 1000);
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: "Trip to Binh Dien Market",
      dates: `${toGoogleCalendarDate(start)}/${toGoogleCalendarDate(end)}`,
      details:
        "Weekly market trip planned from the Home Utilities Shopping Planner.",
      location: "Binh Dien Market, Ho Chi Minh City",
    });

    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank");
  });
}

renderSavedMarketBooking();
renderMonthCalendar(marketDateInput ? marketDateInput.value : "");

if (ptsdParallaxLayers.length > 0) {
  const syncPtsdParallax = () => {
    const offset = window.scrollY;
    const multipliers = [0.08, 0.16, 0.24, 0.34];

    ptsdParallaxLayers.forEach((layer, index) => {
      const moveY = offset * multipliers[index];
      const moveX = offset * multipliers[index] * 0.08;
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  };

  window.addEventListener("scroll", syncPtsdParallax, { passive: true });
  syncPtsdParallax();
}

if (
  storyModal &&
  storyModalTitle &&
  storyModalKicker &&
  storyModalYears &&
  storyModalIntro &&
  storyModalBody
) {
  const closeStoryModal = () => {
    storyModal.classList.remove("is-open");
    storyModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const openStoryModal = (chapter) => {
    const {
      storyTitle,
      storyYears,
      storyKicker,
      storyIntro,
      storyBody,
    } = chapter.dataset;

    storyModalTitle.textContent = storyTitle || "Story";
    storyModalKicker.textContent = storyKicker || "Chapter";
    storyModalYears.textContent = storyYears || "";
    storyModalIntro.textContent = storyIntro || "";
    storyModalBody.innerHTML = "";

    const paragraphs = (storyBody || "")
      .split("\n\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    for (const paragraph of paragraphs) {
      const node = document.createElement("p");
      node.textContent = paragraph;
      storyModalBody.appendChild(node);
    }

    storyModal.classList.add("is-open");
    storyModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  for (const chapter of chapterSpreads) {
    chapter.addEventListener("click", () => {
      openStoryModal(chapter);
    });

    chapter.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openStoryModal(chapter);
      }
    });
  }

  for (const button of storyModalCloseButtons) {
    button.addEventListener("click", closeStoryModal);
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && storyModal.classList.contains("is-open")) {
      closeStoryModal();
    }
  });
}
