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
const mealDateInput = document.querySelector("#meal-date");
const mealPeopleInput = document.querySelector("#meal-people");
const mealRecipeTypeSelect = document.querySelector("#meal-recipe-type");
const recipePickerCards = document.querySelectorAll(".recipe-picker-card");
const recipePickerInputs = document.querySelectorAll(".recipe-picker-input");
const mealSummaryBody = document.querySelector("#meal-summary-body");
const ingredientSummaryBody = document.querySelector("#ingredient-summary-body");
const printMealPlanButton = document.querySelector("#print-meal-plan");
const ingredientChipInputs = document.querySelectorAll(".ingredient-chip-input");
const ingredientMatchBody = document.querySelector("#ingredient-match-body");
const ingredientSelectionList = document.querySelector("#ingredient-selection-list");
const stepperItems = document.querySelectorAll(".stepper-item");
const stepToCalculatorButton = document.querySelector("#step-to-calculator");
const stepToRecipesButton = document.querySelector("#step-to-recipes");
const mealCalculatorSection = document.querySelector("#meal-calculator");
const ingredientPlannerSection = document.querySelector("#ingredient-planner");
const brothRecipesSection = document.querySelector("#broth-recipes");
const catalogueCards = document.querySelectorAll(".catalogue-card[data-recipe-id]");
const livePlannerText = document.querySelector("#live-planner-text");

const MARKET_BOOKING_KEY = "home-utilities-market-booking";
const RECIPE_PLANNER_STATE_KEY = "home-utilities-recipe-planner-state";
const RECIPE_PLANNER_COOKIE_DAYS = 14;
const RECIPE_CALCULATOR_DATA = {
  "pho-ga": {
    name: "Pho Ga",
    type: "broth",
    baseServings: 4,
    matchIngredients: ["chicken", "rice noodles", "ginger", "herbs", "fish sauce"],
    ingredients: [
      ["Chicken", 1, "bird"],
      ["Rice noodles", 400, "g"],
      ["Onion", 1, "piece"],
      ["Ginger", 60, "g"],
      ["Scallions and herbs", 120, "g"],
    ],
  },
  "basa-tomato-soup": {
    name: "Basa Tomato Soup",
    type: "broth",
    baseServings: 4,
    matchIngredients: ["basa fillet", "tomatoes", "herbs", "fish sauce"],
    ingredients: [
      ["Basa fillet", 400, "g"],
      ["Tomatoes", 300, "g"],
      ["Herbs", 40, "g"],
      ["Shallot", 30, "g"],
    ],
  },
  "seaweed-tofu-soup": {
    name: "Seaweed Tofu Soup",
    type: "broth",
    baseServings: 4,
    matchIngredients: ["tofu", "seaweed", "fish sauce"],
    ingredients: [
      ["Tofu", 2, "blocks"],
      ["Seaweed", 0.5, "pack"],
      ["Scallion", 20, "g"],
    ],
  },
  "pork-rib-pumpkin-soup": {
    name: "Pork Rib Pumpkin Soup",
    type: "broth",
    baseServings: 4,
    matchIngredients: ["spare ribs", "pumpkin"],
    ingredients: [
      ["Spare ribs", 500, "g"],
      ["Pumpkin", 500, "g"],
      ["Scallion", 20, "g"],
    ],
  },
  "thit-kho": {
    name: "Thit Kho",
    type: "non-broth",
    baseServings: 4,
    matchIngredients: ["pork", "eggs", "fish sauce"],
    ingredients: [
      ["Pork", 600, "g"],
      ["Eggs", 4, "pieces"],
      ["Coconut water", 500, "ml"],
      ["Shallot", 30, "g"],
    ],
  },
  "beef-pumpkin-stir-fry": {
    name: "Beef and Pumpkin Stir-Fry",
    type: "non-broth",
    baseServings: 4,
    matchIngredients: ["beef", "pumpkin", "fish sauce"],
    ingredients: [
      ["Beef", 350, "g"],
      ["Pumpkin", 400, "g"],
      ["Garlic", 20, "g"],
    ],
  },
  "banh-mi-plate": {
    name: "Banh Mi Plate",
    type: "non-broth",
    baseServings: 4,
    matchIngredients: ["eggs", "banh mi", "cucumber", "herbs"],
    ingredients: [
      ["Eggs", 4, "pieces"],
      ["Banh mi", 4, "pieces"],
      ["Cucumber", 300, "g"],
      ["Herbs", 40, "g"],
    ],
  },
  "ginger-fish-sauce": {
    name: "Ginger Fish Sauce",
    type: "non-broth",
    baseServings: 4,
    matchIngredients: ["ginger", "fish sauce"],
    ingredients: [
      ["Fish sauce", 80, "ml"],
      ["Ginger", 40, "g"],
      ["Lime", 2, "pieces"],
      ["Chili", 10, "g"],
    ],
  },
};
let isSyncingRecipePlanner = false;
let rerenderIngredientPlanner = null;
let recipePlannerState = {
  ingredients: [],
  matchedRecipes: [],
  selectedRecipes: [],
  mealDate: "",
  peopleCount: 3,
};

