---
name: ui-creator
description: Converts UI images and/or OpenAPI specs into web application components with routing and service integration. Supports Angular and React (Vite). When UI images are provided, generates visual components using an integrated image-to-component procedure with screenshot validation. When only an OpenAPI spec is provided (no images), generates all pages directly using neutral default tokens. Supports any combination of images and OpenAPI spec.
metadata:
  version: "0.1.0"
---

# Converting UI to Web Application

## Inputs

1. **UI images** (optional) — image files (PNG, JPG, etc.) of UI screens. When provided, design tokens and style reference are derived from images. When absent, default tokens are used
2. **Project path** (required)
3. **OpenAPI spec** (optional) — YAML/JSON for API service generation. Endpoints that don't map to any image become inferred pages

At least one of UI images or OpenAPI spec must be provided

## Workflow

### Step 1: Determine target platform

Detect from the project or ask the user:
- **Angular project?** → Read [platform-angular.md](references/platform-angular.md)
- **React project?** → Read [platform-react.md](references/platform-react.md)

### Step 2: Inspect project

Follow the platform file for scaffolding and project inspection commands

Ensure `playwright` and `tsx` are available:
```bash
test -d node_modules/playwright && test -d node_modules/tsx || npm install playwright tsx
npx playwright install chromium
```

### Step 3: Analyze inputs and infer pages

1. **Check for instructions**: Look for any `.md` file (e.g. `instrucciones.md`) in the source directory. If found, read it and use it for:
	- **Business logic**: service call triggers, navigation targets, data refresh behaviors
	- **Visual preferences** (if mentioned): colors, theme (dark/light), typography, accent color, layout style — apply these over the default tokens when no images are provided

2. **If images are provided:**
	- View all images with vision capabilities
	- Identify image-based pages and routes from filenames or content
	- Identify shared layout: compare images to find common elements (header, footer, sidebar, nav) → app shell
	- Extract design tokens: follow [design-tokens-guide.md](references/design-tokens-guide.md) to derive CSS custom properties from the first/main image

3. **If NO images are provided (OpenAPI-only mode):**
	- Start with default design tokens from [design-tokens-guide.md](references/design-tokens-guide.md) (see "Default tokens" section), then override with any visual preferences found in the instructions `.md`
	- Infer app shell layout from the OpenAPI structure (e.g. sidebar nav with links to each page)
	- Skip Phase A entirely in Step 6 — all pages are generated directly

4. **Infer pages from OpenAPI** (if provided): Read the OpenAPI spec and identify endpoints that don't map to any image. For each unmapped endpoint, infer a page type:
	- `GET` returning an array → **list page** (table or card grid)
	- `GET` with path parameter returning an object → **detail page**
	- `POST`/`PUT` accepting a request body → **form page** (create or edit)
	- `DELETE`, `PATCH` → not standalone pages, they are actions within other pages

	Skip endpoints that are clearly sub-resources or actions of an already-mapped page. Name inferred routes from the endpoint path (e.g. `/rest/orders` → route `/orders`, component `orders`)

### Step 4: Verify page map

List what was found. Image-based pages are always generated. If there are inferred pages from OpenAPI, present them to the user and ask which ones to include using AskUserQuestion (multiSelect: true). If no inferred pages exist, proceed immediately

```
Pages from images (always generated):
- home/      → route: /home (image: home.png) — hero banner, product grid
- login/     → route: /login (image: login.png) — login form

Pages inferred from OpenAPI (no image):
- orders/    → route: /orders — list page (GET /rest/orders → array)
- order-detail/ → route: /orders/:id — detail page (GET /rest/orders/{id} → object)
```

After the user confirms, proceed to Step 5 with only the selected inferred pages

### Step 5: Generate shared infrastructure

Follow the platform file to generate:

1. **Global styles** — `:root` tokens in the platform's global stylesheet
2. **App shell / layout** — shared header, footer, nav, sidebar + content outlet
3. **Route configuration** — one route per page
4. **Models / interfaces** — typed data structures (if OpenAPI provided)
5. **Environment configuration** — API URL (if OpenAPI provided)
6. **Services** — API service layer (if OpenAPI provided)
7. **Mock server** — see [mock-server-template.md](references/mock-server-template.md) (if OpenAPI provided)
8. **Component shells** — for each page (both image-based and inferred), create the component/controller/view file that wires up services and data bindings. For image-based pages, the template and styles are generated via the image-to-component procedure. For inferred pages, the orchestrator generates them directly in Step 6

Read OpenAPI spec if provided — identify endpoints, parameters, and response shapes

If business instructions were found, use them to determine route parameters, service call triggers, and cross-component interactions (e.g., refreshing a header counter after a cart update)

### Step 5.1: Verify mock image URLs (MANDATORY)

After writing `mock-server.ts`, verify **every** image URL in the mock data with a HEAD request:

```bash
curl -s -o /dev/null -w "%{http_code}" "<url>"
```

Any URL that does NOT return `200` must be replaced with a placehold.co fallback:

```
https://placehold.co/<w>x<h>/E8F5E9/333?text=<name>
```

Where `<w>x<h>` matches the original dimensions and `<name>` is the item name

**Do NOT proceed to Step 6 until all image URLs return 200**

### Step 6: Generate all page components

If OpenAPI services were generated, start the mock server first (`npx tsx mock-server.ts`), then start the dev server in background on an available port. If port 4200 is in use, try 4201, 4202, etc. (e.g. `ng serve --port 4201`, `npm run dev -- --port 5174`). Use the actual assigned port in all URLs used during screenshot capture

Check if the project already has generated components with templates and styles. If so, review them and build an initial **style reference** from their existing patterns and tokens. Otherwise, initialize an empty style reference document. This is a living document that grows with each page

