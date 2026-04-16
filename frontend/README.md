# Frontend Skills

This directory contains a set of AI skills to enhance and assist in developing frontend applications. They cover the full development lifecycle — from converting designs into code, selecting and wiring UI components, building and applying design systems, to generating complete CRUD interfaces — enabling faster, more consistent, and accessible frontend development.

---

## Skills

### 1. Chameleon Controls Library

**What it is:** A reference skill for building UIs with 58 Chameleon web components (`ch-*` elements) across 11 categories (layout, forms, data display, overlays, grids, editors, chat, and more).

**What is for:** Enables framework-agnostic (Angular, React, Stencil, vanilla JS/TS) enterprise UI development with built-in guidance on accessibility, performance, and SEO best practices.

**Usage:** Ask the AI to build or modify a UI using Chameleon components. Provide a description, Figma design, or screenshot of the desired UI, and specify your framework (Angular, React, Stencil, or vanilla JS/TS).

---

### 2. Design System Builder

**What it is:** A skill for scaffolding and evolving enterprise CSS Design Systems on top of Chameleon using the ITCSS layered pattern (Tokens → Foundations → Resets → Base → Scope → Overrides → Utilities → Components).

**What is for:** Produces consistent, multi-brand, dark/light themed design systems with pure CSS — no runtime JS. Generates living documentation, showcase apps, and inner skills for consumption.

**Usage:** Ask the AI to create a design system by providing your brand requirements — name, colors, typography, spacing, number of brands, and whether you need dark mode. The skill will scaffold, build, and document the DS for you.

**Depends on:** `chameleon-controls-library`

---

### 3. Mercury Design System

**What it is:** A pre-built, ready-to-use enterprise design system from Globant providing 39 CSS bundles, design tokens, and 500+ icons for styling Chameleon components.

**What is for:** Immediately usable professional styling with two theme variants (Mercury/blue and Globant/green), automatic dark/light mode, and pre-tested WCAG AA accessibility — no DS creation needed.

**Usage:** Ask the AI to style your Chameleon-based UI with Mercury. Provide a Figma design or describe the desired look, and specify the theme variant (Mercury/blue or Globant/green). The skill handles bundle loading, token mapping, and icon selection.

**Depends on:** `chameleon-controls-library`

---

### 4. UI Creator

**What it is:** A skill for converting UI screenshots and/or OpenAPI specs into complete web application components with routing, services, and mock servers.

**What is for:** Rapid UI implementation from design images — extracts design tokens, generates semantic specs, creates mock servers, and validates output via screenshot comparison. Supports Angular and React (Vite).

**Usage:** Provide UI screenshot images and/or an OpenAPI spec, and specify the target framework (Angular or React). The skill will generate the frontend application — app shell, routing, services connected to the backend defined by the OpenAPI spec, and page components — and validate the result visually.
