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
const topbar = document.querySelector(".topbar");
const metaDescriptionTag = document.querySelector('meta[name="description"]');
const greeniesParentLink = document.querySelector(".nav-link-greenies");
const greeniesSubmenu = document.querySelector(".nav-submenu-greenies");
const greeniesPlantingLink = document.querySelector(".nav-greenies-planting");
const greeniesFertilizationLink = document.querySelector(".nav-greenies-fertilization");

const ensureCatCanCodeLink = () => {
  const navLinks = document.querySelector(".nav-links");
  if (!navLinks) {
    return null;
  }

  let link = navLinks.querySelector(".nav-cat-can-code");
  if (link) {
    return link;
  }

  link = document.createElement("a");
  link.className = "nav-cat-can-code";
  link.href = "cat-can-code/";

  const ptsdLink = navLinks.querySelector('a[href="ptsd.html"]');

  if (ptsdLink) {
    navLinks.insertBefore(link, ptsdLink);
  } else {
    navLinks.appendChild(link);
  }

  return link;
};
const accordionTriggers = document.querySelectorAll(".accordion-trigger");
const quickButtons = document.querySelectorAll(".quick-btn");
const recommendationBody = document.querySelector("#recommendation-body");
const langToggles = document.querySelectorAll(".lang-toggle");

let activePlantType = quickButtons[0]?.dataset?.plant || null;
let localizedRecommendations = {};
let localizedQuickButtonLabels = {};
let localizedRecommendationPlaceholder = "";

const LOCALE_STORAGE_KEY = "home-utilities-locale";
const DEFAULT_LOCALE = "en";