const setStepperState = (currentStep, completedSteps = []) => {
  for (const item of stepperItems) {
    const step = Number(item.dataset.step);
    item.classList.toggle("is-active", step === currentStep);
    item.classList.toggle("is-complete", completedSteps.includes(step));
  }
};

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

const getCookie = (name) => {
  const prefix = `${name}=`;
  const parts = document.cookie.split(";").map((part) => part.trim());

  for (const part of parts) {
    if (part.startsWith(prefix)) {
      return decodeURIComponent(part.slice(prefix.length));
    }
  }

  return "";
};

const saveRecipePlannerState = () => {
  try {
    setCookie(
      RECIPE_PLANNER_STATE_KEY,
      JSON.stringify(recipePlannerState),
      RECIPE_PLANNER_COOKIE_DAYS,
    );
  } catch {
    // Ignore storage errors and continue with in-memory state.
  }
};

const loadRecipePlannerState = () => {
  try {
    const raw = getCookie(RECIPE_PLANNER_STATE_KEY);

    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw);
    recipePlannerState = {
      ...recipePlannerState,
      ...parsed,
    };
  } catch {
    // Ignore invalid state and keep defaults.
  }
};

const renderLivePlannerState = () => {
  if (!livePlannerText) {
    return;
  }

  const ingredientText =
    recipePlannerState.ingredients.length > 0
      ? `${recipePlannerState.ingredients.length} ingredients`
      : "no ingredients";
  const recipeText =
    recipePlannerState.selectedRecipes.length > 0
      ? `${recipePlannerState.selectedRecipes.length} selected recipes`
      : "no selected recipes";
  const peopleText = `${recipePlannerState.peopleCount || 1} people`;
  const dateText = recipePlannerState.mealDate || "no date yet";

  livePlannerText.textContent = `${ingredientText}, ${recipeText}, ${peopleText}, ${dateText}.`;
};

const setStepButtonState = (button, enabled) => {
  if (!button) {
    return;
  }

  button.setAttribute("aria-disabled", String(!enabled));
  button.classList.toggle("is-disabled", !enabled);
  button.classList.toggle("is-ready", enabled);
};

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