#### Phase A: Image-based pages (skip if no images)

For each page that has an image, in order from most visually complex to simplest:

1. **Follow** the [image-to-component.md](references/image-to-component.md) procedure passing: image path, platform, project path, component path, dev server URL, component context, layout exclusions, and the current style reference (empty for the first page)

2. **Learn**: After the procedure completes, review the generated template and styles. Append to the style reference:
	- New component patterns found (button variants, card layouts, form styles, badge styles)
	- Any raw CSS values that should become tokens — add them to the global stylesheet immediately

3. **Continue** to the next image-based page. Do NOT pause, ask for confirmation, or return control to the user

The style reference accumulates across pages, so later pages benefit from all prior learnings. Process ALL image-based pages in a single uninterrupted loop

After all image-based pages are processed, list which pages were generated via the image-to-component procedure. If any image-based page is missing, invoke the skill for it before continuing

**CRITICAL: Do NOT stop here. Do NOT return control to the user. Immediately proceed to Phase B below in the same response**

#### Phase B: Inferred pages (from OpenAPI, no image)

For each inferred page, generate the template and styles **directly** — the image-to-component procedure requires an image. Use the design tokens and any accumulated style reference from Phase A (or the default tokens if no images were provided) to ensure visual consistency

For each inferred page:

1. **Determine page layout** from the inferred type:
	- **List page**: card grid or table layout. Bind to the service's list endpoint
	- **Detail page**: structured layout showing all fields from the response schema
	- **Form page**: form layout with labeled inputs for each field in the request body schema

2. **Generate template and styles** following the platform file patterns, reusing CSS tokens. The generated component must look cohesive with the rest of the app

3. **Capture a screenshot** of the generated page via the dev server and visually verify consistency. Fix any obvious inconsistencies (wrong spacing, missing tokens, mismatched patterns)

Process ALL inferred pages in a single uninterrupted loop. **Do NOT stop or return control to the user — immediately continue to Step 7**

### Step 7: API integration (if OpenAPI provided)

Follow the platform file for implementation patterns. All platforms must implement:

1. Typed models/interfaces matching API response shapes
2. Service layer that always makes HTTP calls — no mock conditionals. Services fetch from the relative API URL (e.g. `/rest/items`) which the dev proxy routes to either the mock server or a real backend
3. Mock server (`mock-server.ts`) — see [mock-server-template.md](references/mock-server-template.md). Mock data uses real public image URLs (Unsplash preferred for thematic accuracy). For repeated grids/lists, limit mock data to **6–8 representative items**. After generating the mock server, verify all image URLs with HEAD requests and replace any 404 with working alternatives. Use `https://placehold.co/<w>x<h>/E8F5E9/333?text=<name>` as last resort
4. Mock server must simulate business logic (e.g., add/remove items, update quantities, toggle states) by mutating in-memory data — not just return static data. **Components must always update their local state with the service response** — never fire-and-forget a service call that changes UI state
5. **Mock data fidelity**: Mock responses must use the exact same codes, enums, and string formats that the real backend returns — never translate codes to human-readable display text. If business instructions or the OpenAPI spec specify exact values for a field, use those values verbatim in mock responses
6. Dev script using `concurrently` to start both mock server and app dev server with a single command
7. Image fallback via CSS: wrap `<img>` elements in containers with `background: var(--color-bg-secondary)` so that when images fail to load, the background color shows through. Do NOT use JS `onerror` handlers or placeholder image files
8. **Service layer as adapter**: The service layer must adapt between the API response shape (defined by the OpenAPI spec) and the flat data structure that templates consume. If the schema shows nested objects, the service must extract the nested sub-object and return it flat. Also normalize field names across endpoints — map variant names for the same concept to a single canonical name

**GeneXus backend?** → Read [genexus-backend.md](references/genexus-backend.md) for additional requirements (gxid, GX_CLIENT_ID cookie, endpoint call order, proxy Accept header)

### Step 8: Build verification

Run the platform's build command to verify no compilation errors:
- Angular: `ng build`
- React (Vite): `npm run build`

## Critical rules

**Component generation**: For pages with images, NEVER write component templates/styles directly — ALWAYS follow the [image-to-component.md](references/image-to-component.md) procedure. For inferred pages (no image), generate templates and styles directly using the design tokens and any accumulated style reference. All pages must be screenshot-verified for visual consistency

**Paths**: Always use forward slashes (`/`) in bash commands

**Dev server**: The dev server must be running before running the image-to-component procedure

**Check before creating**: Verify component/view doesn't already exist. Update if it does

**Asset references**: Every static asset referenced in templates or code (icons, etc.) must exist as a real file. Create the file in the same step where you write the reference — never point to a path that doesn't exist yet. Do NOT create placeholder image files — use CSS background fallback instead (see Step 7, item 7)

**File discipline**:
- Write each file once with all imports referencing real files
- Don't install packages unless asked

**Uninterrupted execution**: Process all pages from start to finish without pausing for user confirmation. User interaction points are Step 1 (platform selection, if not auto-detected) and Step 4 (inferred page selection, if OpenAPI provided). After Step 4, run Steps 5–8 autonomously

## Output

1. One-sentence summary of what was created
2. List of files created/modified
3. **Running app URL**: Do NOT stop the dev server after Step 8. Tell the user the URL where the app is running so they can test it immediately (e.g. "App running at http://localhost:5173 — open it in your browser to test.")
4. **Mock data notice** (only when a mock server was generated): Inform the user that the app is running with mock data by default. To connect to a real backend, they can either change the proxy target themselves in `proxy.conf.js` (Angular) or `vite.config.ts` (React), or ask you to switch it for them
