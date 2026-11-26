# CLAUDE.md: getenv.in

Technical notes for this repo. For product direction read `PRODUCT.md`, and for the visual and UX rules read `DESIGN.md`.
(The parent folder's `CLAUDE.md` describes a "WAT" layout with `tools/` and `workflows/`. This repo has neither.)

## Tech stack

- **Static site, vanilla JS, no build system.** There is no `package.json`, no bundler, no framework, no TypeScript and no npm dependencies.
- Plain `<script>` tags (not ES modules). Every file shares one global scope, so a duplicate top-level `let`/`const` in two files stops the second file from running.
- Plain CSS. Tailwind is **not** used.
- External resources in `index.html`: Google Fonts (Space Grotesk, IBM Plex Sans, JetBrains Mono), Mermaid 10.5.0 (jsDelivr), Google Analytics and AdSense. The CSP in `vercel.json` blocks the last three (see Fragile).
- Node.js (only built-ins) runs the dev scripts and the page/data generators.
- Hosted on Vercel. `vercel.json` has the security headers and an SPA rewrite to `/index.html`. `.vercelignore` keeps `scripts/` and the internal `.md` docs off the site.

## Files

| File | What it does |
|---|---|
| `index.html` | The whole SPA. Every page is a `<div id="*-view" class="view">`; the active one has `active-view`. All asset paths are absolute (`/app.js`) so deep routes work. |
| `theme.css` | **The single theme file**: DESIGN.md colour, font, spacing and motion tokens, plus aliases for the legacy token names (`--accent-color`, `--bg-surface`, ...). |
| `kits.css` | Styles for the redesign components (header, hero, terminal card, tables, kit cards, forms, footer). Tokens only. |
| `styles.css`, `animations.css` | Older styles (generator, workspace, blog...). Their colours were converted to tokens. |
| `kits-data.js` | **Edit kits here.** `KITS` (name, slug, status, price, problem, file tree, edge cases, verify preview, `buyUrl`, `legalNote`), `KIT_SETTINGS` (bundle, `waitlistEndpoint`), `SITE_FAQ`, `FREE_VS_KIT`. |
| `components.js` | `Components.*` (terminalCard, freeVsKitTable, kitCard, kitGrid, price, faqList, waitlistForm, buyButton, legalNotice ...) and `KitPages.*` (renderHome, renderCatalog, renderDetail, renderHowItWorks, renderFaq, playTerminal). |
| `compiler-core.js` | **The .env generator core**: `FRAMEWORKS`, `SERVICES`, `BLOG_POSTS`, global `state` and `elements`, `init()`, the step flow, storage, share URLs, `compileDotenv()`. |
| `app.js` | `handlePathRoute()` (the router), secrets, copy/download, presets, event wiring, AI Architect, templates/generators grids, legacy workspace code, SEO hub pages, site search. Calls `init()` on `DOMContentLoaded`. |
| `presets-core.js`, `stack-data.js`, `seo-content-db.js`, `data-templates.js`, `data-generators.js` | Data for presets, `/stack/:slug`, the SEO hub routes, templates and generators. |
| `models.js`, `utils.js`, `storage.js`, `renderers.js`, `workspace.js`, `knowledge-engine.js`, `blueprint-engine.js` | "Project OS" layer for the AI Architect and workspace (keyword matching, no AI calls). `WorkspaceController.bindEvents()` is never called. |
| `blog/<slug>/index.html`, `stack/<slug>/index.html` | Pre-rendered copies of `index.html` for SEO. **Regenerate them whenever `index.html` changes.** |
| `build-blog-pages.js`, `build-stack-pages.js` | Build those pages. They inject content at the `<!-- SSG:... -->` marker comments in `index.html` and throw if a marker is missing. |
| `generate-stacks.js` | Writes `stack-data.js`. |
| `scripts/dev-server.js` | Local server with SPA fallback and the `vercel.json` headers (CSP included). |
| `scripts/check-pages.js` | Headless Chrome/Edge checker (see below). |
| `update-*.js`, `generate-knowledge.js` | Old one-off codemods. Already applied; don't re-run. |

Script load order matters (end of `index.html`):
`data-generators → data-templates → models → utils → storage → renderers → knowledge-engine → blueprint-engine → workspace → stack-data → presets-core → kits-data → components → compiler-core → seo-content-db → app → animations`.
`compiler-core.js` builds `elements` with `getElementById` as soon as it loads, so it must load after the markup.

## Run / build / test (Windows, PowerShell)

```powershell
node scripts/dev-server.js           # http://localhost:3000  (optional port: node scripts/dev-server.js 8080)
```

In a second terminal, with the server running:

```powershell
node scripts/check-pages.js http://localhost:3000 .tmp/shots / /kits /kits/gst-invoice-engine /how-it-works /faq /env
$env:FLOW_GENERATOR=1; $env:FLOW_KITS=1; node scripts/check-pages.js http://localhost:3000 .tmp/shots /
```

`check-pages.js` loads each route at 375px and 1440px and reports JS exceptions, console errors, horizontal overflow, the active view and the `<h1>` count. It saves viewport screenshots (`SEGMENTS=n` sets how many per page) and exits 1 on any first-party problem. `FLOW_GENERATOR=1` clicks through the .env generator and checks the output. `FLOW_KITS=1` tests the legal notes, the placeholder buy button and the waitlist form.

After editing `index.html`, regenerate the static pages:

```powershell
node build-blog-pages.js; node build-stack-pages.js
```

There is no linter. Use `node --check <file>.js` for a syntax pass.

## Routing

`handlePathRoute()` in `app.js` clears `active-view` from every `.view`, then matches `location.pathname`:
`/kits`, `/kits/:slug` (unknown slug → `/kits`), `/how-it-works`, `/faq`, `/about`, `/privacy`, `/resources` and `/blog`, `/generators`, `/architect`, `/workspace`, `/search`, `/templates`, `/templates/:slug`, `/stacks/:slug`, `/integrations/:slug`, `/blueprints/:slug`, `/pricing`, `/stack/:slug`, `/blog/:slug`.
Everything else shows the homepage. `/env` is the homepage scrolled to the generator (section 6) with the generator's title and meta.
A global click handler in `init()` turns every `<a href="/...">` into `pushState` + `handlePathRoute()`.
`/stacks/:slug` (`SEO_STACKS`) and `/stack/:slug` (`STACK_PAGES`, or a pre-rendered page with `window.PRELOADED_STATE`) are different routes.

## How the .env generator works

It now sits on the homepage (`#env-generator`). Its markup was moved there unchanged; the IDs are what the JS depends on.

1. Step 1: `renderFrameworkGrid()` → `selectFramework(id)`. `FRAMEWORKS[].prefixType` is `nextjs`, `vite`, `astro`, `flutter` or `none`.
2. Step 2: `renderServicesGrouped()` → `toggleService(id)` fills `state.services`.
3. Step 3: `compileDotenv()` (the **second** definition, at the end of `compiler-core.js`, is the live one) builds the file from `getFrameworkGeneralVars()` and `getServiceVariables()`. Public vars get `NEXT_PUBLIC_` / `VITE_` / `PUBLIC_`, `.env.example` empties values, generated secrets come from `state.generatedSecrets[env]`, and the raw text goes into `data-raw` on the copy/download buttons.
4. Persistence: `localStorage` (`env_last_*`, `getenv_workspace`), `sessionStorage` (`env_session_*`), share links via `handleUrlImport()` / `generateShareLink()`.
5. Pre-rendered stack pages set `window.PRELOADED_STATE` and jump to step 3.

## Styling

- Colours and fonts come only from `theme.css` tokens: `--bg`, `--surface`, `--surface-2`, `--border`, `--text`, `--muted`, `--accent` (saffron), `--accent-ink`, `--success`, `--danger`, `--prompt`, plus `color-mix()` tints of them. No hex/rgb values anywhere else.
- Headings use Space Grotesk, body text IBM Plex Sans, and code, labels and numbers JetBrains Mono.
- Mobile first. Tap targets are at least 44px (`--tap`). Reduced motion turns off the hero typing animation and all transitions.
- Older views still use many inline `style="..."` attributes (tokenised).

## Conventions

- 2-space indent and single quotes. `/* ===== SECTION ===== */` banners.
- Older code: global functions plus `state`/`elements`. Newer code: object-literal namespaces (`const X = { method() {} }`).
- Guard optional things: `typeof X !== 'undefined'`, `if (elements.x)`.
- Components return HTML strings; escape data with `KitUtils.esc()`.

## Fragile / confusing: read before editing

1. **Pre-rendered pages copy `index.html`.** If you add a view or change markup and don't rerun the two build scripts, SPA navigation from a blog/stack page can hit missing elements.
2. **Placeholders to replace before launch** (all in `kits-data.js`): `buyUrl` values containing `REPLACE_WITH` (the button shows "Checkout opens soon"), `waitlistEndpoint: null` (the form says signups aren't open yet), the refund FAQ answer, the DPDP date notice, and the draft file trees, edge cases and verify previews.
3. **A waitlist endpoint needs a CSP change.** `default-src 'self'` blocks `fetch` to another origin, so add that origin to `connect-src` in `vercel.json`.
4. **The CSP blocks GA, AdSense and Mermaid** (`script-src 'self' 'unsafe-inline'`). Architect diagrams don't render in production. This needs a decision: add the hosts or drop the scripts (the tracking scripts also conflict with PRODUCT.md's privacy promise).
5. **Duplicated data:** `BLOG_POSTS` is in both `compiler-core.js` and `build-blog-pages.js`. Stack slugs in `build-stack-pages.js` differ from those in `stack-data.js`.
6. `compileDotenv` is defined twice in `compiler-core.js`. Edit the last one.
7. `app.js` still has the legacy workspace functions alongside `storage.js`/`workspace.js`. `workspaceState` is declared only in `storage.js`; don't redeclare it.
8. `generate-knowledge.js` doesn't parse and writes to a hard-coded absolute path.
9. Git shows LF→CRLF warnings. They're harmless; the build scripts use markers, not exact whitespace.
