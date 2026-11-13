# Workspace Coding & Architecture Ruleset

This ruleset defines the engineering standards, workflow, and safety boundaries for this project. All agents and contributors must follow these rules.

---

## 1. Workflow: Hypothesis First, Sample & Review

1. **State the Hypothesis First**:
   - Before writing or modifying code, formulate a clear hypothesis explaining *what* needs to change, *why*, and the expected outcome.
2. **Inspect Samples Before Coding**:
   - Check existing files, components, and patterns in the repository as reference samples before proposing new implementations.
3. **Review Before & After**:
   - Review existing code for reusable hooks, styles, or helpers prior to editing, and verify changes against edge cases and existing page behaviors afterward.

---

## 2. Syntax Reuse & Optimization First

1. **Reuse & Optimize Existing Syntax First**:
   - Always prioritize reusing existing CSS custom properties, utility classes, DOM structures, and JavaScript helper functions before creating new ones.
   - Optimize verbose or repetitive syntax into concise, data-driven, and declarative patterns.
2. **DRY (Don't Repeat Yourself)**:
   - Consolidate shared logic, event listeners, and localization keys (`locales/en/`, `locales/vi/`) instead of duplicating code across pages.

---

## 3. File Size Limit (< 200 Lines Recommended)

1. **Keep Code Files Under 200 Lines**:
   - New code files and refactored modules should remain **under 200 lines**.
2. **Modular Decomposition**:
   - When a file approaches or exceeds 200 lines, split it by feature, domain, or layer (e.g., separate data definitions, state/logic, and DOM rendering into dedicated modules).

---

## 4. Clean Architecture & Clean Code

1. **Separation of Concerns**:
   - **Data & Content**: Keep static data, configurations, and translations in structured data/JSON files (`locales/`) or dedicated data modules.
   - **Presentation**: Keep semantic structure in HTML and visual styling in CSS (`styles.css` or scoped stylesheets) using shared design tokens.
   - **Behavior & State**: Keep state transitions and pure calculation logic decoupled from direct DOM manipulation where possible.
2. **Single Responsibility (SRP)**:
   - Every file, function, and UI component should have a single, well-defined responsibility.
   - Keep functions small, pure where possible, and flat using guard clauses / early returns instead of deep nesting.
3. **Intent-Revealing Naming & Zero Dead Code**:
   - Use clear, descriptive identifiers for variables, functions, and CSS classes.
   - Remove unused code, redundant selectors, and commented-out blocks immediately.

---

## 5. Repository & Remote Safety Policy

1. **Do Not Touch Public Repositories Without Asking**:
   - **Never** push to, pull from, or modify any public/remote repository (`git push`, remote branch creation, PR operations, or external publishing) without explicitly asking the user first.
   - Normally, public repository operations are not needed—keep all work strictly local unless explicitly instructed otherwise.