const I18N = {
  en: {
    languageLabel: "Language",
    localeOptionEnglish: "English",
    localeOptionVietnamese: "Tiếng Việt",
    navPrimary: "Primary",
    navStories: "Stories",
    navKitchenNotes: "Kitchen Notes",
    navKitchenNotesSubmenu: "Kitchen Notes submenu",
    navRecipes: "Recipes",
    navShoppingPlanner: "Shopping Planner",
    navPtsd: "PTSD",
    navCatCanCode: "Cat Can Code",
    backToTop: "Top",
    backToTopAria: "Back to top",
    livePlannerWaiting: "Waiting for selections.",
    plannerStatePrefix: "Live planner state",
    ingredientCount: (count) => `${count} ingredients`,
    ingredientCountNone: "no ingredients",
    selectedRecipesCount: (count) => `${count} selected recipes`,
    selectedRecipesCountNone: "no selected recipes",
    peopleCount: (count) => `${count} people`,
    dateNone: "no date yet",
    noSavedMarketBooking: "No saved Binh Dien market visit yet.",
    marketDuration: (hours) => `${hours} hour${hours === 1 ? "" : "s"}`,
    marketBookingSummary: (dateText, timeText, durationText) =>
      `${dateText} at ${timeText} for ${durationText}`,
    googleCalendarText: "Trip to Binh Dien Market",
    googleCalendarDetails:
      "Weekly market trip planned from the Home Utilities Shopping Planner.",
    googleCalendarLocation: "Binh Dien Market, Ho Chi Minh City",
    storyFallbackTitle: "Story",
    storyFallbackKicker: "Chapter",
    mealSummaryEmpty: "Select at least one recipe to build a meal plan.",
    ingredientTotalsEmpty: "Ingredient totals will appear once recipes are selected.",
    ingredientPickerPrompt: "Pick ingredients to see recipe matches.",
    ingredientMatchPrompt: "Select ingredients to see matching recipes.",
    ingredientMatchNone: "No recipe matches yet. Try adding one more ingredient.",
    recipeTypes: {
      broth: "Broth",
      "non-broth": "Non-broth",
    },
    pageTitles: {
      "index.html": "Home Utilities | Vietnamese Cooking & Home Recipe",
      "recipes.html": "Recipes Catalogue | Home Utilities",
      "shopping-planner.html": "Shopping Planner | Home Utilities",
      "stories.html": "Stories | Home Utilities",
      "ptsd.html": "PTSD | Home Utilities",
      "recipe-pho-ga.html": "Pho Ga for Slow Weekends | Home Utilities",
      "recipe-basa-tomato-soup.html": "Basa Tomato Soup | Home Utilities",
      "recipe-seaweed-tofu-soup.html": "Seaweed Tofu Soup | Home Utilities",
      "recipe-pork-rib-pumpkin-soup.html": "Pork Rib Pumpkin Soup | Home Utilities",
      "recipe-thit-kho.html": "Caramelized Thit Kho | Home Utilities",
      "recipe-beef-pumpkin-stir-fry.html": "Beef and Pumpkin Stir-Fry | Home Utilities",
      "recipe-banh-mi-plate.html": "Crisp Morning Banh Mi Plate | Home Utilities",
      "recipe-ginger-fish-sauce.html": "Ginger Fish Sauce Dipping Bowl | Home Utilities",
    },
    pageDescriptions: {
      "index.html":
        "Home Utilities is a personal website for Vietnamese cooking, home recipes, kitchen notes, and organized household planning.",
      "recipes.html":
        "A recipe catalogue for Home Utilities with broth and non-broth navigation, tied to ingredients from the Shopping Planner.",
      "shopping-planner.html":
        "An English weekly shopping planner translated from the approved 30-day menu document for Home Utilities.",
      "stories.html":
        "A chapter-style story page for Home Utilities, designed like an open book with a personal timeline from 1992 to 2026.",
      "ptsd.html":
        "A PTSD page with family scapegoating context, evidence-based terminology, symptom references, and a treatment follow-up timeline template.",
      "recipe-pho-ga.html":
        "A blog-style recipe page for pho ga with story, ingredient notes, and a weekend broth workflow.",
      "recipe-basa-tomato-soup.html":
        "A blog-style recipe page for basa tomato soup with clean broth and tomato brightness.",
      "recipe-seaweed-tofu-soup.html":
        "A blog-style recipe page for seaweed tofu soup with pantry-friendly ingredients and a fast comfort workflow.",
      "recipe-pork-rib-pumpkin-soup.html":
        "A blog-style recipe page for pork rib pumpkin soup with mellow broth and family-style comfort.",
      "recipe-thit-kho.html":
        "A blog-style recipe page for caramelized thit kho with pork, eggs, and coconut water.",
      "recipe-beef-pumpkin-stir-fry.html":
        "A blog-style recipe page for beef and pumpkin stir-fry with garlic and black pepper.",
      "recipe-banh-mi-plate.html":
        "A blog-style recipe page for a banh mi breakfast plate with eggs, herbs, and cucumber.",
      "recipe-ginger-fish-sauce.html":
        "A blog-style recipe page for ginger fish sauce with lime, chili, and bright supporting flavor.",
    },
    navGreenies: "Greenies",
    navGreeniesSubmenu: "Greenies submenu",
    navPlantingDiary: "Planting diary",
    navFertilizationWikipedia: "Fertilization wikipedia",
  },
  vi: {
    languageLabel: "Ngôn ngữ",
    localeOptionEnglish: "English",
    localeOptionVietnamese: "Tiếng Việt",
    navPrimary: "Điều hướng chính",
    navStories: "Câu chuyện",
    navKitchenNotes: "Ghi chú bếp",
    navKitchenNotesSubmenu: "Menu phụ Ghi chú bếp",
    navRecipes: "Công thức",
    navShoppingPlanner: "Kế hoạch đi chợ",
    navPtsd: "PTSD",
    navCatCanCode: "Cat Can Code",
    backToTop: "Lên đầu trang",
    backToTopAria: "Lên đầu trang",
    livePlannerWaiting: "Đang chờ lựa chọn.",
    plannerStatePrefix: "Trạng thái kế hoạch",
    ingredientCount: (count) => `${count} nguyên liệu`,
    ingredientCountNone: "chưa có nguyên liệu",
    selectedRecipesCount: (count) => `${count} công thức đã chọn`,
    selectedRecipesCountNone: "chưa chọn công thức",
    peopleCount: (count) => `${count} người`,
    dateNone: "chưa có ngày",
    noSavedMarketBooking: "Chưa có lịch đi chợ Bình Điền nào được lưu.",
    marketDuration: (hours) => `${hours} giờ`,
    marketBookingSummary: (dateText, timeText, durationText) =>
      `${dateText} lúc ${timeText} trong ${durationText}`,
    googleCalendarText: "Chuyến đi chợ Bình Điền",
    googleCalendarDetails:
      "Lịch đi chợ hằng tuần được tạo từ trang Kế hoạch đi chợ của Home Utilities.",
    googleCalendarLocation: "Chợ Bình Điền, Thành phố Hồ Chí Minh",
    storyFallbackTitle: "Câu chuyện",
    storyFallbackKicker: "Chương",
    mealSummaryEmpty: "Hãy chọn ít nhất một công thức để lập bữa ăn.",
    ingredientTotalsEmpty: "Tổng nguyên liệu sẽ hiện ra sau khi chọn công thức.",
    ingredientPickerPrompt: "Chọn nguyên liệu để xem món phù hợp.",
    ingredientMatchPrompt: "Chọn nguyên liệu để xem công thức phù hợp.",
    ingredientMatchNone: "Chưa có công thức phù hợp. Hãy thêm một nguyên liệu nữa.",
    recipeTypes: {
      broth: "Món nước",
      "non-broth": "Món khô",
    },
    pageTitles: {
      "index.html": "Home Utilities | Nấu ăn Việt và công thức gia đình",
      "recipes.html": "Danh mục công thức | Home Utilities",
      "shopping-planner.html": "Kế hoạch đi chợ | Home Utilities",
      "stories.html": "Câu chuyện | Home Utilities",
      "ptsd.html": "PTSD | Home Utilities",
      "recipe-pho-ga.html": "Phở gà cho cuối tuần chậm rãi | Home Utilities",
      "recipe-basa-tomato-soup.html": "Canh cá basa nấu cà chua | Home Utilities",
      "recipe-seaweed-tofu-soup.html": "Canh rong biển đậu hũ | Home Utilities",
      "recipe-pork-rib-pumpkin-soup.html": "Canh sườn bí đỏ | Home Utilities",
      "recipe-thit-kho.html": "Thịt kho caramel | Home Utilities",
      "recipe-beef-pumpkin-stir-fry.html": "Bò xào bí đỏ | Home Utilities",
      "recipe-banh-mi-plate.html": "Đĩa bánh mì buổi sáng | Home Utilities",
      "recipe-ginger-fish-sauce.html": "Chén nước mắm gừng | Home Utilities",
    },
    pageDescriptions: {
      "index.html":
        "Home Utilities là trang cá nhân về nấu ăn Việt, công thức gia đình, ghi chú bếp và kế hoạch nhà cửa có tổ chức.",
      "recipes.html":
        "Danh mục công thức của Home Utilities với điều hướng món nước và món khô, liên kết với nguyên liệu từ trang Kế hoạch đi chợ.",
      "shopping-planner.html":
        "Trang kế hoạch đi chợ hằng tuần của Home Utilities, dựa trên tài liệu thực đơn 30 ngày đã được duyệt.",
      "stories.html":
        "Trang câu chuyện dạng chương của Home Utilities, thiết kế như một cuốn sách mở với dòng thời gian cá nhân từ 1992 đến 2026.",
      "ptsd.html":
        "Trang PTSD với bối cảnh bị đổ lỗi trong gia đình, thuật ngữ dựa trên bằng chứng, tham chiếu triệu chứng và mẫu theo dõi điều trị.",
      "recipe-pho-ga.html":
        "Trang công thức kiểu blog cho phở gà với phần câu chuyện, ghi chú nguyên liệu và quy trình nấu nước dùng cuối tuần.",
      "recipe-basa-tomato-soup.html":
        "Trang công thức kiểu blog cho canh cá basa nấu cà chua với nước dùng thanh và vị cà chua tươi.",
      "recipe-seaweed-tofu-soup.html":
        "Trang công thức kiểu blog cho canh rong biển đậu hũ với nguyên liệu tiện có và cách nấu nhanh.",
      "recipe-pork-rib-pumpkin-soup.html":
        "Trang công thức kiểu blog cho canh sườn bí đỏ với vị dịu và cảm giác bữa cơm gia đình.",
      "recipe-thit-kho.html":
        "Trang công thức kiểu blog cho thịt kho với thịt heo, trứng và nước dừa.",
      "recipe-beef-pumpkin-stir-fry.html":
        "Trang công thức kiểu blog cho bò xào bí đỏ với tỏi và tiêu đen.",
      "recipe-banh-mi-plate.html":
        "Trang công thức kiểu blog cho đĩa bánh mì buổi sáng với trứng, rau thơm và dưa leo.",
      "recipe-ginger-fish-sauce.html":
        "Trang công thức kiểu blog cho nước mắm gừng với chanh, ớt và vị sáng món.",
    },
    navGreenies: "Greenies",
    navGreeniesSubmenu: "Menu phụ Greenies",
    navPlantingDiary: "Nhật ký trồng trọt",
    navFertilizationWikipedia: "Bách khoa phân bón",
  },
};

