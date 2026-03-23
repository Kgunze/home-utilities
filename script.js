const filterButtons = document.querySelectorAll(".filter-button");
const recipeCards = document.querySelectorAll(".recipe-card");
const treeToggles = document.querySelectorAll(".tree-toggle");
const backToTopButton = document.querySelector(".back-to-top");

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