if (
  mealDateInput &&
  mealPeopleInput &&
  mealRecipeTypeSelect &&
  mealSummaryBody &&
  ingredientSummaryBody
) {
  const getCheckedRecipeIds = () =>
    Array.from(recipePickerInputs)
      .filter((input) => input.checked)
      .map((input) => input.value);

  const getSelectedIngredientValues = () =>
    Array.from(ingredientChipInputs)
      .filter((input) => input.checked)
      .map((input) => input.value);

  const getMatchedRecipeIdsFromIngredients = (selectedIngredients) =>
    selectedIngredients.length === 0
      ? []
      : Object.entries(RECIPE_CALCULATOR_DATA)
          .filter(([, recipe]) =>
            recipe.matchIngredients.some((ingredient) => selectedIngredients.includes(ingredient)),
          )
          .map(([id]) => id);

  const syncCatalogueCards = (selectedRecipeIds) => {
    const selectedSet = new Set(selectedRecipeIds);
    recipePlannerState.selectedRecipes = [...selectedSet];
    saveRecipePlannerState();
    renderLivePlannerState();

    for (const card of catalogueCards) {
      const shouldShow = selectedSet.size === 0 || selectedSet.has(card.dataset.recipeId);
      card.classList.toggle("is-hidden", !shouldShow);
    }
  };

  const applyIngredientMatchesToCalculator = (matchedRecipeIds) => {
    const matchedSet = new Set(matchedRecipeIds);
    const activeType = mealRecipeTypeSelect.value;
    recipePlannerState.matchedRecipes = [...matchedSet];
    saveRecipePlannerState();
    renderLivePlannerState();

    for (const input of recipePickerInputs) {
      const card = input.closest(".recipe-picker-card");
      const recipe = RECIPE_CALCULATOR_DATA[input.value];
      const typeAllowed = activeType === "all" || recipe.type === activeType;
      const matchAllowed = matchedSet.size === 0 || matchedSet.has(input.value);
      const shouldShow = typeAllowed && matchAllowed;

      if (card) {
        card.classList.toggle("is-hidden", !shouldShow);
      }

      input.checked = shouldShow && matchedSet.size > 0;
    }
  };

  const syncIngredientsFromRecipes = (selectedRecipeIds) => {
    const selectedIngredients = new Set();

    for (const id of selectedRecipeIds) {
      const recipe = RECIPE_CALCULATOR_DATA[id];

      if (!recipe) {
        continue;
      }

      for (const ingredient of recipe.matchIngredients) {
        selectedIngredients.add(ingredient);
      }
    }

    for (const input of ingredientChipInputs) {
      input.checked = selectedIngredients.has(input.value);
    }

    recipePlannerState.ingredients = [...selectedIngredients];
    saveRecipePlannerState();
    renderLivePlannerState();
  };

  const formatCalculatorAmount = (amount) => {
    if (Number.isInteger(amount)) {
      return String(amount);
    }

    return amount.toFixed(1).replace(".0", "");
  };

  const syncRecipeTypeFilter = () => {
    const activeType = mealRecipeTypeSelect.value;
    const matchedIngredients = getSelectedIngredientValues();
    const matchedRecipeIds = getMatchedRecipeIdsFromIngredients(matchedIngredients);
    const matchedSet = new Set(matchedRecipeIds);

    for (const card of recipePickerCards) {
      const input = card.querySelector(".recipe-picker-input");
      const recipeId = input ? input.value : "";
      const typeAllowed = activeType === "all" || card.dataset.type === activeType;
      const ingredientAllowed = matchedSet.size === 0 || matchedSet.has(recipeId);
      const shouldShow = typeAllowed && ingredientAllowed;
      card.classList.toggle("is-hidden", !shouldShow);
    }
  };

  const renderMealCalculator = () => {
    const peopleCount = Math.max(1, Number(mealPeopleInput.value) || 1);
    const mealDate = mealDateInput.value || new Date().toISOString().slice(0, 10);
    const selectedIds = Array.from(recipePickerInputs)
      .filter((input) => input.checked)
      .map((input) => input.value);

    recipePlannerState.peopleCount = peopleCount;
    recipePlannerState.mealDate = mealDate;
    recipePlannerState.selectedRecipes = [...selectedIds];
    saveRecipePlannerState();
    renderLivePlannerState();

    mealSummaryBody.innerHTML = "";
    ingredientSummaryBody.innerHTML = "";

    if (selectedIds.length === 0) {
      mealSummaryBody.innerHTML =
        '<tr><td colspan="4">Select at least one recipe to build a meal plan.</td></tr>';
      ingredientSummaryBody.innerHTML =
        '<tr><td colspan="2">Ingredient totals will appear once recipes are selected.</td></tr>';
      setStepButtonState(stepToRecipesButton, false);
      syncCatalogueCards([]);
      return;
    }

    setStepButtonState(stepToRecipesButton, true);

    syncCatalogueCards(selectedIds);

    const ingredientTotals = new Map();

    for (const id of selectedIds) {
      const recipe = RECIPE_CALCULATOR_DATA[id];

      if (!recipe) {
        continue;
      }

      const mealRow = document.createElement("tr");
      mealRow.innerHTML = `
        <td>${mealDate}</td>
        <td>${recipe.name}</td>
        <td>${recipe.type}</td>
        <td>${peopleCount}</td>
      `;
      mealSummaryBody.appendChild(mealRow);

      const scale = peopleCount / recipe.baseServings;

      for (const [ingredient, amount, unit] of recipe.ingredients) {
        const key = `${ingredient}__${unit}`;
        const nextTotal = (ingredientTotals.get(key)?.amount || 0) + amount * scale;
        ingredientTotals.set(key, { ingredient, unit, amount: nextTotal });
      }
    }

    for (const { ingredient, unit, amount } of ingredientTotals.values()) {
      const ingredientRow = document.createElement("tr");
      ingredientRow.innerHTML = `
        <td>${ingredient}</td>
        <td>${formatCalculatorAmount(amount)} ${unit}</td>
      `;
      ingredientSummaryBody.appendChild(ingredientRow);
    }
  };

  mealDateInput.value = new Date().toISOString().slice(0, 10);

  if (recipePlannerState.mealDate) {
    mealDateInput.value = recipePlannerState.mealDate;
  }

  if (recipePlannerState.peopleCount) {
    mealPeopleInput.value = String(recipePlannerState.peopleCount);
  }

  mealDateInput.addEventListener("input", renderMealCalculator);
  mealPeopleInput.addEventListener("input", renderMealCalculator);
  mealRecipeTypeSelect.addEventListener("change", () => {
    syncRecipeTypeFilter();
    renderMealCalculator();
  });

  for (const input of recipePickerInputs) {
    input.addEventListener("change", () => {
      if (!isSyncingRecipePlanner) {
        isSyncingRecipePlanner = true;
        syncIngredientsFromRecipes(getCheckedRecipeIds());
        if (typeof rerenderIngredientPlanner === "function") {
          rerenderIngredientPlanner();
        }
        isSyncingRecipePlanner = false;
      }

      syncRecipeTypeFilter();
      renderMealCalculator();
    });
  }

  if (printMealPlanButton) {
    printMealPlanButton.addEventListener("click", () => {
      window.print();
    });
  }

  syncRecipeTypeFilter();
  renderMealCalculator();
}