const PAGE_TRANSLATIONS = {
  "index.html": {
    vi: [
      { selector: ".hero-content .eyebrow", text: "Trang cá nhân" },
      { selector: ".hero-content h1", text: "Nấu ăn Việt, công thức gia đình và kế hoạch bếp thực tế." },
      { selector: ".hero-content .hero-text", text: "Home Utilities tập hợp những bữa cơm Việt kiểu gia đình, ghi chú công thức tại nhà và công cụ lập kế hoạch giúp việc nấu nướng hằng tuần trở nên đơn giản và có chủ đích hơn." },
      { selector: '.hero-actions a[href="#kitchen-notes"]', text: "Mở Ghi chú bếp" },
      { selector: '.hero-actions a[href="shopping-planner.html"]', text: "Xem kế hoạch đi chợ" },
      { selector: ".hero-card .card-label", text: "Điểm bắt đầu" },
      { selector: ".hero-card h2", text: "Ghi chú bếp là phần tổ chức chính" },
      { selector: ".hero-card p:not(.card-label)", index: 0, text: "Công thức và Kế hoạch đi chợ giờ nằm dưới một nhóm cha, giúp trang web dễ theo dõi hơn như một kho công thức và cũng là một hệ thống sinh hoạt trong nhà." },
      { selector: ".hero-card .feature-list li", all: ["Nấu ăn Việt và công thức gia đình", "Kế hoạch đi chợ tiếng Anh từ bản PDF", "Cấu trúc sinh hoạt hằng tuần", "Ghi chú hỗ trợ tại nhà theo hướng hiểu sang chấn"] },
      { selector: "#stories .story-panel .section-tag", index: 0, text: "Vì sao có trang này" },
      { selector: "#stories .story-panel h2", index: 0, text: "Một kho lưu trữ cá nhân cho những bữa ăn có ý nghĩa." },
      { selector: "#stories .story-panel p", index: 1, text: "Có món là để ăn mừng. Có món là bữa cơm lặp lại nhiều đến mức thành nhịp sống gia đình. Trang web này được tạo ra để giữ lại cả hương vị lẫn hệ thống phía sau những bữa ăn ấy." },
      { selector: '#stories .story-panel .text-link[href="stories.html"]', text: "Mở sổ chuyện" },
      { selector: "#stories .story-panel .section-tag", index: 1, text: "Bạn sẽ thấy gì" },
      { selector: "#stories .story-panel h2", index: 1, text: "Công thức rõ ràng, văn phong ấm và công cụ lập kế hoạch hữu ích." },
      { selector: "#stories .story-panel p", index: 3, text: "Công thức, cấu trúc đi chợ hằng tuần và ghi chú gia đình được nhóm lại theo cách thực tế cho việc nấu ăn mỗi ngày thay vì tách rời thành nhiều ý riêng." },
      { selector: '#stories .story-panel .text-link[href="stories.html#chapter-index"]', text: "Xem các chương và dòng thời gian" },
      { selector: "#kitchen-notes .section-tag", text: "Ghi chú bếp" },
      { selector: "#kitchen-notes h2", text: "Không gian cha cho công thức và kế hoạch đi chợ." },
      { selector: "#kitchen-notes .note-card .card-label", index: 0, text: "Mục con" },
      { selector: "#kitchen-notes .note-card h3", index: 0, text: "Công thức" },
      { selector: "#kitchen-notes .note-card p", index: 0, text: "Một bộ sưu tập đang phát triển về món Việt và công thức gia đình, tập trung vào các bữa ăn dễ chịu, sự linh hoạt với nguyên liệu sẵn có và món ăn kiểu gia đình." },
      { selector: '#kitchen-notes .note-card .text-link[href="recipes.html"]', text: "Mở danh mục công thức" },
      { selector: "#kitchen-notes .note-card .card-label", index: 1, text: "Mục con" },
      { selector: "#kitchen-notes .note-card h3", index: 1, text: "Kế hoạch đi chợ" },
      { selector: "#kitchen-notes .note-card p", index: 1, text: "Một trang lập kế hoạch riêng với toàn bộ tài liệu đi chợ hằng tuần đã dịch, được sắp xếp theo phần tổng quan, công thức tuần và danh sách từng tuần." },
      { selector: '#kitchen-notes .note-card .text-link[href="shopping-planner.html"]', text: "Mở trang kế hoạch" },
      { selector: "#kitchen-notes .note-card .card-label", index: 2, text: "Thói quen bếp" },
      { selector: "#kitchen-notes .note-card h3", index: 2, text: "Xây pantry trước" },
      { selector: "#kitchen-notes .note-card p", index: 2, text: "Nước mắm, bún bánh phở, tiêu đen, hành tím, tỏi và rau thơm tạo thành nền nguyên liệu đáng tin cho hàng chục bữa tối trong tuần." },
      { selector: "#recipes .section-tag", text: "Công thức" },
      { selector: "#recipes h2", text: "Bắt đầu với những món hiện đã nằm trong một danh mục đầy đủ." },
      { selector: '#recipes .button[href="recipes.html"]', text: "Mở trang công thức" },
      { selector: "#recipes .note-card .card-label", index: 0, text: "Danh mục" },
      { selector: "#recipes .note-card h3", index: 0, text: "Điều hướng món nước và món khô" },
      { selector: "#recipes .note-card p", index: 0, text: "Trang công thức hiện tách các món canh, nước dùng khỏi món kho, món xào, món sáng và nước chấm bằng thanh điều hướng bên trái." },
      { selector: "#recipes .note-card .card-label", index: 1, text: "Liên kết với kế hoạch" },
      { selector: "#recipes .note-card h3", index: 1, text: "Công thức gắn với nguyên liệu đi chợ" },
      { selector: "#recipes .note-card p", index: 1, text: "Danh mục giờ được xây quanh các nguyên liệu đã có trong Kế hoạch đi chợ, để trang hoạt động giống một hệ thống nấu nướng thực tế hơn." },
      { selector: "#ptsd .section-tag", text: "PTSD" },
      { selector: "#ptsd h2", text: "Một không gian nhẹ để hỗ trợ gia đình theo hướng hiểu sang chấn." },
      { selector: "#ptsd .planner-caption", text: "Một chuyên mục tạm giữ các thói quen, công cụ neo tâm và thực hành trong nhà giúp điều hòa tốt hơn." },
      { selector: "#ptsd .ptsd-card .card-label", index: 0, text: "Neo tâm" },
      { selector: "#ptsd .ptsd-card h3", index: 0, text: "Những điểm tựa nhỏ mỗi ngày" },
      { selector: "#ptsd .ptsd-card p", index: 0, text: "Xây những nghi thức lặp lại như trà, nghỉ thở, bữa ăn yên tĩnh và khoảnh khắc reset nhẹ để ngôi nhà trở nên an toàn và dễ đoán hơn." },
      { selector: "#ptsd .ptsd-card .card-label", index: 1, text: "Môi trường" },
      { selector: "#ptsd .ptsd-card h3", index: 1, text: "Hệ thống nhà ít ma sát hơn" },
      { selector: "#ptsd .ptsd-card p", index: 1, text: "Sắp xếp việc đi chợ, chuẩn bị bữa ăn và lưu trữ theo cách giảm quá tải và làm nhẹ bớt quyết định thường ngày." },
    ],
  },
  "shopping-planner.html": {
    vi: [
      { selector: ".subpage-hero-copy .eyebrow", text: "Ghi chú bếp / Kế hoạch đi chợ" },
      { selector: ".subpage-hero-copy h1", text: "Kế hoạch đi chợ hằng tuần đã được chuyển ngữ sang tiếng Anh." },
      { selector: ".subpage-hero-copy .hero-text", text: "Trang này dựa trên file PDF thực đơn 30 ngày đã được duyệt. Các nguyên liệu lặp lại được gom theo từng tuần để chỉ cần đi chợ một hoặc hai lần mỗi tuần là đủ cho gia đình." },
      { selector: ".month-calendar-card .card-label", text: "Xem theo tháng" },
      { selector: ".month-calendar-caption", text: "Làm nổi bật ngày đi chợ bạn đã chọn." },
      { selector: ".month-weekdays span", all: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"] },
      { selector: ".planner-page .section-tag", text: "Tóm tắt tài liệu" },
      { selector: ".planner-page h2", text: "Hướng dẫn đi chợ hằng tuần thực tế cho 3 người." },
      { selector: ".planner-page .planner-caption", index: 0, text: "Khẩu phần được tính cho 7 ngày với khoảng 150k mỗi ngày, chưa bao gồm gạo và gia vị cơ bản." },
      { selector: ".planner-sidebar .sidebar-title", text: "Cây kế hoạch" },
      { selector: '.tree-menu a[href="#planner-overview"]', text: "Tổng quan" },
      { selector: '.tree-menu a[href="#market-scheduler"]', text: "Giờ đi chợ Bình Điền" },
      { selector: '.tree-menu a[href="#weekly-formula"]', text: "Công thức tuần trung bình" },
      { selector: ".tree-toggle", text: "Danh sách đi chợ theo tuần" },
      { selector: '.tree-links a[href="#week-1"]', text: "Tuần 1 | Ngày 1-7" },
      { selector: '.tree-links a[href="#week-2"]', text: "Tuần 2 | Ngày 8-14" },
      { selector: '.tree-links a[href="#week-3"]', text: "Tuần 3 | Ngày 15-21" },
      { selector: '.tree-links a[href="#week-4"]', text: "Tuần 4 | Ngày 22-28" },
      { selector: '.tree-links a[href="#refill-days"]', text: "Ngày 29-30 bổ sung" },
      { selector: '.tree-menu a[href="#smart-tips"]', text: "Mẹo đi chợ thông minh" },
      { selector: "#planner-overview .card-label", text: "Phần mở đầu đã dịch" },
      { selector: "#planner-overview h3", text: "Danh sách đi chợ hằng tuần dựa trên thực đơn 30 ngày đã được duyệt." },
      { selector: "#planner-overview p", text: "Các nguyên liệu lặp lại đã được gộp trong từng tuần để phụ huynh chỉ cần đi chợ một hoặc hai lần mỗi tuần. Số lượng được tính cho 3 người trong 7 ngày, với khoảng 150k mỗi ngày, không bao gồm gạo và gia vị." },
      { selector: "#market-scheduler .card-label", text: "Lên lịch đi chợ" },
      { selector: "#market-scheduler h3", text: "Đánh dấu giờ đi chợ Bình Điền." },
      { selector: "#market-scheduler > p", text: "Chọn ngày và giờ, lưu lại như lời nhắc trên thiết bị này hoặc mở trực tiếp trong Google Calendar khi bạn đã đăng nhập tài khoản Google của mình." },
      { selector: 'label[for="market-date"]', text: "Ngày" },
      { selector: 'label[for="market-time"]', text: "Giờ" },
      { selector: 'label[for="market-duration"]', text: "Thời lượng" },
      { selector: ".duration-suffix", text: "giờ" },
      { selector: ".summary-chip", text: "Dấu lưu cá nhân" },
      { selector: ".market-summary h4", text: "Lịch đi chợ đã lưu" },
      { selector: "#bookmark-market-time", text: "Lưu dấu" },
      { selector: "#add-google-calendar", text: "Thêm vào Google Calendar" },
      { selector: ".market-help", text: "Google Calendar sẽ mở trong trình duyệt và dùng tài khoản Google đang đăng nhập ở đó, để bạn tự xem lại và lưu sự kiện." },
      { selector: "#weekly-formula .card-label", text: "Mức mua trung bình mỗi tuần" },
      { selector: "#weekly-formula h3", text: "Một công thức cố định có thể dùng lại mỗi tuần." },
      { selector: "#weekly-formula .planner-list li", all: ["Thịt heo: khoảng 900g", "Hải sản hỗn hợp: khoảng 700-900g", "Thịt bò: khoảng 300g", "Sườn non: khoảng 500g", "Gà: khoảng nửa con", "Trứng: 10-12 quả", "Rau củ: 4-5kg", "Đậu hũ: 4 bìa"] },
      { selector: "#weekly-formula .planner-note p", text: "Công thức này có thể dùng lại cho bất kỳ tuần nào mà không cần tính lại cả thực đơn." },
      { selector: "#refill-days .card-label", text: "Đi chợ bổ sung" },
      { selector: "#refill-days h3", text: "Danh sách bổ sung ngày 29-30" },
      { selector: "#smart-tips .card-label", text: "Mẹo đi chợ thông minh" },
      { selector: "#smart-tips h3", text: "Những cách đơn giản để tiết kiệm công và chi phí." },
      { selector: "#smart-tips .planner-list li", all: ["Mua thịt một lần, chia túi rồi cấp đông.", "Mua rau hai lần mỗi tuần để rau tươi và rẻ hơn.", "Mua hải sản đông lạnh để tiết kiệm khoảng 25-35%."] },
    ],
  },
  "recipes.html": {
    vi: [
      { selector: ".subpage-hero-copy .eyebrow", text: "Ghi chú bếp / Công thức" },
      { selector: ".subpage-hero-copy h1", text: "Danh mục công thức được sắp theo món nước và món khô." },
      { selector: ".subpage-hero-copy .hero-text", text: "Trang này biến Kế hoạch đi chợ thành một kệ nấu ăn có thể dùng ngay. Công thức được nhóm theo kiểu món, nối với luồng nguyên liệu của kế hoạch tuần và dẫn sang các trang đọc kiểu blog." },
      { selector: '.hero-actions a[href="#broth-recipes"]', text: "Xem món nước" },
      { selector: '.hero-actions a[href="#non-broth-recipes"]', text: "Xem món khô" },
      { selector: ".recipe-side-card .card-label", index: 0, text: "Liên kết với kế hoạch" },
      { selector: ".recipe-side-card h2", text: "Được xây từ nguyên liệu đi chợ hằng tuần" },
      { selector: ".feature-list li", all: ["Gà, heo, sườn, bò, tôm, mực và basa", "Bí đỏ, cà chua, dưa leo, nấm, rau xanh và bắp cải", "Trứng, đậu hũ, rong biển, rau thơm và các món pantry cơ bản"] },
      { selector: ".story-ledger-note", text: "Hãy xem đây là nửa còn lại của kế hoạch: một trang để quyết định nấu gì từ những gì đã có sẵn." },
      { selector: ".catalogue-sidebar .sidebar-title", text: "Điều hướng công thức" },
      { selector: '.tree-menu a[href="#catalogue-overview"]', text: "Tổng quan danh mục" },
      { selector: '.tree-menu a[href="#meal-calculator"]', text: "Máy tính bữa ăn" },
      { selector: '.tree-menu a[href="#ingredient-planner"]', text: "Lập kế hoạch theo nguyên liệu" },
      { selector: '.tree-menu a[href="#broth-recipes"]', text: "Món nước" },
      { selector: '.tree-menu a[href="#non-broth-recipes"]', text: "Món khô" },
      { selector: "#planning-stepper .section-tag", text: "Luồng gợi ý" },
      { selector: "#planning-stepper h2", text: "Đi từ nguyên liệu sang lập bữa ăn rồi tới đọc công thức." },
      { selector: ".live-planner-bar strong", text: "Trạng thái kế hoạch" },
      { selector: ".stepper-item strong", all: ["Nguyên liệu", "Bữa ăn", "Công thức"] },
      { selector: ".stepper-item span", all: ["Bắt đầu từ những gì bạn có hoặc có thể mua", "Chọn ngày, số người và loại món", "Đọc và chuẩn bị món đã chọn"] },
      { selector: "#catalogue-overview .section-tag", text: "Danh mục" },
      { selector: "#catalogue-overview h2", text: "Từ danh sách đi chợ thành bữa ăn thực sự." },
      { selector: "#catalogue-overview .recipe-story-lead", text: "Kế hoạch đi chợ đã xác định nguyên liệu. Danh mục này biến chính những nguyên liệu ấy thành một bản đồ nấu ăn mà bạn có thể điều hướng." },
      { selector: "#catalogue-overview .recipe-story-body p", all: ["Món nước là các tô, món canh và bữa ăn nhẹ phụ thuộc vào nước dùng, quá trình hầm hoặc nền nước. Món khô là các món kho, xào, bữa sáng và nước chấm tạo cấu trúc cho phần còn lại của tuần.", "Mỗi công thức bên dưới đều gắn với các nguyên liệu đã có trong kế hoạch, nên danh mục mang cảm giác thực tế thay vì chỉ để mơ ước."] },
      { selector: "#ingredient-planner .section-tag", text: "Lập theo nguyên liệu" },
      { selector: "#ingredient-planner h2", text: "Bắt đầu từ những nguyên liệu bạn có hoặc có thể mua." },
      { selector: "#ingredient-planner .planner-caption", text: "Một góc nhìn linh hoạt cho những ngày nguyên liệu đi trước và công thức đi sau." },
      { selector: "#ingredient-planner .recipe-story-body p", text: "Dùng chế độ này khi kế hoạch không xoay quanh thực đơn cố định mà xoay quanh những gì đã có trong bếp hoặc dễ mua nhất. Hãy chọn các nguyên liệu bạn đang có, trang sẽ gợi ý những công thức phù hợp từ danh mục." },
      { selector: ".ingredient-chip", all: ["Gà", "Heo", "Sườn non", "Bò", "Phi lê basa", "Đậu hũ", "Rong biển", "Trứng", "Bí đỏ", "Cà chua", "Dưa leo", "Rau thơm", "Gừng", "Nước mắm", "Bánh mì", "Bánh phở"] },
      { selector: ".ingredient-summary-layout .card-label", index: 0, text: "Khớp món" },
      { selector: ".ingredient-summary-layout h3", index: 0, text: "Những công thức hợp với nguyên liệu đã chọn" },
      { selector: "#ingredient-match-body", text: "" },
      { selector: ".summary-table th", all: ["Công thức", "Loại", "Nguyên liệu khớp", "Ngày", "Công thức", "Loại", "Phần ăn", "Nguyên liệu", "Tổng cần"] },
      { selector: ".ingredient-summary-layout .card-label", index: 1, text: "Nguyên liệu hiện có" },
      { selector: ".ingredient-summary-layout h3", index: 1, text: "Lựa chọn nguyên liệu hiện tại" },
      { selector: "#step-to-calculator", text: "Tiếp tục tới lập bữa ăn" },
      { selector: "#meal-calculator .section-tag", text: "Máy tính" },
      { selector: "#meal-calculator h2", text: "Lập bữa ăn theo ngày, số người và loại món." },
      { selector: "#print-meal-plan", text: "In kế hoạch bữa ăn" },
      { selector: 'label[for="meal-date"]', text: "Ngày ăn" },
      { selector: 'label[for="meal-people"]', text: "Số người" },
      { selector: 'label[for="meal-recipe-type"]', text: "Loại công thức" },
      { selector: '#meal-recipe-type option[value="all"]', text: "Tất cả công thức" },
      { selector: '#meal-recipe-type option[value="broth"]', text: "Công thức món nước" },
      { selector: '#meal-recipe-type option[value="non-broth"]', text: "Công thức món khô" },
      { selector: ".recipe-picker-card strong", all: ["Phở gà", "Canh cá basa nấu cà", "Canh rong biển đậu hũ", "Canh sườn bí đỏ", "Thịt kho", "Bò xào bí đỏ", "Đĩa bánh mì", "Nước mắm gừng"] },
      { selector: ".recipe-picker-card span", all: ["Món nước", "Món nước", "Món nước", "Món nước", "Món khô", "Món khô", "Món khô", "Món khô"] },
      { selector: ".calculator-summary .card-label", index: 0, text: "Tóm tắt bữa ăn" },
      { selector: ".calculator-summary h3", index: 0, text: "Những món đã chọn cho ngày" },
      { selector: ".calculator-summary .card-label", index: 1, text: "Nguyên liệu" },
      { selector: ".calculator-summary h3", index: 1, text: "Tổng nguyên liệu gộp lại" },
      { selector: "#step-to-recipes", text: "Tiếp tục tới đọc công thức" },
      { selector: "#broth-recipes .section-tag", text: "Món nước" },
      { selector: "#broth-recipes h2", text: "Dùng khi tuần cần sự ấm áp và mềm dịu." },
      { selector: "#non-broth-recipes .section-tag", text: "Món khô" },
      { selector: "#non-broth-recipes h2", text: "Dùng khi tuần cần độ đầy, kết cấu và cấu trúc." },
    ],
  },
  "stories.html": {
    vi: [
      { selector: ".subpage-hero-copy .eyebrow", text: "Câu chuyện / Sách theo chương" },
      { selector: ".subpage-hero-copy h1", text: "Kho lưu trữ câu chuyện kiểu sách với dòng thời gian cuộc đời từ 1992 đến 2026." },
      { selector: ".subpage-hero-copy .hero-text", text: "Trang này xem ký ức như những chương thay vì ghi chú rời rạc. Mỗi giai đoạn được đọc như một trang đôi trong một cuốn sách cá nhân, có chỗ cho gia đình, ngôi nhà, hồi phục, thói quen và ý nghĩa nối chúng lại." },
      { selector: '.hero-actions a[href="#chapter-index"]', text: "Mở mục lục chương" },
      { selector: '.hero-actions a[href="#timeline-rail"]', text: "Xem toàn bộ dòng thời gian" },
      { selector: ".story-ledger-card .card-label", text: "Tập một" },
      { selector: ".story-ledger-card h2", text: "Thiết kế trang chương và trang truyện" },
      { selector: ".story-ledger-card .feature-list li", all: ["Bố cục sách mở với thẻ chương", "Dòng thời gian từ 1992 đến 2026", "Nhịp truyện cho tuổi thơ, thay đổi và tái dựng", "Cấu trúc linh hoạt cho những bài viết cá nhân sau này"] },
      { selector: ".story-ledger-card .story-ledger-note", text: "Phần viết bên dưới được cố ý đặt trong khung biên tập để có thể lớn dần thành những chương đời đầy đặn hơn theo thời gian." },
      { selector: "#chapter-index .section-tag", text: "Mục lục chương" },
      { selector: "#chapter-index h2", text: "Bố cục sách mở cho những câu chuyện dài." },
      { selector: "#chapter-index .planner-caption", text: "Mỗi chương bao phủ một giai đoạn trong dòng thời gian và sau này có thể tách thành trang riêng." },
      { selector: ".chapter-kicker", all: ["Chương 1", "Chương 2", "Chương 3", "Chương 4", "Chương 5", "Chương 6"] },
      { selector: ".chapter-index-card strong", all: ["Khởi nguồn", "Những năm đi học", "Bản sắc và áp lực", "Công việc, ngôi nhà và rạn vỡ", "Điều trị và tái khung", "Xây lại hệ thống"] },
      { selector: ".story-book-section .section-tag", index: 1, text: "Dòng thời gian" },
      { selector: ".story-book-section h2", index: 1, text: "Đường ray dài từ 1992 đến 2026." },
      { selector: ".story-book-section .planner-caption", index: 1, text: "Một trục thị giác cho toàn bộ câu chuyện, từ khởi đầu tới hiện tại." },
      { selector: ".timeline-stop p", all: ["Sự ra đời và những khởi đầu của gia đình.", "Những năm đầu đi học và ký ức gia đình.", "Tuổi thiếu niên, áp lực và bản sắc thay đổi.", "Ngã rẽ giữa học tập, công việc và cảm giác thuộc về.", "Căng thẳng, rạn vỡ và thay đổi lớn.", "Hồ sơ điều trị, gọi tên triệu chứng và cân chỉnh lại.", "Suy ngẫm hiện tại, hệ thống trong nhà và chương tiếp theo."] },
      { selector: ".story-modal-close", text: "Đóng" },
    ],
  },
  "ptsd.html": {
    vi: [
      { selector: ".subpage-hero-copy .eyebrow", text: "Hỗ trợ / PTSD" },
      { selector: ".subpage-hero-copy h1", text: "PTSD, việc bị đổ lỗi trong gia đình và lịch sử điều trị trong một trang vững vàng." },
      { selector: ".subpage-hero-copy .hero-text", text: "Trang này tách động lực hệ gia đình khỏi chẩn đoán chính thức, rồi tóm tắt thuật ngữ PTSD, các cụm triệu chứng và theo dõi điều trị bằng tài liệu dựa trên bằng chứng cùng mẫu lưu trữ riêng tư." },
      { selector: ".ptsd-hero-card .card-label", text: "Phạm vi" },
      { selector: ".ptsd-hero-card h2", text: "Ba phần" },
      { selector: ".ptsd-hero-card .feature-list li", all: ["Bài viết về việc trở thành người bị đổ lỗi trong gia đình", "Thuật ngữ khoa học và các cụm triệu chứng", "Mẫu theo dõi điều trị và tái khám bác sĩ tâm thần trong một năm"] },
      { selector: ".ptsd-note", text: "Trang này nhằm mục đích thông tin và tổ chức. Đây không phải là chẩn đoán hay sự thay thế cho chăm sóc y tế chuyên môn." },
      { selector: "#family-scapegoat .section-tag", text: "Bài viết" },
      { selector: "#family-scapegoat h2", text: "PTSD trong bối cảnh bị xem là vật tế thần của gia đình." },
      { selector: "#family-scapegoat .planner-caption", text: "Việc đổ lỗi trong gia đình là một mô thức hệ thống gia đình, không phải chẩn đoán DSM." },
      { selector: "#scientific-record .section-tag", text: "Hồ sơ khoa học" },
      { selector: "#scientific-record h2", text: "Thuật ngữ tâm lý, cách diễn giải tổn thương và các cụm triệu chứng." },
      { selector: "#scientific-record .planner-caption", text: "Dựa trên tài liệu NIMH và NCBI/PMC." },
      { selector: "#medical-follow-up .section-tag", text: "Hồ sơ y khoa" },
      { selector: "#medical-follow-up h2", text: "Bản dịch đơn thuốc sang tiếng Anh kèm ghi chú về thuốc." },
      { selector: "#medical-follow-up .planner-caption", text: "Dựa trên toa thuốc hiển thị ngày 2 tháng 6 năm 2023, không nhúng hình ảnh." },
    ],
  },
};

let currentLocale = DEFAULT_LOCALE;
let localeData = {
  common: {},
  page: {},
};

const getCurrentPage = () => {
  const path = window.location.pathname;

  if (path.includes("/cat-can-code/day-1")) {
    return "cat-can-code-day-1.html";
  }

  if (path.includes("/cat-can-code")) {
    return "cat-can-code.html";
  }

  const name = path.split("/").pop();
  return name || "index.html";
};

const getLocaleStrings = () => ({
  ...(I18N[DEFAULT_LOCALE] || {}),
  ...(I18N[currentLocale] || {}),
  ...(localeData.common || {}),
});

const getInitialLocale = () => {
  const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return saved === "en" || saved === "vi" ? saved : DEFAULT_LOCALE;
};

const setTextContentBySelector = (selector, value, index = 0) => {
  const nodes = document.querySelectorAll(selector);
  if (!nodes.length) {
    return;
  }

  const target = nodes[index];
  if (target) {
    target.textContent = value;
  }
};

const setTextAcrossSelector = (selector, values) => {
  const nodes = document.querySelectorAll(selector);
  values.forEach((value, index) => {
    const node = nodes[index];
    if (node) {
      node.textContent = value;
    }
  });
};

const safeFetchJson = async (path) => {
  try {
    const response = await fetch(path, { cache: "no-store" });

    if (!response.ok) {
      return {};
    }

    return await response.json();
  } catch {
    return {};
  }
};

const loadLocaleData = async () => {
  const page = getCurrentPage();
  const pageKey = page.replace(/\.html$/i, "");

  const [commonData, pageData] = await Promise.all([
    safeFetchJson(`locales/${currentLocale}/common.json`),
    safeFetchJson(`locales/${currentLocale}/${pageKey}.json`),
  ]);

  localeData = {
    common: commonData,
    page: pageData,
  };
};

const applyPageTranslations = () => {
  const page = getCurrentPage();
  const entries =
    Array.isArray(localeData.page.translations) && localeData.page.translations.length > 0
      ? localeData.page.translations
      : PAGE_TRANSLATIONS[page]?.[currentLocale] || [];

  for (const entry of entries) {
    if (entry.all) {
      setTextAcrossSelector(entry.selector, entry.all);
      continue;
    }

    if (entry.attr) {
      const node = document.querySelector(entry.selector);
      if (node) {
        node.setAttribute(entry.attr, entry.text);
      }
      continue;
    }

    setTextContentBySelector(entry.selector, entry.text, entry.index || 0);
  }
};

const updateRecommendationText = (plantKey) => {
  if (!recommendationBody) {
    return;
  }

  if (!plantKey) {
    recommendationBody.textContent =
      localizedRecommendationPlaceholder || recommendationBody.dataset.defaultText || "";
    return;
  }

  recommendationBody.textContent =
    localizedRecommendations[plantKey] ||
    localizedRecommendationPlaceholder ||
    recommendationBody.dataset.defaultText ||
    "";
};

const updateQuickButtonLabels = () => {
  if (!quickButtons.length) {
    return;
  }

  quickButtons.forEach((button) => {
    const label = localizedQuickButtonLabels[button.dataset.plant];
    if (label) {
      button.textContent = label;
    }
  });
};

const updateQuickButtonStates = () => {
  if (!quickButtons.length) {
    return;
  }

  quickButtons.forEach((button) => {
    const isActive = Boolean(activePlantType && button.dataset.plant === activePlantType);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const attachQuickButtonListeners = () => {
  if (!quickButtons.length) {
    return;
  }

  quickButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activePlantType = button.dataset.plant;
      updateRecommendationText(activePlantType);
      updateQuickButtonStates();
    });
  });
};

