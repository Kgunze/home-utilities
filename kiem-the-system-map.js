(() => {
  const sidebarGroups = document.querySelector("#kt-sidebar-groups");
  const tabsRoot = document.querySelector("#kt-tabs");
  const graphNodes = document.querySelector("#kt-graph-nodes");
  const graphLines = document.querySelector("#kt-graph-lines");
  const detailList = document.querySelector("#kt-detail-list");
  const timelineGrid = document.querySelector("#kt-timeline-grid");
  const buildPhaseList = document.querySelector("#kt-build-phase-list");
  const combatFlow = document.querySelector("#kt-combat-flow");
  const optimizationList = document.querySelector("#kt-optimization-list");

  if (
    !sidebarGroups ||
    !tabsRoot ||
    !graphNodes ||
    !graphLines ||
    !detailList ||
    !timelineGrid ||
    !buildPhaseList ||
    !combatFlow ||
    !optimizationList
  ) {
    return;
  }

  const copy = {
    en: {
      heroEyebrow: "MMORPG / System Visualization Tool",
      heroTitle: "Kiem The becomes a layered system map instead of a feature checklist.",
      heroText:
        "Track how the game evolves from linear scaling into graph-driven, noise-heavy, adaptive optimization through one interactive interface.",
      heroPrimary: "Open system map",
      heroSecondary: "Jump to evolution timeline",
      ledgerLabel: "Core frame",
      ledgerTitle: "Linear → Multiplicative → RNG → Adaptive",
      ledgerItems: [
        "Sidebar-driven system architecture",
        "Graph view with weighted interactions",
        "Combat pipeline from build phase to HP",
        "Evolution timeline from Lv109 to KT69",
      ],
      sidebarTag: "System Menu",
      sidebarTitle: "Navigation by structure, not by wiki categories.",
      summaryLabel: "Selected lens",
      evolutionLabel: "Build philosophy",
      philosophyTitle: "A build is no longer a stack. It is a controlled ecosystem.",
      philosophyText:
        "The later the system evolves, the less value comes from single-stat growth and the more value comes from controlling interactions, precision, and noise.",
      impactLabel: "Impact",
      eraLabel: "Era",
      modeLabel: "Mode",
      systemTag: "System View",
      systemTitle: "Connected nodes show how one layer amplifies another.",
      systemCaption: "Weights represent how strongly a system shapes total combat power.",
      detailLabel: "System detail",
      detailEmpty: "Select a node to inspect role, interaction pattern, and dominant impact.",
      detailBullets: {
        category: "Category",
        weight: "Weight",
        interacts: "Interacts with",
      },
      combatTag: "Combat Engine",
      combatTitle: "The build phase feeds a strict resolution order in battle.",
      combatCaption: "This is where abstract system growth becomes a concrete win or loss outcome.",
      buildPhaseLabel: "Build phase",
      resolutionLabel: "Combat resolution",
      timelineTag: "Evolution Engine",
      timelineTitle: "Each era changes what optimization means.",
      timelineCaption: "Progression is not more of the same. Each breakpoint changes the system model.",
      optimizationTag: "Optimization Layer",
      optimizationTitle: "The expensive part is no longer acquisition. It is calibration.",
      signalTag: "Signal vs Noise",
      signalTitle: "KT59 onward: randomness dominates unless precision is engineered.",
      signalText:
        "Once noise-heavy systems accumulate, high-end building becomes a discipline of reducing variance, sequencing synergies, and adapting the configuration to match the battle context.",
      tabs: {
        system: "System View",
        combat: "Combat Flow",
        timeline: "Evolution Timeline",
      },
      menuTitles: {
        overview: "Overview",
        core: "Core Systems",
        evolution: "Evolution Engine",
        combat: "Combat Engine",
        optimization: "Optimization",
      },
      menuItems: {
        systemMap: "System Map",
        timeline: "Timeline",
        philosophy: "Build Philosophy",
        external: "External Systems",
        internal: "Internal Systems",
        meta: "Meta Systems",
        skill: "Skill Systems",
        rng: "RNG Systems",
        lv109: "Lv109",
        lv119: "Lv119",
        lv129: "Lv129",
        lv139: "Lv139",
        lv149: "Lv149",
        lv159: "Lv159",
        lv169: "Lv169",
        lv179: "Lv179",
        lv189: "Lv189",
        lv199: "Lv199",
        kt19: "KT19",
        kt29: "KT29",
        kt39: "KT39",
        kt49: "KT49",
        kt59: "KT59",
        kt69: "KT69",
        buildPhase: "Build Phase",
        combatFlow: "Combat Flow",
        precision: "Precision Optimization",
        noise: "Noise Control",
        adaptive: "Adaptive Strategy",
      },
      impactScale: ["Low", "Medium", "High", "Very High"],
      timelineImpact: "dominant shift",
    },
    vi: {
      heroEyebrow: "MMORPG / Công cụ trực quan hệ thống",
      heroTitle: "Kiếm Thế được nhìn như một system map nhiều tầng thay vì danh sách tính năng.",
      heroText:
        "Theo dõi cách game tiến hóa từ tăng trưởng tuyến tính sang tối ưu kiểu graph, nhiễu cao và thích nghi thông qua một giao diện duy nhất.",
      heroPrimary: "Mở system map",
      heroSecondary: "Tới timeline tiến hóa",
      ledgerLabel: "Khung lõi",
      ledgerTitle: "Tuyến tính → Nhân bội → RNG → Thích nghi",
      ledgerItems: [
        "Menu theo kiến trúc hệ thống",
        "Graph thể hiện tương tác có trọng số",
        "Combat pipeline từ build phase tới HP",
        "Timeline tiến hóa từ Lv109 đến KT69",
      ],
      sidebarTag: "Menu Hệ Thống",
      sidebarTitle: "Điều hướng theo cấu trúc, không phải theo kiểu wiki.",
      summaryLabel: "Góc nhìn đang chọn",
      evolutionLabel: "Triết lý build",
      philosophyTitle: "Một build không còn là chồng chỉ số. Nó là một hệ sinh thái có kiểm soát.",
      philosophyText:
        "Càng về late game, giá trị càng ít đến từ việc tăng một chỉ số đơn lẻ và càng nhiều đến từ việc kiểm soát tương tác, độ chính xác và nhiễu.",
      impactLabel: "Ảnh hưởng",
      eraLabel: "Giai đoạn",
      modeLabel: "Chế độ",
      systemTag: "Góc nhìn hệ thống",
      systemTitle: "Các node liên kết cho thấy một tầng khuếch đại tầng khác như thế nào.",
      systemCaption: "Trọng số thể hiện mức độ một hệ thống ảnh hưởng tới tổng lực chiến.",
      detailLabel: "Chi tiết hệ thống",
      detailEmpty: "Chọn một node để xem vai trò, mô hình tương tác và mức ảnh hưởng chính.",
      detailBullets: {
        category: "Nhóm",
        weight: "Trọng số",
        interacts: "Tương tác với",
      },
      combatTag: "Bộ máy chiến đấu",
      combatTitle: "Build phase đổ vào một thứ tự phân giải rất chặt trong giao tranh.",
      combatCaption: "Đây là nơi tăng trưởng hệ thống trừu tượng trở thành thắng thua cụ thể.",
      buildPhaseLabel: "Giai đoạn build",
      resolutionLabel: "Phân giải chiến đấu",
      timelineTag: "Động cơ tiến hóa",
      timelineTitle: "Mỗi era đều thay đổi ý nghĩa của việc tối ưu.",
      timelineCaption: "Tiến trình không phải chỉ là mạnh hơn. Mỗi cột mốc đổi luôn mô hình hệ thống.",
      optimizationTag: "Tầng tối ưu hóa",
      optimizationTitle: "Phần đắt giá nhất không còn là sở hữu. Mà là hiệu chỉnh.",
      signalTag: "Signal vs Noise",
      signalTitle: "Từ KT59 trở đi: ngẫu nhiên chi phối nếu precision không được thiết kế.",
      signalText:
        "Khi các hệ thống nhiễu cao chồng lên nhau, xây dựng cấp cao trở thành bài toán giảm phương sai, sắp xếp synergy và thích nghi cấu hình theo bối cảnh chiến đấu.",
      tabs: {
        system: "Góc nhìn hệ thống",
        combat: "Luồng chiến đấu",
        timeline: "Timeline tiến hóa",
      },
      menuTitles: {
        overview: "Tổng Quan",
        core: "Hệ Cốt Lõi",
        evolution: "Động Cơ Tiến Hóa",
        combat: "Bộ Máy Chiến Đấu",
        optimization: "Tối Ưu Hóa",
      },
      menuItems: {
        systemMap: "Bản đồ hệ thống",
        timeline: "Timeline",
        philosophy: "Triết lý build",
        external: "Ngoại hệ",
        internal: "Nội hệ",
        meta: "Meta systems",
        skill: "Hệ kỹ năng",
        rng: "Hệ RNG",
        lv109: "Lv109",
        lv119: "Lv119",
        lv129: "Lv129",
        lv139: "Lv139",
        lv149: "Lv149",
        lv159: "Lv159",
        lv169: "Lv169",
        lv179: "Lv179",
        lv189: "Lv189",
        lv199: "Lv199",
        kt19: "KT19",
        kt29: "KT29",
        kt39: "KT39",
        kt49: "KT49",
        kt59: "KT59",
        kt69: "KT69",
        buildPhase: "Giai đoạn build",
        combatFlow: "Luồng giao tranh",
        precision: "Tối ưu precision",
        noise: "Kiểm soát noise",
        adaptive: "Chiến lược thích nghi",
      },
      impactScale: ["Thấp", "Trung bình", "Cao", "Rất cao"],
      timelineImpact: "chuyển dịch chính",
    },
    es: {
      heroEyebrow: "MMORPG / Herramienta de Visualización de Sistemas",
      heroTitle: "Kiem The se convierte en un mapa de sistemas por capas en lugar de una lista.",
      heroText:
        "Sigue cómo evoluciona el juego desde el escalado lineal hasta la optimización adaptativa basada en grafos y control de varianza.",
      heroPrimary: "Abrir mapa del sistema",
      heroSecondary: "Ir a la línea de tiempo",
      ledgerLabel: "Marco central",
      ledgerTitle: "Lineal → Multiplicativo → RNG → Adaptativo",
      ledgerItems: [
        "Arquitectura guiada por menú lateral",
        "Vista de grafo con interacciones ponderadas",
        "Flujo de combate desde la fase de armado hasta el HP",
        "Línea de tiempo evolutiva de Lv109 a KT69",
      ],
      sidebarTag: "Menú del Sistema",
      sidebarTitle: "Navegación por estructura, no por categorías de wiki.",
      summaryLabel: "Enfoque seleccionado",
      evolutionLabel: "Filosofía de armado",
      philosophyTitle: "Un build ya no es una pila de estadísticas; es un ecosistema controlado.",
      philosophyText:
        "Cuanto más avanza el sistema, menos valor aporta subir un solo atributo y más importa controlar sinergias, precisión y ruido.",
      impactLabel: "Impacto",
      eraLabel: "Era",
      modeLabel: "Modo",
      systemTag: "Vista del Sistema",
      systemTitle: "Los nodos conectados muestran cómo una capa amplifica a otra.",
      systemCaption: "Los pesos representan cuánto influye cada sistema en el poder total de combate.",
      detailLabel: "Detalle del sistema",
      detailEmpty: "Selecciona un nodo para inspeccionar su rol, interacciones e impacto dominante.",
      detailBullets: {
        category: "Categoría",
        weight: "Peso",
        interacts: "Interactúa con",
      },
      combatTag: "Motor de Combate",
      combatTitle: "La fase de preparación alimenta un orden estricto de resolución en batalla.",
      combatCaption: "Aquí el crecimiento abstracto del sistema se convierte en victoria o derrota.",
      buildPhaseLabel: "Fase de preparación",
      resolutionLabel: "Resolución de combate",
      timelineTag: "Motor Evolutivo",
      timelineTitle: "Cada era cambia el significado de optimizar.",
      timelineCaption: "El progreso no es más de lo mismo; cada hito transforma el modelo del sistema.",
      optimizationTag: "Capa de Optimización",
      optimizationTitle: "Lo costoso ya no es adquirir, sino calibrar.",
      signalTag: "Señal vs. Ruido",
      signalTitle: "Desde KT59 en adelante: el azar domina salvo que diseñes precisión.",
      signalText:
        "Cuando se acumulan sistemas con alto RNG, optimizar consiste en reducir la varianza, sincronizar sinergias y adaptar la configuración al combate.",
      tabs: {
        system: "Vista del Sistema",
        combat: "Flujo de Combate",
        timeline: "Línea de Tiempo",
      },
      menuTitles: {
        overview: "Resumen",
        core: "Sistemas Centrales",
        evolution: "Motor Evolutivo",
        combat: "Motor de Combate",
        optimization: "Optimización",
      },
      menuItems: {
        systemMap: "Mapa del Sistema",
        timeline: "Línea de Tiempo",
        philosophy: "Filosofía de Build",
        external: "Sistemas Externos",
        internal: "Sistemas Internos",
        meta: "Sistemas Meta",
        skill: "Sistemas de Habilidad",
        rng: "Sistemas RNG",
        lv109: "Lv109",
        lv119: "Lv119",
        lv129: "Lv129",
        lv139: "Lv139",
        lv149: "Lv149",
        lv159: "Lv159",
        lv169: "Lv169",
        lv179: "Lv179",
        lv189: "Lv189",
        lv199: "Lv199",
        kt19: "KT19",
        kt29: "KT29",
        kt39: "KT39",
        kt49: "KT49",
        kt59: "KT59",
        kt69: "KT69",
        buildPhase: "Fase de Build",
        combatFlow: "Flujo de Combate",
        precision: "Optimización de Precisión",
        noise: "Control de Ruido",
        adaptive: "Estrategia Adaptativa",
      },
      impactScale: ["Bajo", "Medio", "Alto", "Muy Alto"],
      timelineImpact: "cambio dominante",
    },
  };

  const data = {
    menu: [
      {
        id: "overview",
        items: [
          { id: "systemMap", focus: "overview", tab: "system" },
          { id: "timeline", focus: "timeline", tab: "timeline" },
          { id: "philosophy", focus: "optimization", tab: "system" },
        ],
      },
      {
        id: "core",
        items: [
          { id: "external", focus: "external", tab: "system" },
          { id: "internal", focus: "internal", tab: "system" },
          { id: "meta", focus: "meta", tab: "system" },
          { id: "skill", focus: "skill", tab: "system" },
          { id: "rng", focus: "rng", tab: "system" },
        ],
      },
      {
        id: "evolution",
        items: [
          { id: "lv109", focus: "lv109", tab: "timeline" },
          { id: "lv119", focus: "lv119", tab: "timeline" },
          { id: "lv129", focus: "lv129", tab: "timeline" },
          { id: "lv139", focus: "lv139", tab: "timeline" },
          { id: "lv149", focus: "lv149", tab: "timeline" },
          { id: "lv159", focus: "lv159", tab: "timeline" },
          { id: "lv169", focus: "lv169", tab: "timeline" },
          { id: "lv179", focus: "lv179", tab: "timeline" },
          { id: "lv189", focus: "lv189", tab: "timeline" },
          { id: "lv199", focus: "lv199", tab: "timeline" },
          { id: "kt19", focus: "kt19", tab: "timeline" },
          { id: "kt29", focus: "kt29", tab: "timeline" },
          { id: "kt39", focus: "kt39", tab: "timeline" },
          { id: "kt49", focus: "kt49", tab: "timeline" },
          { id: "kt59", focus: "kt59", tab: "timeline" },
          { id: "kt69", focus: "kt69", tab: "timeline" },
        ],
      },
      {
        id: "combat",
        items: [
          { id: "buildPhase", focus: "combat-build", tab: "combat" },
          { id: "combatFlow", focus: "combat-flow", tab: "combat" },
        ],
      },
      {
        id: "optimization",
        items: [
          { id: "precision", focus: "precision", tab: "system" },
          { id: "noise", focus: "noise", tab: "timeline" },
          { id: "adaptive", focus: "adaptive", tab: "timeline" },
        ],
      },
    ],
    nodes: [
      {
        id: "overview",
        type: "overview",
        weight: 4,
        x: 48,
        y: 14,
        title: {
          en: "System Evolution Model",
          vi: "Mô hình tiến hóa hệ thống",
        },
        description: {
          en: "The whole game can be read as an evolution from simple stat growth into distributed, adaptive optimization.",
          vi: "Toàn bộ game có thể được đọc như một quá trình tiến hóa từ tăng chỉ số đơn giản sang tối ưu phân tán và thích nghi.",
        },
        bullets: {
          en: ["Linear to adaptive", "Acts as the root node", "Defines how every later layer is interpreted"],
          vi: ["Từ tuyến tính đến thích nghi", "Là node gốc", "Quy định cách đọc mọi tầng phía sau"],
        },
      },
      {
        id: "external",
        type: "external",
        weight: 3,
        x: 19,
        y: 33,
        title: {
          en: "External Systems",
          vi: "Ngoại hệ",
        },
        description: {
          en: "Equipment, enhancement, mount, and companion form the visible stat shell around the character.",
          vi: "Trang bị, cường hóa, thú cưỡi và đồng hành tạo nên lớp chỉ số bên ngoài nhìn thấy rõ nhất.",
        },
        bullets: {
          en: ["Equipment", "Enhancement", "Mount", "Companion"],
          vi: ["Trang bị", "Cường hóa", "Thú cưỡi", "Đồng hành"],
        },
      },
      {
        id: "internal",
        type: "internal",
        weight: 4,
        x: 48,
        y: 35,
        title: {
          en: "Internal Systems",
          vi: "Nội hệ",
        },
        description: {
          en: "Meridian graph and Chan Nguyen shift power from flat stacking into networked allocation and synergy planning.",
          vi: "Kinh mạch dạng graph và Chân nguyên đẩy sức mạnh từ cộng dồn phẳng sang phân bổ mạng lưới và lên kế hoạch synergy.",
        },
        bullets: {
          en: ["Meridian graph", "Chan Nguyen", "Internal routing", "Synergy-based scaling"],
          vi: ["Kinh mạch dạng graph", "Chân nguyên", "Điều phối nội lực", "Scale dựa trên synergy"],
        },
      },
      {
        id: "meta",
        type: "meta",
        weight: 3,
        x: 77,
        y: 33,
        title: {
          en: "Meta Systems",
          vi: "Meta systems",
        },
        description: {
          en: "Family, formation, and rank systems create distributed power that exceeds any single equipment lane.",
          vi: "Gia tộc, trận pháp và võ hàm tạo ra sức mạnh phân tán vượt ra ngoài từng nhánh trang bị riêng lẻ.",
        },
        bullets: {
          en: ["Family", "Formation", "Military rank", "Distributed buffs"],
          vi: ["Gia tộc", "Trận pháp", "Võ hàm", "Buff phân tán"],
        },
      },
      {
        id: "skill",
        type: "skill",
        weight: 3,
        x: 25,
        y: 62,
        title: {
          en: "Skill Systems",
          vi: "Hệ kỹ năng",
        },
        description: {
          en: "Character, Kiem Tong, mount, and companion skills inject behavior directly into the damage model.",
          vi: "Kỹ năng nhân vật, Kiếm Tông, thú cưỡi và đồng hành bơm hành vi trực tiếp vào mô hình sát thương.",
        },
        bullets: {
          en: ["Character skill", "Kiem Tong skill", "Mount skill", "Companion skill"],
          vi: ["Kỹ năng nhân vật", "Kỹ năng Kiếm Tông", "Kỹ năng thú cưỡi", "Kỹ năng đồng hành"],
        },
      },
      {
        id: "rng",
        type: "rng",
        weight: 4,
        x: 72,
        y: 61,
        title: {
          en: "RNG Systems",
          vi: "Hệ RNG",
        },
        description: {
          en: "Ngu Hanh An and roll variance turn the build into a noise-management problem instead of a pure stat race.",
          vi: "Ngũ hành ấn và sai lệch roll biến bài toán build thành bài toán quản trị nhiễu thay vì chỉ đua chỉ số.",
        },
        bullets: {
          en: ["Ngu Hanh An", "Roll variance", "Noise injection", "Outcome volatility"],
          vi: ["Ngũ hành ấn", "Sai lệch roll", "Bơm nhiễu", "Biến động kết quả"],
        },
      },
      {
        id: "precision",
        type: "optimization",
        weight: 3,
        x: 48,
        y: 84,
        title: {
          en: "Precision Optimization",
          vi: "Tối ưu precision",
        },
        description: {
          en: "Late-game optimization means minimizing waste, aligning thresholds, and extracting dependable output from unstable layers.",
          vi: "Tối ưu late game là giảm lãng phí, canh ngưỡng và rút ra đầu ra ổn định từ các tầng bất ổn.",
        },
        bullets: {
          en: ["Threshold alignment", "Variance reduction", "Reliable output"],
          vi: ["Canh ngưỡng", "Giảm phương sai", "Đầu ra đáng tin"],
        },
      },
    ],
    edges: [
      ["overview", "external"],
      ["overview", "internal"],
      ["overview", "meta"],
      ["external", "skill"],
      ["internal", "rng"],
      ["meta", "skill"],
      ["meta", "rng"],
      ["skill", "precision"],
      ["rng", "precision"],
      ["internal", "precision"],
    ],
    buildPhase: [
      {
        id: "stacking",
        title: { en: "Stacking", vi: "Stacking" },
        text: {
          en: "Collect base layers from external, internal, and meta systems.",
          vi: "Gom các tầng nền từ ngoại hệ, nội hệ và meta systems.",
        },
      },
      {
        id: "scaling",
        title: { en: "Scaling", vi: "Scaling" },
        text: {
          en: "Convert raw acquisition into multiplicative efficiency.",
          vi: "Biến sở hữu thô thành hiệu suất nhân bội.",
        },
      },
      {
        id: "rng-build",
        title: { en: "RNG", vi: "RNG" },
        text: {
          en: "Accept and route variance rather than pretending it does not exist.",
          vi: "Chấp nhận và điều hướng phương sai thay vì coi như nó không tồn tại.",
        },
      },
      {
        id: "injection",
        title: { en: "Skill Injection", vi: "Skill Injection" },
        text: {
          en: "Inject active and passive behavior into the final combat script.",
          vi: "Bơm hành vi chủ động và bị động vào kịch bản chiến đấu cuối cùng.",
        },
      },
    ],
    combatSteps: [
      { id: "hit", en: "Hit", vi: "Đánh trúng" },
      { id: "dodge", en: "Dodge", vi: "Né tránh" },
      { id: "immunity", en: "Immunity", vi: "Miễn nhiễm" },
      { id: "resistance", en: "Resistance", vi: "Kháng tính" },
      { id: "crit", en: "Crit", vi: "Bạo kích" },
      { id: "defense", en: "Defense", vi: "Phòng ngự" },
      { id: "shield", en: "Shield", vi: "Lá chắn" },
      { id: "hp", en: "HP", vi: "Sinh lực" },
    ],
    timeline: [
      { id: "lv109", era: "Lv109", shift: { en: "Layer expansion", vi: "Mở rộng tầng hệ thống" }, impact: 2 },
      { id: "lv119", era: "Lv119", shift: { en: "RNG enters the stack", vi: "RNG bước vào stack" }, impact: 3 },
      { id: "lv129", era: "Lv129", shift: { en: "Multiplicative scaling", vi: "Scale nhân bội" }, impact: 3 },
      { id: "lv139", era: "Lv139", shift: { en: "Skill injection", vi: "Bơm kỹ năng vào hệ" }, impact: 3 },
      { id: "lv149", era: "Lv149", shift: { en: "Saturation begins", vi: "Bắt đầu bão hòa" }, impact: 2 },
      { id: "lv159", era: "Lv159", shift: { en: "Entropy rises", vi: "Entropy tăng" }, impact: 3 },
      { id: "lv169", era: "Lv169", shift: { en: "Meta-system emerges", vi: "Meta-system xuất hiện rõ" }, impact: 3 },
      { id: "lv179", era: "Lv179", shift: { en: "Optimization pressure", vi: "Áp lực tối ưu hóa" }, impact: 3 },
      { id: "lv189", era: "Lv189", shift: { en: "Locked-system behavior", vi: "Hệ khóa dần" }, impact: 2 },
      { id: "lv199", era: "Lv199", shift: { en: "Internal graph", vi: "Nội hệ dạng graph" }, impact: 4 },
      { id: "kt19", era: "KT19", shift: { en: "Cycle", vi: "Chu kỳ" }, impact: 3 },
      { id: "kt29", era: "KT29", shift: { en: "Multi-cycle", vi: "Đa chu kỳ" }, impact: 3 },
      { id: "kt39", era: "KT39", shift: { en: "Convergence", vi: "Hội tụ" }, impact: 3 },
      { id: "kt49", era: "KT49", shift: { en: "Stability", vi: "Ổn định" }, impact: 2 },
      { id: "kt59", era: "KT59", shift: { en: "Noise-dominant", vi: "Nhiễu chi phối" }, impact: 4 },
      { id: "kt69", era: "KT69", shift: { en: "Adaptive system", vi: "Hệ thích nghi" }, impact: 4 },
    ],
    optimization: [
      {
        id: "precision",
        title: { en: "Precision optimization", vi: "Tối ưu precision" },
        text: {
          en: "Find the exact thresholds where one more adjustment changes real combat outcomes.",
          vi: "Tìm đúng ngưỡng mà một chỉnh sửa nhỏ tạo ra khác biệt thật trong giao tranh.",
        },
      },
      {
        id: "noise",
        title: { en: "Noise control", vi: "Kiểm soát noise" },
        text: {
          en: "Reduce outcome volatility so the build expresses its intended strength consistently.",
          vi: "Giảm biến động kết quả để build thể hiện sức mạnh dự kiến một cách ổn định hơn.",
        },
      },
      {
        id: "configuration",
        title: { en: "Build configuration", vi: "Cấu hình build" },
        text: {
          en: "Arrange systems as a package rather than maximizing each lane in isolation.",
          vi: "Sắp xếp các hệ như một gói tổng thể thay vì đẩy từng lane riêng lẻ lên tối đa.",
        },
      },
      {
        id: "adaptive",
        title: { en: "Adaptive strategy", vi: "Chiến lược thích nghi" },
        text: {
          en: "Switch emphasis depending on matchup, combat context, and uncertainty budget.",
          vi: "Đổi trọng tâm theo kèo đấu, bối cảnh giao tranh và ngân sách bất định cho phép.",
        },
      },
    ],
  };

  const focusMap = {
    overview: {
      nodeId: "overview",
      era: "Lv109 → KT69",
      tab: "system",
      title: { en: "Overview", vi: "Tổng quan" },
      description: {
        en: "This lens treats Kiem The as one evolving machine: each new era adds complexity, interdependence, and variance.",
        vi: "Góc nhìn này xem Kiếm Thế như một cỗ máy tiến hóa: mỗi era mới đều tăng độ phức tạp, liên đới và phương sai.",
      },
    },
    timeline: {
      nodeId: "overview",
      era: "Lv109 → KT69",
      tab: "timeline",
      title: { en: "Evolution Timeline", vi: "Timeline tiến hóa" },
      description: {
        en: "The strongest builds come from understanding which system logic dominates at each breakpoint.",
        vi: "Những build mạnh nhất đến từ việc hiểu logic hệ thống nào chi phối ở từng điểm gãy.",
      },
    },
    optimization: {
      nodeId: "precision",
      era: "KT39 → KT69",
      tab: "system",
      title: { en: "Build Philosophy", vi: "Triết lý build" },
      description: {
        en: "Endgame value comes from orchestrating a stable package under unstable conditions.",
        vi: "Giá trị endgame đến từ việc điều phối một gói build ổn định trong điều kiện bất ổn.",
      },
    },
    external: { nodeId: "external", era: "Lv109 → Lv149", tab: "system" },
    internal: { nodeId: "internal", era: "Lv199 → KT69", tab: "system" },
    meta: { nodeId: "meta", era: "Lv169 → KT49", tab: "system" },
    skill: { nodeId: "skill", era: "Lv139 → KT39", tab: "system" },
    rng: { nodeId: "rng", era: "Lv119 → KT69", tab: "system" },
    precision: { nodeId: "precision", era: "KT39 → KT69", tab: "system" },
    noise: { nodeId: "rng", era: "KT59 → KT69", tab: "timeline" },
    adaptive: { nodeId: "precision", era: "KT69", tab: "timeline" },
    "combat-build": { nodeId: "external", era: "All combat eras", tab: "combat" },
    "combat-flow": { nodeId: "skill", era: "All combat eras", tab: "combat" },
  };

  data.timeline.forEach((entry) => {
    focusMap[entry.id] = {
      nodeId:
        entry.id === "lv199"
          ? "internal"
          : entry.id === "kt59"
            ? "rng"
            : entry.id === "kt69"
              ? "precision"
              : "overview",
      era: entry.era,
      tab: "timeline",
      title: { en: entry.era, vi: entry.era },
      description: {
        en: entry.shift.en,
        vi: entry.shift.vi,
      },
    };
  });

  const state = {
    locale: document.documentElement.lang === "vi" ? "vi" : "en",
    activeTab: "system",
    activeFocus: "overview",
    activeNodeId: "overview",
  };

  const getCopy = () => copy[state.locale] || copy.en;
  const getText = (value) => value?.[state.locale] || value?.en || "";
  const getNode = (id) => data.nodes.find((node) => node.id === id) || data.nodes[0];
  const impactText = (weight) => getCopy().impactScale[Math.max(0, Math.min(weight - 1, 3))];

  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) {
      node.textContent = value;
    }
  };

  const applyStaticCopy = () => {
    const localeCopy = getCopy();
    setText("#kt-hero-eyebrow", localeCopy.heroEyebrow);
    setText("#kt-hero-title", localeCopy.heroTitle);
    setText("#kt-hero-text", localeCopy.heroText);
    setText("#kt-open-map", localeCopy.heroPrimary);
    setText("#kt-open-timeline", localeCopy.heroSecondary);
    setText("#kt-ledger-label", localeCopy.ledgerLabel);
    setText("#kt-ledger-title", localeCopy.ledgerTitle);
    document.querySelectorAll("#kt-ledger-list li").forEach((item, index) => {
      item.textContent = localeCopy.ledgerItems[index] || "";
    });
    setText("#kt-sidebar-tag", localeCopy.sidebarTag);
    setText("#kt-sidebar-title", localeCopy.sidebarTitle);
    setText("#kt-summary-label", localeCopy.summaryLabel);
    setText("#kt-evolution-label", localeCopy.evolutionLabel);
    setText("#kt-philosophy-title", localeCopy.philosophyTitle);
    setText("#kt-philosophy-text", localeCopy.philosophyText);
    setText("#kt-metric-impact-label", localeCopy.impactLabel);
    setText("#kt-metric-stage-label", localeCopy.eraLabel);
    setText("#kt-metric-mode-label", localeCopy.modeLabel);
    setText("#kt-system-tag", localeCopy.systemTag);
    setText("#kt-system-title", localeCopy.systemTitle);
    setText("#kt-system-caption", localeCopy.systemCaption);
    setText("#kt-detail-label", localeCopy.detailLabel);
    setText("#kt-combat-tag", localeCopy.combatTag);
    setText("#kt-combat-title", localeCopy.combatTitle);
    setText("#kt-combat-caption", localeCopy.combatCaption);
    setText("#kt-build-phase-label", localeCopy.buildPhaseLabel);
    setText("#kt-resolution-label", localeCopy.resolutionLabel);
    setText("#kt-timeline-tag", localeCopy.timelineTag);
    setText("#kt-timeline-title", localeCopy.timelineTitle);
    setText("#kt-timeline-caption", localeCopy.timelineCaption);
    setText("#kt-opt-tag", localeCopy.optimizationTag);
    setText("#kt-opt-title", localeCopy.optimizationTitle);
    setText("#kt-signal-tag", localeCopy.signalTag);
    setText("#kt-signal-title", localeCopy.signalTitle);
    setText("#kt-signal-text", localeCopy.signalText);

    document.querySelectorAll(".kt-tab").forEach((button) => {
      const tab = button.dataset.tab;
      button.textContent = localeCopy.tabs[tab] || button.textContent;
    });
  };

  const renderSidebar = () => {
    const localeCopy = getCopy();
    sidebarGroups.innerHTML = "";

    data.menu.forEach((group, groupIndex) => {
      const wrapper = document.createElement("details");
      wrapper.className = "kt-sidebar-group";
      wrapper.open = groupIndex < 2;

      const summary = document.createElement("summary");
      summary.textContent = localeCopy.menuTitles[group.id];

      const list = document.createElement("div");
      list.className = "kt-sidebar-items";

      group.items.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `kt-sidebar-item${state.activeFocus === item.focus ? " is-active" : ""}`;
        button.dataset.focus = item.focus;
        button.dataset.tab = item.tab;
        button.textContent = localeCopy.menuItems[item.id];
        button.addEventListener("click", () => setFocus(item.focus, item.tab));
        list.appendChild(button);
      });

      wrapper.append(summary, list);
      sidebarGroups.appendChild(wrapper);
    });
  };

  const renderGraph = () => {
    graphNodes.innerHTML = "";
    graphLines.innerHTML = "";
    graphLines.setAttribute("viewBox", "0 0 100 100");
    const activeNode = getNode(state.activeNodeId);

    data.edges.forEach(([from, to]) => {
      const source = getNode(from);
      const target = getNode(to);
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      const highlighted = from === activeNode.id || to === activeNode.id;
      line.setAttribute("x1", String(source.x));
      line.setAttribute("y1", String(source.y));
      line.setAttribute("x2", String(target.x));
      line.setAttribute("y2", String(target.y));
      line.setAttribute("class", highlighted ? "is-highlighted" : "");
      graphLines.appendChild(line);
    });

    data.nodes.forEach((node) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `kt-graph-node kt-node-${node.type}${node.id === activeNode.id ? " is-active" : ""}`;
      button.style.left = `${node.x}%`;
      button.style.top = `${node.y}%`;
      button.innerHTML = `
        <strong>${getText(node.title)}</strong>
        <span>${impactText(node.weight)}</span>
      `;
      button.addEventListener("click", () => {
        state.activeNodeId = node.id;
        renderGraph();
        renderDetail();
        renderSummary();
      });
      graphNodes.appendChild(button);
    });
  };

  const renderDetail = () => {
    const localeCopy = getCopy();
    const node = getNode(state.activeNodeId);
    setText("#kt-detail-title", getText(node.title));
    setText("#kt-detail-description", getText(node.description) || localeCopy.detailEmpty);
    detailList.innerHTML = "";

    const interactions = data.edges
      .filter(([from, to]) => from === node.id || to === node.id)
      .map(([from, to]) => (from === node.id ? getText(getNode(to).title) : getText(getNode(from).title)));

    [
      `${localeCopy.detailBullets.category}: ${node.type}`,
      `${localeCopy.detailBullets.weight}: ${impactText(node.weight)} (${node.weight}/4)`,
      `${localeCopy.detailBullets.interacts}: ${interactions.join(", ")}`,
      ...((node.bullets?.[state.locale] || node.bullets?.en || []).map((item) => item)),
    ].forEach((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      detailList.appendChild(item);
    });
  };

  const renderTimeline = () => {
    const localeCopy = getCopy();
    timelineGrid.innerHTML = "";

    data.timeline.forEach((entry) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = `kt-timeline-card${state.activeFocus === entry.id ? " is-active" : ""}`;
      card.addEventListener("click", () => setFocus(entry.id, "timeline"));
      card.innerHTML = `
        <span class="kt-timeline-era">${entry.era}</span>
        <strong>${getText(entry.shift)}</strong>
        <span>${localeCopy.timelineImpact}: ${impactText(entry.impact)}</span>
      `;
      timelineGrid.appendChild(card);
    });
  };

  const renderCombat = () => {
    buildPhaseList.innerHTML = "";
    combatFlow.innerHTML = "";

    data.buildPhase.forEach((entry) => {
      const item = document.createElement("article");
      item.className = "kt-phase-step";
      item.innerHTML = `
        <strong>${getText(entry.title)}</strong>
        <p>${getText(entry.text)}</p>
      `;
      buildPhaseList.appendChild(item);
    });

    data.combatSteps.forEach((entry, index) => {
      const item = document.createElement("div");
      item.className = `kt-combat-step${state.activeFocus === "combat-flow" ? " is-active" : ""}`;
      item.innerHTML = `
        <strong>${state.locale === "vi" ? entry.vi : entry.en}</strong>
        <span>${String(index + 1).padStart(2, "0")}</span>
      `;
      combatFlow.appendChild(item);
    });
  };

  const renderOptimization = () => {
    optimizationList.innerHTML = "";
    data.optimization.forEach((entry) => {
      const article = document.createElement("article");
      article.className = "kt-optimization-item";
      article.innerHTML = `
        <strong>${getText(entry.title)}</strong>
        <p>${getText(entry.text)}</p>
      `;
      optimizationList.appendChild(article);
    });
  };

  const renderSummary = () => {
    const localeCopy = getCopy();
    const focus = focusMap[state.activeFocus] || focusMap.overview;
    const node = getNode(state.activeNodeId);
    const activeTabButton = document.querySelector(`.kt-tab[data-tab="${state.activeTab}"]`);
    setText("#kt-focus-title", getText(focus.title || node.title));
    setText("#kt-focus-description", getText(focus.description || node.description));
    setText("#kt-impact-value", impactText(node.weight));
    setText("#kt-era-value", focus.era || "Lv109 → KT69");
    setText("#kt-mode-value", activeTabButton?.textContent || localeCopy.tabs.system);
  };

  const syncTabs = () => {
    document.querySelectorAll(".kt-tab").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.tab === state.activeTab);
    });
    document.querySelectorAll(".kt-panel").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === state.activeTab);
    });
  };

  const setTab = (tab) => {
    state.activeTab = tab;
    syncTabs();
    renderSummary();
  };

  const setFocus = (focusId, tabOverride) => {
    const focus = focusMap[focusId] || focusMap.overview;
    state.activeFocus = focusId;
    state.activeNodeId = focus.nodeId || "overview";
    renderSidebar();
    renderGraph();
    renderDetail();
    renderTimeline();
    renderCombat();
    setTab(tabOverride || focus.tab || "system");
  };

  tabsRoot.addEventListener("click", (event) => {
    const button = event.target.closest(".kt-tab");
    if (!button) {
      return;
    }
    setTab(button.dataset.tab);
  });

  const renderAll = () => {
    state.locale = ["vi", "es"].includes(document.documentElement.lang)
      ? document.documentElement.lang
      : "en";
    applyStaticCopy();
    renderSidebar();
    renderGraph();
    renderDetail();
    renderTimeline();
    renderCombat();
    renderOptimization();
    syncTabs();
    renderSummary();
  };

  renderAll();
  new MutationObserver(() => {
    const nextLocale = ["vi", "es"].includes(document.documentElement.lang)
      ? document.documentElement.lang
      : "en";
    if (nextLocale !== state.locale) {
      renderAll();
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