if (ingredientMatchBody && ingredientSelectionList) {
  const renderIngredientPlanner = () => {
    const selectedIngredients = Array.from(ingredientChipInputs)
      .filter((input) => input.checked)
      .map((input) => input.value);

    ingredientSelectionList.textContent =
      selectedIngredients.length > 0
        ? selectedIngredients.join(", ")
        : "Pick ingredients to see recipe matches.";

    recipePlannerState.ingredients = [...selectedIngredients];
    saveRecipePlannerState();
    renderLivePlannerState();

    ingredientMatchBody.innerHTML = "";

    if (selectedIngredients.length === 0) {
      ingredientMatchBody.innerHTML =
        '<tr><td colspan="3">Select ingredients to see matching recipes.</td></tr>';
      setStepButtonState(stepToCalculatorButton, false);
      if (!isSyncingRecipePlanner) {
        isSyncingRecipePlanner = true;
        syncRecipeTypeFilter();
        renderMealCalculator();
        isSyncingRecipePlanner = false;
      }
      return;
    }

    const rankedRecipes = Object.values(RECIPE_CALCULATOR_DATA)
      .map((recipe) => {
        const matched = recipe.matchIngredients.filter((ingredient) =>
          selectedIngredients.includes(ingredient),
        );

        return {
          recipe,
          matched,
        };
      })
      .filter(({ matched }) => matched.length > 0)
      .sort((left, right) => right.matched.length - left.matched.length);

    if (rankedRecipes.length === 0) {
      ingredientMatchBody.innerHTML =
        '<tr><td colspan="3">No recipe matches yet. Try adding one more ingredient.</td></tr>';
      setStepButtonState(stepToCalculatorButton, false);
      return;
    }

    setStepButtonState(stepToCalculatorButton, true);

    for (const { recipe, matched } of rankedRecipes) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${recipe.name}</td>
        <td>${recipe.type}</td>
        <td>${matched.join(", ")}</td>
      `;
      ingredientMatchBody.appendChild(row);
    }

    if (!isSyncingRecipePlanner) {
      isSyncingRecipePlanner = true;
      applyIngredientMatchesToCalculator(rankedRecipes.map(({ recipe }) =>
        Object.entries(RECIPE_CALCULATOR_DATA).find(([, value]) => value.name === recipe.name)?.[0],
      ).filter(Boolean));
      renderMealCalculator();
      isSyncingRecipePlanner = false;
    }
  };

  rerenderIngredientPlanner = renderIngredientPlanner;

  if (recipePlannerState.ingredients.length > 0) {
    for (const input of ingredientChipInputs) {
      input.checked = recipePlannerState.ingredients.includes(input.value);
    }
  }

  for (const input of ingredientChipInputs) {
    input.addEventListener("change", renderIngredientPlanner);
  }

  renderIngredientPlanner();
}

if (stepToCalculatorButton && mealCalculatorSection) {
  stepToCalculatorButton.addEventListener("click", () => {
    if (stepToCalculatorButton.getAttribute("aria-disabled") === "true") {
      return;
    }

    const selectedIngredients = getSelectedIngredientValues();
    const matchedRecipeIds = getMatchedRecipeIdsFromIngredients(selectedIngredients);

    isSyncingRecipePlanner = true;
    applyIngredientMatchesToCalculator(matchedRecipeIds);
    syncRecipeTypeFilter();
    renderMealCalculator();
    isSyncingRecipePlanner = false;

    setStepperState(2, [1]);
    mealCalculatorSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (stepToRecipesButton && brothRecipesSection) {
  stepToRecipesButton.addEventListener("click", () => {
    if (stepToRecipesButton.getAttribute("aria-disabled") === "true") {
      return;
    }

    const selectedRecipeIds = getCheckedRecipeIds();
    const selectedTypes = new Set(
      selectedRecipeIds.map((id) => RECIPE_CALCULATOR_DATA[id]?.type).filter(Boolean),
    );
    const recipeTarget =
      selectedTypes.size === 1 && selectedTypes.has("non-broth")
        ? document.querySelector("#non-broth-recipes")
        : brothRecipesSection;

    syncCatalogueCards(selectedRecipeIds);

    setStepperState(3, [1, 2]);
    recipeTarget.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (ingredientPlannerSection) {
  loadRecipePlannerState();
  renderLivePlannerState();
  setStepButtonState(stepToCalculatorButton, false);
  setStepButtonState(stepToRecipesButton, false);
  setStepperState(1, []);
}