const setLanguageToggle = (toggle, lang) => {
  if (!toggle) {
    return;
  }

  const buttons = toggle.querySelectorAll("[data-lang]");
  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  const targetId = toggle.dataset.target;
  const container =
    (targetId && document.getElementById(targetId)) || toggle.nextElementSibling;

  if (!container) {
    return;
  }

  container.querySelectorAll("[data-lang-content]").forEach((node) => {
    node.classList.toggle("hidden", node.dataset.langContent !== lang);
  });
};

const initLangToggles = () => {
  if (!langToggles.length) {
    return;
  }

  langToggles.forEach((toggle) => {
    const buttons = toggle.querySelectorAll("[data-lang]");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        setLanguageToggle(toggle, button.dataset.lang);
      });
    });
  });
};

const syncLangTogglesToLocale = () => {
  if (!langToggles.length) {
    return;
  }

  langToggles.forEach((toggle) => {
    const lang = currentLocale || DEFAULT_LOCALE;
    const button =
      toggle.querySelector(`[data-lang="${lang}"]`) || toggle.querySelector("[data-lang]");
    const activeLang = button ? button.dataset.lang : lang;
    setLanguageToggle(toggle, activeLang);
  });
};

const initSketchParallax = () => {
  const layers = document.querySelectorAll(".sketch-layer");
  if (!layers.length) {
    return;
  }

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateLayers = () => {
    layers.forEach((layer) => {
      const speed = Number(layer.dataset.speed) || 0;
      layer.style.transform = `translate3d(0, ${lastScrollY * speed}px, 0)`;
    });
    ticking = false;
  };

  const onScroll = () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(updateLayers);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  updateLayers();
};

const initAccordions = () => {
  if (!accordionTriggers.length) {
    return;
  }

  accordionTriggers.forEach((button) => {
    const panel = button.nextElementSibling;
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => {
      if (!panel) {
        return;
      }
      const isOpen = panel.classList.toggle("active");
      panel.style.display = isOpen ? "block" : "none";
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });
};

const syncDynamicContent = () => {
  localizedRecommendations = localeData.page.recommendations || {};
  localizedQuickButtonLabels = localeData.page.quickButtons || {};
  localizedRecommendationPlaceholder =
    localeData.page.recommendationPlaceholder ||
    localeData.page.placeholder ||
    localizedRecommendationPlaceholder;

  if (quickButtons.length && !activePlantType) {
    activePlantType = quickButtons[0]?.dataset?.plant || null;
  }

  updateQuickButtonLabels();
  updateQuickButtonStates();
  updateRecommendationText(activePlantType);
  syncLangTogglesToLocale();
};

const syncDocumentLanguage = () => {
  const localeStrings = getLocaleStrings();
  const page = getCurrentPage();
  document.documentElement.lang = currentLocale;

  if (localeData.page.title) {
    document.title = localeData.page.title;
  } else if (localeStrings.pageTitles?.[page]) {
    document.title = localeStrings.pageTitles[page];
  }

  if (metaDescriptionTag && localeData.page.description) {
    metaDescriptionTag.setAttribute("content", localeData.page.description);
  } else if (metaDescriptionTag && localeStrings.pageDescriptions?.[page]) {
    metaDescriptionTag.setAttribute("content", localeStrings.pageDescriptions[page]);
  }
};

const syncCommonLocaleLabels = () => {
  const localeStrings = getLocaleStrings();
  const backToTopButtons = document.querySelectorAll(".back-to-top");
  const primaryNav = document.querySelector(".topbar");
  const storiesLinks = document.querySelectorAll('.nav-links a[href="stories.html"], .nav-links a[href="#stories-book"]');
  const kitchenNotesLinks = document.querySelectorAll('.nav-parent > a[href="index.html#kitchen-notes"], .nav-parent > a[href="#kitchen-notes"]');
  const recipesLinks = document.querySelectorAll('.nav-submenu a[href="recipes.html"], .nav-submenu a[href="#recipe-catalogue"]');
  const shoppingPlannerLinks = document.querySelectorAll('.nav-submenu a[href="shopping-planner.html"], .nav-submenu a[href="#shopping-planner"]');
  const ptsdLinks = document.querySelectorAll('.nav-links a[href="ptsd.html"], .nav-links a[href="#ptsd-page"]');
  const localeLabel = document.querySelector(".locale-switcher-label");
  const localeSelect = document.querySelector("#locale-select");
  const localeOptions = localeSelect ? localeSelect.querySelectorAll("option") : [];

  if (primaryNav) {
    primaryNav.setAttribute("aria-label", localeStrings.navPrimary);
  }

  const kitchenSubmenu = document.querySelector(".nav-submenu-kitchen");
  if (kitchenSubmenu) {
    kitchenSubmenu.setAttribute("aria-label", localeStrings.navKitchenNotesSubmenu);
  }
  if (greeniesSubmenu && localeStrings.navGreeniesSubmenu) {
    greeniesSubmenu.setAttribute("aria-label", localeStrings.navGreeniesSubmenu);
  }

  const catCanCodeLink = ensureCatCanCodeLink();
  if (catCanCodeLink && localeStrings.navCatCanCode) {
    catCanCodeLink.textContent = localeStrings.navCatCanCode;
    catCanCodeLink.setAttribute("aria-label", localeStrings.navCatCanCode);
  }

  storiesLinks.forEach((node) => {
    node.textContent = localeStrings.navStories;
  });
  kitchenNotesLinks.forEach((node) => {
    node.textContent = localeStrings.navKitchenNotes;
  });
  recipesLinks.forEach((node) => {
    node.textContent = localeStrings.navRecipes;
  });
  shoppingPlannerLinks.forEach((node) => {
    node.textContent = localeStrings.navShoppingPlanner;
  });
  ptsdLinks.forEach((node) => {
    node.textContent = localeStrings.navPtsd;
  });

  if (greeniesParentLink && localeStrings.navGreenies) {
    greeniesParentLink.textContent = localeStrings.navGreenies;
  }
  if (greeniesPlantingLink && localeStrings.navPlantingDiary) {
    greeniesPlantingLink.textContent = localeStrings.navPlantingDiary;
  }
  if (greeniesFertilizationLink && localeStrings.navFertilizationWikipedia) {
    greeniesFertilizationLink.textContent = localeStrings.navFertilizationWikipedia;
  }

  if (localeLabel) {
    localeLabel.textContent = localeStrings.languageLabel;
  }

  if (localeOptions[0]) {
    localeOptions[0].textContent = localeStrings.localeOptionEnglish;
  }
  if (localeOptions[1]) {
    localeOptions[1].textContent = localeStrings.localeOptionVietnamese;
  }

  backToTopButtons.forEach((button) => {
    button.textContent = localeStrings.backToTop;
    button.setAttribute("aria-label", localeStrings.backToTopAria);
  });
};

const bindLocaleSwitcher = (localeSelect) => {
  if (!localeSelect) {
    return;
  }

  localeSelect.value = currentLocale;
  localeSelect.addEventListener("change", (event) => {
    currentLocale = event.target.value;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, currentLocale);
    applyLocale();
  });
};

const injectLocaleSwitcher = () => {
  const existingLocaleSelect = document.querySelector("#locale-select");

  if (existingLocaleSelect) {
    bindLocaleSwitcher(existingLocaleSelect);
    return;
  }

  if (!topbar) {
    return;
  }

  const localeSwitcher = document.createElement("label");
  localeSwitcher.className = "locale-switcher";
  localeSwitcher.innerHTML = `
    <span class="locale-switcher-label"></span>
    <select class="locale-select" id="locale-select" aria-label="Language selector">
      <option value="en">English</option>
      <option value="vi">Tiếng Việt</option>
    </select>
  `;

  topbar.appendChild(localeSwitcher);

  const localeSelect = localeSwitcher.querySelector("#locale-select");
  bindLocaleSwitcher(localeSelect);
};

const applyLocale = async () => {
  await loadLocaleData();
  syncDocumentLanguage();
  syncCommonLocaleLabels();
  applyPageTranslations();
  syncDynamicContent();
  renderSavedMarketBooking();
  renderLivePlannerState();
};

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

  const localeStrings = getLocaleStrings();
  const ingredientText =
    recipePlannerState.ingredients.length > 0
      ? localeStrings.ingredientCount(recipePlannerState.ingredients.length)
      : localeStrings.ingredientCountNone;
  const recipeText =
    recipePlannerState.selectedRecipes.length > 0
      ? localeStrings.selectedRecipesCount(recipePlannerState.selectedRecipes.length)
      : localeStrings.selectedRecipesCountNone;
  const peopleText = localeStrings.peopleCount(recipePlannerState.peopleCount || 1);
  const dateText = recipePlannerState.mealDate || localeStrings.dateNone;

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
  const localeStrings = getLocaleStrings();

  if (!dateValue || !timeValue || !durationValue) {
    return localeStrings.noSavedMarketBooking;
  }

  const start = new Date(`${dateValue}T${timeValue}:00`);
  const dateText = new Intl.DateTimeFormat(currentLocale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(start);

  const timeText = new Intl.DateTimeFormat(currentLocale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(start);

  const hours = Number(durationValue);
  const durationText = localeStrings.marketDuration(hours);

  return localeStrings.marketBookingSummary(dateText, timeText, durationText);
};

const renderSavedMarketBooking = () => {
  if (!savedMarketBooking) {
    return;
  }

  const raw = window.localStorage.getItem(MARKET_BOOKING_KEY);

  if (!raw) {
    savedMarketBooking.textContent = getLocaleStrings().noSavedMarketBooking;
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
    savedMarketBooking.textContent = getLocaleStrings().noSavedMarketBooking;
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

initAccordions();
initLangToggles();
attachQuickButtonListeners();
initSketchParallax();

currentLocale = getInitialLocale();
injectLocaleSwitcher();
applyLocale();

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

  monthCalendarTitle.textContent = new Intl.DateTimeFormat(currentLocale, {
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
      text: getLocaleStrings().googleCalendarText,
      dates: `${toGoogleCalendarDate(start)}/${toGoogleCalendarDate(end)}`,
      details: getLocaleStrings().googleCalendarDetails,
      location: getLocaleStrings().googleCalendarLocation,
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

    storyModalTitle.textContent = storyTitle || getLocaleStrings().storyFallbackTitle;
    storyModalKicker.textContent = storyKicker || getLocaleStrings().storyFallbackKicker;
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
        `<tr><td colspan="4">${getLocaleStrings().mealSummaryEmpty}</td></tr>`;
      ingredientSummaryBody.innerHTML =
        `<tr><td colspan="2">${getLocaleStrings().ingredientTotalsEmpty}</td></tr>`;
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
        <td>${getLocaleStrings().recipeTypes[recipe.type] || recipe.type}</td>
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
        : getLocaleStrings().ingredientPickerPrompt;

    recipePlannerState.ingredients = [...selectedIngredients];
    saveRecipePlannerState();
    renderLivePlannerState();

    ingredientMatchBody.innerHTML = "";

    if (selectedIngredients.length === 0) {
      ingredientMatchBody.innerHTML =
        `<tr><td colspan="3">${getLocaleStrings().ingredientMatchPrompt}</td></tr>`;
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
        `<tr><td colspan="3">${getLocaleStrings().ingredientMatchNone}</td></tr>`;
      setStepButtonState(stepToCalculatorButton, false);
      return;
    }

    setStepButtonState(stepToCalculatorButton, true);

    for (const { recipe, matched } of rankedRecipes) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${recipe.name}</td>
        <td>${getLocaleStrings().recipeTypes[recipe.type] || recipe.type}</td>
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
